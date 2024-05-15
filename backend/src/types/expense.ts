import mongoose from "mongoose";

export interface ExpenseModelTypes {
  user: mongoose.Schema.Types.ObjectId;
  date: Date;
  category: "income" | "expense";
  amount: string;
  reason: string;
}

export interface NewExpenseType {
  date: Date;
  category: "income" | "expense";
  amount: string;
  reason: string;
}
