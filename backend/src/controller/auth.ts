import { Request, Response, NextFunction } from "express";
import randomstring from "randomstring";

import asyncErrorHandler from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/errorhandler";
import OTPVerification from "../models/otpVerification";
import sendEmail from "../utils/sendEmail";
import User from "../models/user";
import { generateToken, passwordHashing, verifyPassword } from "../utils";

const generateOTP = () => {
  return randomstring.generate({
    length: 6,
    charset: "numeric",
  });
};

// Validating email
const validateEmail = (email: string) => {
  const regx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regx.test(email);
};

// Validating Username
const validateUsername = (username: string) => {
  const regx = /[a-zA-z]+$/;
  return regx.test(username);
};

export const sendOTP = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (!email) {
      return next(new ErrorHandler("Please enter email", 400));
    }
    if (!validateEmail(email)) {
      return next(new ErrorHandler("Please enter correct email", 400));
    }

    const otp = generateOTP();
    const newOTP = await OTPVerification.create({ email, otp });

    sendEmail({ userEmail: email, otp });

    return res
      .status(200)
      .json({ success: true, message: "OTP is send to your email" });
  }
);

export const verifyOTP = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp } = req.body;

    const existingOTP = await OTPVerification.findOneAndDelete({ email, otp });
    if (existingOTP) {
      return res.status(200).json({ success: true });
    } else {
      return next(new ErrorHandler("Incorrect OTP", 400));
    }
  }
);

// signup controller
export const signup = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(new ErrorHandler("Please enter all the details", 400));
    }
    if (username.length < 4 || username.length > 20) {
      return next(
        new ErrorHandler(
          "Username should be minimum of 4 letters and maximum of 20 letters",
          400
        )
      );
    }
    if (!validateUsername(username)) {
      return next(
        new ErrorHandler("Username should only consistes alphabets", 400)
      );
    }
    if (!validateEmail(email)) {
      return next(new ErrorHandler("Please enter correct Email", 400));
    }
    if (password.length < 8 || password.length > 30) {
      return next(
        new ErrorHandler(
          "Password should consists min of 8 letters and max of 30 letter",
          400
        )
      );
    }
    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const hashPassword = await passwordHashing(password);
    user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const data = {
      user: {
        id: user._id,
      },
    };

    const authtoken = generateToken(data);

    return res.status(200).json({
      success: true,
      message: "User Registered successfully",
      authtoken,
    });
  }
);

//login handler
export const login = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Enter all the details", 400));
    }

    if (!validateEmail(email)) {
      return next(new ErrorHandler("Please enter correct email", 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    const pass = await verifyPassword(password, user.password);
    if (!pass) {
      return next(new ErrorHandler("email or password is incorrect", 400));
    }

    const data = {
      user: {
        id: user._id,
      },
    };

    const authtoken = generateToken(data);

    return res.status(200).json({ success: true, authtoken });
  }
);
