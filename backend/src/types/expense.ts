import mongoose from "mongoose";

export interface ExpenseModelTypes {
  user: mongoose.Schema.Types.ObjectId;
  date: Date;
  type: string;
  money: string;
  reason: string;
  evidence: string;
}
