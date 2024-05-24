import { useState, useRef } from "react";

import { ExpenseType } from "@/types/expense";

interface PropsType {
  expense: ExpenseType;
  handleOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ExpenseCard = ({ expense, handleOnClick }: PropsType) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const closeDropdownRef = useRef<any>(null);

  const closeDropDown = (event: MouseEvent) => {
    if (showDropdown && !closeDropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  document.addEventListener("mousedown", closeDropDown);

  return (
    <div className="container w-full px-2 py-4 bg-white my-3 rounded shadow flex items-center justify-between">
      <div className="upper mx-2">
        <h4 className="text-lg font-semibold">{expense.reason}</h4>
        <small className="">{expense.category}</small>
      </div>
      <div className="lower flex items-center justify-center relative">
        <h4 className="text-lg font-semibold mx-1">{expense.amount}</h4>
        <button onClick={() => setShowDropdown((prev) => !prev)}>{Dots}</button>
        <div
          className={`dropdown z-10 ${
            showDropdown ? "" : "hidden"
          } absolute top-7 right-2 bg-white shadow-lg`}
          ref={closeDropdownRef}
        >
          <button className="p-2 px-2 me-4" onClick={handleOnClick}>
            Edit
          </button>
          <button className="p-2 px-2 me-4">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;

const Dots = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
    />
  </svg>
);
