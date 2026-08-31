// Mock AgriStack Kisan Registry
const MOCK_KISAN_REGISTRY = {
  KISAN123456: {
    kisanId: "KISAN123456",
    name: "Ramesh Kumar",
    mobile: "9876543210",
    state: "Uttar Pradesh",
    district: "Lucknow",
    landHolding: 5.5,
    cropsGrown: ["wheat", "rice", "sugarcane"],
    verified: true,
  },
  KISAN001: {
    kisanId: "KISAN001",
    name: "Priya Singh",
    mobile: "9112345678",
    state: "Punjab",
    district: "Ludhiana",
    landHolding: 3.2,
    cropsGrown: ["wheat", "cotton"],
    verified: true,
  },
  ABHAY9528: {
    kisanId: "ABHAY9528",
    name: "Abhay Yadav",
    mobile: "9876543210",
    state: "Madhya Pradesh",
    district: "Indore",
    landHolding: 2.5,
    cropsGrown: ["soybean", "wheat"],
    verified: true,
  },
};

/**
 * Fetch farmer profile from AgriStack registry
 */
export const fetchFarmerProfile = (kisanId, providedMobile) => {
  const profile = MOCK_KISAN_REGISTRY[kisanId];

  if (!profile) {
    // Auto-generate fallback profile for unlisted kisanId
    return {
      kisanId,
      name: `Farmer ${kisanId}`,
      mobile: providedMobile || "0000000000",
      state: "Uttar Pradesh",
      district: "Lucknow",
      landHolding: 2.5,
      cropsGrown: ["wheat"],
      verified: false,
    };
  }

  // Verify mobile matches
  if (profile.mobile !== providedMobile) {
    return null;
  }

  return profile;
};

/**
 * Verify farmer registration in AgriStack
 */
export const verifyFarmer = async (kisanId, mobile) => {
  const profile = fetchFarmerProfile(kisanId, mobile);
  return {
    verified: !!MOCK_KISAN_REGISTRY[kisanId],
    profile,
  };
};
