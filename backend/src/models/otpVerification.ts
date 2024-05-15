import mongoose, { Schema, model } from "mongoose";

import { OTPVerificationType } from "types/otpVerificationType";

const otpSchema = new Schema({
  email: { type: String, require: true },
  otp: { type: String, require: true },
  createdAt: { type: Date, default: Date.now, expires: 60 * 5 }, // Document will expire after 5 min.
});

const OTPVerification = model("OTP", otpSchema);

export default OTPVerification;
