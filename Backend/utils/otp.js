import crypto from "crypto";

/**
 * Generate a random OTP
 */
export const generateOTP = (length = 6) => {
  return crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
};

/**
 * Hash OTP using SHA256
 */
export const hashOTP = (otp) => {
  return crypto.createHash("sha256").update(otp).digest("hex");
};

/**
 * Verify hashed OTP
 */
export const verifyOTP = (inputOTP, hashedOTP) => {
  return hashOTP(inputOTP) === hashedOTP;
};
