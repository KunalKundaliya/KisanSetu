/**
 * Calculate distance between two lat/lon coordinates (Haversine formula)
 */
export const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

/**
 * Find nearest mandis from farmer's location
 */
export const findNearestMandis = (mandiPrices, farmerLat, farmerLon, maxRadiusKm = 100) => {
  return mandiPrices
    .map(m => ({
      ...m,
      distance: haversineDistance(farmerLat, farmerLon, m.latitude || 26.8124, m.longitude || 80.9055),
    }))
    .filter(m => m.distance <= maxRadiusKm)
    .sort((a, b) => a.distance - b.distance);
};
