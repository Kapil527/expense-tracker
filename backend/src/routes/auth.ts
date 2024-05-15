import express from "express";

import { sendOTP, verifyOTP, signup, login } from "../controller/auth";

export default (router: express.Router) => {
  router.post("/auth/send-otp", sendOTP);
  router.post("/auth/verify-otp", verifyOTP);
  router.post("/auth/signup", signup);
  router.post("/auth/login", login);
};
