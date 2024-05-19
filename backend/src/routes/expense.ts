import express from "express";

import { fetchUser } from "../middleware/fetchUser";
import {
  addExpense,
  getExpenses,
  editExpense,
  deleteExpense,
} from "../controller/expense";
export default (router: express.Router) => {
  router
    .route("/expenses")
    .get(fetchUser, getExpenses)
    .post(fetchUser, addExpense);
  router
    .route("/expenses/:id")
    .put(fetchUser, editExpense)
    .delete(fetchUser, deleteExpense);
};
