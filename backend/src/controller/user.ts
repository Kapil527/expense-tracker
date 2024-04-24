import { Request, Response, NextFunction } from "express";

import asyncErrorHandler from "middleware/catchAsyncError";
import ErrorHandler from "utils/errorhandler";
import User from "../models/user";
import { generateToken, passwordHashing, verifyPassword } from "utils";

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

    const hashPassword = passwordHashing(password);
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

    const user = User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    const pass = verifyPassword(password, user.password);
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
      { password: newPassword },
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
