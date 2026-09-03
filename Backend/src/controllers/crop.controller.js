import CropListing from "../models/cropListing.model.js";
import { HTTP_STATUS, CROP_METADATA, MSP_PRICES, CROP_TYPES } from "../constants.js";
import { fetchMandiPrices, comparePrices } from "../utils/agmarknet.js";
import logger from "../utils/logger.js";

export const getCropsMeta = async (req, res) => {
  try {
    return res.status(HTTP_STATUS.OK).json({
      crops: CROP_METADATA,
      cropTypes: CROP_TYPES,
      mspPrices: MSP_PRICES,
    });
  } catch (error) {
    logger.error(`Get crops meta error: ${error.message}`);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch crops metadata",
    });
  }
};


export const createCropListing = async (req, res) => {
  try {
    const { cropType, variety, quantity, unit, expectedPrice, pricePerQuintal, mandiName, quality } = req.body;

    if (!cropType || !quantity) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Crop type and quantity are required",
      });
    }

    // pre-fill from farmer prof from kisanID details
    const listing = await CropListing.create({
      farmerId: req.user._id,
      cropType: cropType || req.user.cropsGrown?.[0],
      variety,
      quantity,
      unit: unit || "quintal",
      expectedPrice: expectedPrice !== undefined ? expectedPrice : pricePerQuintal,
      mandiName,
      quality,
      location: {
        state: req.user.state,
        district: req.user.district,
        latitude: req.user.landParcels?.[0]?.geoRef?.coordinates?.[1],
        longitude: req.user.landParcels?.[0]?.geoRef?.coordinates?.[0],
      },
      status: "listed",
    });

    logger.info(`Crop listing created: ${cropType} by ${req.user.kisanId}`);

    return res.status(HTTP_STATUS.CREATED).json({
      message: "Crop listed successfully",
      listing,
    });
  } catch (error) {
    logger.error(`Create crop listing error: ${error.message}`);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to create crop listing",
    });
  }
};


export const getCropListings = async (req, res) => {
  try {
    const { cropType, state, status } = req.query;
    const filter = {};

    if (cropType) filter.cropType = cropType;
    if (state) filter["location.state"] = state;
    if (status) filter.status = status;
    else filter.status = "listed";

    const listings = await CropListing.find(filter)
      .populate("farmerId", "name kisanId state district")
      .sort({ createdAt: -1 });

    return res.status(HTTP_STATUS.OK).json({
      count: listings.length,
      listings,
    });
  } catch (error) {
    logger.error(`Get crop listings error: ${error.message}`);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch listings",
    });
  }
};


export const getMyListings = async (req, res) => {
  try {
    const listings = await CropListing.find({ farmerId: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(HTTP_STATUS.OK).json({
      count: listings.length,
      listings,
    });
  } catch (error) {
    logger.error(`Get my listings error: ${error.message}`);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch your listings",
    });
  }
};


export const compareCropPrice = async (req, res) => {
  try {
    const { cropType, expectedPrice } = req.body;

    if (!cropType || !expectedPrice) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Crop type and expected price are required",
      });
    }

    // Get farmer coordinates for distance calculation
    const farmerLat = req.user.landParcels?.[0]?.geoRef?.coordinates?.[1];
    const farmerLon = req.user.landParcels?.[0]?.geoRef?.coordinates?.[0];

    const mandiPrices = await fetchMandiPrices(cropType, req.user.state, farmerLat, farmerLon);
    const comparison = comparePrices(expectedPrice, mandiPrices, cropType);

    return res.status(HTTP_STATUS.OK).json({
      cropType,
      mandiPrices,
      comparison,
    });
  } catch (error) {
    logger.error(`Compare price error: ${error.message}`);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to compare prices",
    });
  }
};


export const getMandiPrices = async (req, res) => {
  try {
    const { cropType } = req.params;
    const state = req.query.state || req.user.state;

    const farmerLat = req.user.landParcels?.[0]?.geoRef?.coordinates?.[1];
    const farmerLon = req.user.landParcels?.[0]?.geoRef?.coordinates?.[0];

    const prices = await fetchMandiPrices(cropType, state, farmerLat, farmerLon);

    return res.status(HTTP_STATUS.OK).json({
      cropType,
      state,
      prices,
    });
  } catch (error) {
    logger.error(`Get mandi prices error: ${error.message}`);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch mandi prices",
    });
  }
};


export const updateCropListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, soldPrice, soldTo } = req.body;

    const listing = await CropListing.findOne({
      _id: id,
      farmerId: req.user._id,
    });

    if (!listing) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Listing not found",
      });
    }

    if (status) listing.status = status;
    if (soldPrice) listing.soldPrice = soldPrice;
    if (soldTo) listing.soldTo = soldTo;
    if (status === "sold") listing.soldAt = new Date();

    await listing.save();

    return res.status(HTTP_STATUS.OK).json({
      message: "Listing updated",
      listing,
    });
  } catch (error) {
    logger.error(`Update listing error: ${error.message}`);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to update listing",
    });
  }
};
