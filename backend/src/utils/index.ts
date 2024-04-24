import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const { JWT_SECRET } = process.env;

export const passwordHashing = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);
  return hashpassword;
};

export const generateToken = (data: {}) => {
  return jwt.sign(data, JWT_SECRET as string);
};

export const verifyPassword = async (oldPass: string, enteredPass: string) => {
  const verify = await bcrypt.compare(oldPass, enteredPass);
  return verify;
};
