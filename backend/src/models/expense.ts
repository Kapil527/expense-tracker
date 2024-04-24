import mongoose, { Schema, model } from "mongoose";

import { ExpenseModelTypes } from "types/expense";

const expenseSchema = new Schema<ExpenseModelTypes>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    type: { type: String, require: true },
    date: { type: Date, require: true },
    money: { type: String, require: true },
    reason: { type: String, require: true },
    evidence: { type: String },
  },
  { timestamps: true }
);

const Expense = model<ExpenseModelTypes>("expenses", expenseSchema);

export default Expense;
