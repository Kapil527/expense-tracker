import { Request, Response, NextFunction } from "express";

import asyncErrorHandler from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/errorhandler";
import Expense from "../models/expense";
import { NewExpenseType } from "types/expense";

const moneyregx = /[0-9]+$/;

export const addExpense = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { date, category, amount, reason } = req.body;
    const user = req.body.user;

    if (!date || !category || !amount || !reason) {
      return next(new ErrorHandler("Please enter first four details", 400));
    }

    if (!moneyregx.test(amount)) {
      return next(
        new ErrorHandler("Money feild should only contain numbers 0-9", 400)
      );
    }

    const categoryLower = category.toLowerCase();
    const reasonLower = reason.toLowerCase();

    const expense = await Expense.create({
      user,
      category: categoryLower,
      date,
      amount,
      reason: reason,
    });

    return res
      .status(201)
      .json({ success: true, message: "expense add successfully", expense });
  }
);

export const getExpenses = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;

    const expenses = await Expense.find({ user }).select([
      "-__v",
      "-createdAt",
    ]);

    return res.status(200).json({ success: true, expenses });
  }
);

export const editExpense = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { date, category, amount, reason } = req.body;
    console.log(req.body)
    const user = req.body.user;
    const expenseId = req.params.id;

    let expense = await Expense.findById(expenseId);
    if (!expense) {
      return next(new ErrorHandler("Cannot edit expense", 400));
    }

    if (expense.user.toString() !== user) {
      return next(new ErrorHandler("Unauthorized", 401));
    }

    const newExpense = {} as NewExpenseType;

    if (date) newExpense.date = date;
    if (category) newExpense.category = category;
    if (amount) newExpense.amount = amount;
    if (reason) newExpense.reason = reason;

    expense = await Expense.findByIdAndUpdate(
      expenseId,
      { $set: newExpense },
      { $new: true }
    );

    return res.status(204).json({
      success: true,
      message: "Expense updated successfully",
      expense,
    });
  }
);

export const deleteExpense = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;
    const expenseId = req.params.id;

    let expense = await Expense.findById(expenseId);
    if (!expense) {
      return next(new ErrorHandler("Cannot edit expense", 400));
    }

    if (expense.user.toString() !== user) {
      return next(new ErrorHandler("Unauthorized", 401));
    }

    expense = await Expense.findByIdAndDelete(expenseId);

    return res
      .status(200)
      .json({ success: true, message: "Expense deleted successfully" });
  }
);
