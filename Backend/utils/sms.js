import logger from "./logger.js";

/**
 * Send OTP via SMS (mock implementation)
 */
export const sendOTP = async (mobile, otp) => {
  try {
    // Mock SMS sending - in production would use Twilio/MSG91 API
    logger.info(`[SMS] OTP ${otp} sent to ${mobile}`);
    return { success: true, message: `OTP sent to ${mobile}` };
  } catch (error) {
    logger.error(`SMS send error: ${error.message}`);
    throw error;
  }
};

/**
 * Send generic SMS
 */
export const sendSMS = async (mobile, message) => {
  try {
    logger.info(`[SMS] Sent to ${mobile}: ${message}`);
    return { success: true };
  } catch (error) {
    logger.error(`SMS error: ${error.message}`);
    throw error;
  }
};
