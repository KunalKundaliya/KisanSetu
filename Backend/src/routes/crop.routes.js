import { Router } from "express";
import {
  getCropsMeta,
  createCropListing,
  getCropListings,
  getMyListings,
  compareCropPrice,
  getMandiPrices,
  updateCropListing,
} from "../controllers/crop.controller.js";
import { verifyToken, optionalVerifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Public / Guest accessible metadata and rates
router.get("/meta", optionalVerifyToken, getCropsMeta);
router.get("/mandi-prices/:cropType", optionalVerifyToken, getMandiPrices);
router.get("/listings", optionalVerifyToken, getCropListings);

// Protected routes requiring farmer authentication
router.post("/list", verifyToken, createCropListing);
router.get("/my-listings", verifyToken, getMyListings);
router.post("/compare-price", verifyToken, compareCropPrice);
router.patch("/listings/:id", verifyToken, updateCropListing);

export default router;
