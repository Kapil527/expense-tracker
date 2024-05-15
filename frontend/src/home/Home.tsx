import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Model } from "./components/Model";
import { Table } from "./components/Tabel";
import GraphIcon from "/graph.svg";
import TabelIcon from "/table.svg";
import { ExpenseType } from "../types/expense";
// import { Card } from "./components/Card";

const Home = () => {
  const [toggleComponents, setToggleComponents] = useState(false);
  const [toggleModel, setToggleModel] = useState(false);
  const [buttonId, setButtonId] = useState("");
  const [expenses, setExpenses] = useState<ExpenseType>({} as ExpenseType);
  const [updateExpense, setUpdateExpense] = useState<ExpenseType>(
    {} as ExpenseType
  );

  const handleOnChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setExpenses({ ...expenses, [event.target.name]: event.target.value });
  };

  const handleToggle = (value: boolean) => {
    setToggleModel(value);
  };

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const id = event.currentTarget.id;
    handleToggle(true);
    setButtonId(id);
    if (id === "edit") {
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authtoken")) navigate("/login");
  }, []);
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      {/* <!-- Modal toggle --> */}
      <button
        data-modal-target="crud-modal"
        data-modal-toggle="crud-modal"
        id="addExpense"
        className="block ms-auto me-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={handleOnClick}
      >
        Add expense
      </button>

      <Model
        expenses={buttonId === "edit" ? updateExpense : expenses}
        toggle={toggleModel}
        id={buttonId}
        handleToggle={handleToggle}
        handleOnChange={handleOnChange}
      />

      {/* This component is used to toggle the table component and graph component */}
      <div className="toggleComponents flex">
        <button
          className="mx-2 cursor-pointer"
          onClick={() => setToggleComponents(false)}
        >
          <img src={TabelIcon} alt="tableIcon" width="30px" />
        </button>
        <button
          className="mx-2 cursor-pointer"
          onClick={() => setToggleComponents(true)}
        >
          <img src={GraphIcon} alt="graphIcon" width="30px" />
        </button>
      </div>
      {toggleComponents === false ? (
        <Table
          handleOnClick={handleOnClick}
          setEditExpense={setUpdateExpense}
        />
      ) : (
        ""
      )}

      {/* <Card /> */}
    </div>
  );
};

export default Home;
