import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGODB_URL } = process.env;

const connect = () => {
  try {
    mongoose.connect(MONGODB_URL as string);
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
};

export default connect;
