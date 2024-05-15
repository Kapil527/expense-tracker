import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGODB_URL } = process.env;

const connect = async () => {
  await mongoose.connect(MONGODB_URL as string, {
    dbName: "expense-tracker",
  });
  mongoose.connection.on("error", (error: Error) => console.log(error));
};

export default connect;
