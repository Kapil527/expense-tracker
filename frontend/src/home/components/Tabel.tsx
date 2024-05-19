import { useEffect } from "react";

import {
  ExpenseContextType,
  useExpenseConetxt,
} from "../../context/ExpenseContext";
import { ExpenseType } from "../../types/expense";
import { TableRows } from "./TableRow";

// Tabels headings
const tabelHeading = ["Date", "Category", "Amount", "Reason", "Edit", "Delete"];

interface PropsType {
  setEditExpense: React.Dispatch<React.SetStateAction<ExpenseType>>;
  handleOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Table = ({ setEditExpense, handleOnClick }: PropsType) => {
  const { expenses, getExpenses } = useExpenseConetxt() as ExpenseContextType;

  useEffect(() => {
    getExpenses();
  }, []);
  
  return (
    <>
      <div className=" h-4/5 m-4">
        {expenses.length === 0 ? (
          "No expenses to display"
        ) : (
          <table className="overflow-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-md">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {tabelHeading.map((value, index) => {
                  return (
                    <th scope="col" className="px-6 py-3" key={index}>
                      {value}
                    </th>
                  );
                })}
              </tr>
            </thead>
            {expenses.map((expense: ExpenseType, index) => {
              return (
                <TableRows
                  expense={expense}
                  key={index}
                  handleOnClick={handleOnClick}
                  setEditExpense={setEditExpense}
                />
              );
            })}
          </table>
        )}
      </div>
    </>
  );
};
