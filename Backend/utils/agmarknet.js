import MandiPriceCache from "../models/mandiPriceCache.model.js";
import { MSP_PRICES } from "../constants.js";
import { haversineDistance } from "./geo.js";
import logger from "./logger.js";

// Mock mandi prices for demonstration
const mockMandiData = {
  "Uttar Pradesh": [
    { mandiName: "Mandi Lucknow", cropType: "wheat", price: 2275, distance: 0 },
    { mandiName: "Mandi Kanpur", cropType: "wheat", price: 2250, distance: 45 },
    { mandiName: "Mandi Lucknow", cropType: "rice", price: 4500, distance: 0 },
  ],
  "Punjab": [
    { mandiName: "Mandi Ludhiana", cropType: "wheat", price: 2300, distance: 0 },
    { mandiName: "Mandi Amritsar", cropType: "wheat", price: 2290, distance: 90 },
  ],
};

/**
 * Fetch mandi prices for a crop type in farmer's region
 */
export const fetchMandiPrices = async (cropType, state, farmerLat, farmerLon) => {
  try {
    // Check cache first
    const cached = await MandiPriceCache.find({ cropType, state }).select("-__v");
    if (cached.length > 0) return cached;

    // Mock fallback
    const mandiList = mockMandiData[state] || [];
    const relevantPrices = mandiList.filter(m => m.cropType === cropType);

    // Calculate distances
    const withDistance = relevantPrices.map(m => ({
      ...m,
      distance: farmerLat && farmerLon ? haversineDistance(farmerLat, farmerLon, 26.8124, 80.9055) : 0,
    }));

    // Save to cache
    await MandiPriceCache.insertMany(
      withDistance.map(p => ({ cropType, mandiName: p.mandiName, price: p.price, state }))
    );

    return withDistance;
  } catch (error) {
    logger.error(`Fetch mandi prices error: ${error.message}`);
    return [];
  }
};

/**
 * Compare expected price with MSP and mandi prices
 */
export const comparePrices = (expectedPrice, mandiPrices, cropType) => {
  const mspPrice = MSP_PRICES[cropType] || 0;
  const avgMandiPrice = mandiPrices.reduce((sum, m) => sum + m.price, 0) / (mandiPrices.length || 1);

  return {
    expectedPrice,
    mspPrice,
    avgMandiPrice,
    priceDifference: expectedPrice - mspPrice,
    mspRecommendation: expectedPrice >= mspPrice ? "acceptable" : "below-msp",
    mandiComparison: expectedPrice >= avgMandiPrice ? "above-average" : "below-average",
  };
};
