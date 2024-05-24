import { Request, Response, NextFunction } from "express";

import asyncErrorHandler from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/errorhandler";
import User from "../models/user";
import { generateToken, passwordHashing, verifyPassword } from "../utils";

// getting user details
export const getUserdetails = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.user;
    const user = await User.findById(id).select([
      "-password",
      "-createdAt",
      "-__v",
    ]);

    return res.status(200).json({ success: true, user });
  }
);

export const deleteUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.user;
    await User.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Account Deleted Successfully" });
  }
);

// logic for changing password
export const changePassword = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.user;
    const { password, newPassword } = req.body;
    if (!password || !newPassword) {
      return next(new ErrorHandler("Please enter all the details", 400));
    }

    let user = await User.findById(id);

    const pass = verifyPassword(password, user.password);
    if (!pass) {
      return next(new ErrorHandler("email or password is incorrect", 400));
    }

    const hashPassword = passwordHashing(newPassword);

    user = await User.findByIdAndUpdate(
      id,
      { password: hashPassword },
      { $new: true }
    );

    const data = {
      user: {
        id: user._id,
      },
    };

    const authtoken = generateToken(data);

    return res.status(202).json({
      success: true,
      message: "Password updated successfully",
      authtoken,
    });
  }
);
