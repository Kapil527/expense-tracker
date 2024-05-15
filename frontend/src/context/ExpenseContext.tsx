import { createContext, useContext, useState } from "react";
import axios from "axios";

import { ExpenseType } from "../types/expense";
import { expenseAPIS } from "../util/Apis";

export interface ExpenseContextType {
  expenses: ExpenseType[];
  success: boolean;
  message: string;
  addExpenses: (expense: ExpenseType) => void;
  getExpenses: () => void;
  deleteExpense: (id: number) => void;
  editExpense: (expense: ExpenseType, id: number) => void;
}

const ExpenseContext = createContext<ExpenseContextType | null>(null);

export const ExpenseState = ({ children }: { children: React.ReactNode }) => {
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const token = localStorage.getItem("authtoken");

  // funciton to add expneses using post method
  const addExpenses = async (expense: ExpenseType) => {
    const response = await axios.post(
      expenseAPIS,
      {
        date: expense.date,
        category: expense.category,
        amount: expense.amount,
        reason: expense.reason,
      },
      { headers: { Authorization: token } }
    );
    const { data } = response;

    if (data.success) {
      setExpenses(expenses.concat(data.expense));
    } else {
      setMessage(data.message);
    }
    setSuccess(data.success);
  };

  // fucntion to getExpenses with get method
  const getExpenses = async () => {
    const response = await axios.get(expenseAPIS, {
      headers: {
        Authorization: token,
      },
    });

    const { data } = response;
    if (data.success) {
      setExpenses(data.expenses);
    } else {
      setMessage(data.message);
    }
    setSuccess(data.success);
  };

  //deleteExpense with delete method
  const deleteExpense = async (id: number) => {
    const response = await axios.delete(`${expenseAPIS}/${id}`, {
      headers: { Authorization: token },
    });

    const { data } = response;
    if (data.success) {
      let newExpenses = expenses.filter((expense) => {
        return expense._id !== id;
      });
      setExpenses(newExpenses);
    }
    setMessage(data.message);
    setSuccess(success);
  };

  const editExpense = async (expense: ExpenseType, id: number) => {
    const response = await axios.put(
      `${expenseAPIS}/${id}`,
      {
        date: expense.date,
        category: expense.category,
        amount: expense.amount,
        reason: expense.reason,
      },
      { headers: { Authorization: token } }
    );

    console.log(response.data);

    const { data } = response;
    console.log(data);

    setMessage(data.success);
    setSuccess(data.success);

    expenses.forEach((Expense) => {
      if (Expense._id === id) {
        Expense.date = expense.date;
        Expense.category = expense.category;
        Expense.amount = expense.amount;
        Expense.reason = expense.reason;
      }
    });
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        success,
        message,
        addExpenses,
        getExpenses,
        deleteExpense,
        editExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseConetxt = () => {
  return useContext(ExpenseContext);
};
