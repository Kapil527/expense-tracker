import mongoose, { Schema, model } from "mongoose";

import { UserModelTypes } from "types/user";

const userSchema = new Schema<UserModelTypes>(
  {
    username: { type: String, require: true, minlength: 4, maxlength: 20 },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, minlength: 8, maxlength: 30 },
    userImage: { type: String },
  },
  { timestamps: true }
);

const User = model<UserModelTypes>("user", userSchema);

export default User;
