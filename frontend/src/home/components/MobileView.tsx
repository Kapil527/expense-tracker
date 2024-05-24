import { Key, useEffect, useState } from "react";

import { Button } from "./Button";
import { DatePickerWithRange } from "./DateRangePicker";
import ExpenseCard from "./ExpensesCard";
import {
  ExpenseContextType,
  useExpenseConetxt,
} from "@/context/ExpenseContext";
import { ExpenseType } from "@/types/expense";

const buttonsStyle = "bg-white rounded-full p-[2px] px-4 mx-1 shadow-sm";

const MobileView = ({
  handleOnClick,
}: {
  handleOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const { expenses, getExpenses } = useExpenseConetxt() as ExpenseContextType;
  const [heading, setHeading] = useState<string>("Today");

  const handleHeading = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    let id: string = event.currentTarget.id;
    const splitId = id.split("_");
    const tempHeading = splitId.join(" ");
    setHeading(tempHeading);
  };

  useEffect(() => {
    getExpenses();
  }, []);
  return (
    <div className="md:hidden w-full h-[calc(100dvh-50px)] p-4 bg-slate-100">
      <div className="filter flex items-center">
        <button
          className={`${buttonsStyle}`}
          id="Today"
          onClick={handleHeading}
        >
          Today
        </button>
        <button
          className={`${buttonsStyle}`}
          id="Last_7_Days"
          onClick={handleHeading}
        >
          7 days
        </button>
        <button
          className={`${buttonsStyle}`}
          id="This_Month"
          onClick={handleHeading}
        >
          Month
        </button>
        <button
          className={`${buttonsStyle}`}
          id="This_Year"
          onClick={handleHeading}
        >
          Year
        </button>
      </div>
      <div
        className="custom-date my-4 flex flex-col items-center justify-center"
        id="Custom Date"
        onClick={handleHeading}
      >
        <h4 className="my-2">Custom Date Filter</h4>
        <DatePickerWithRange />
      </div>
      <Button handleOnClick={handleOnClick} />

      <h3 className="text-2xl my-4">{heading}</h3>
      {expenses.map((expense: ExpenseType, index: Key) => {
        return (
          <ExpenseCard
            expense={expense}
            key={index}
            handleOnClick={handleOnClick}
          />
        );
      })}
    </div>
  );
};

export default MobileView;
