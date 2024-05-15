import mongoose, { Schema, model } from "mongoose";

import { ExpenseModelTypes } from "types/expense";

const expenseSchema = new Schema<ExpenseModelTypes>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    category: { type: String, require: true, enum: ["income", "expense"] },
    date: { type: Date, require: true },
    amount: { type: String, require: true },
    reason: { type: String, require: true },
  },
  { timestamps: true }
);

const Expense = model<ExpenseModelTypes>("expenses", expenseSchema);

export default Expense;
