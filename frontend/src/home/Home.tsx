import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Model } from "./components/Model";
import { Table } from "./components/Tabel";
import GraphIcon from "/graph.svg";
import TabelIcon from "/table.svg";
import { ExpenseType } from "../types/expense";
import MobileView from "./components/MobileView";
import { Button } from "./components/Button";

const Home = () => {
  const [toggleModel, setToggleModel] = useState(false);
  const [buttonId, setButtonId] = useState("");
  const [expenses, setExpenses] = useState<ExpenseType>({} as ExpenseType);
  const navigate = useNavigate();

  const handleOnChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setExpenses({ ...expenses, [event.target.name]: event.target.value });
  };

  // This function is used to toggle model
  const handleToggle = (value: boolean) => {
    setToggleModel(value);
  };

  // This function get's the id the div element which determines weather expenses should be added or edited.
  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const id = event.currentTarget.id;
    handleToggle(true);
    setButtonId(id);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      {/* <!-- Modal toggle --> */}
      <div className="hidden md:block">
      <Button handleOnClick={handleOnClick}/>
      </div>

      <Model
        expenses={expenses}
        toggle={toggleModel}
        id={buttonId}
        handleToggle={handleToggle}
        handleOnChange={handleOnChange}
      />

      {/* This component is used to toggle the table component and dashboard component */}
      <div className="toggleComponents hidden md:flex">
        <button className="mx-2 cursor-pointer" onClick={() => navigate("/")}>
          <img src={TabelIcon} alt="tableIcon" width="30px" />
        </button>
        <button
          className="mx-2 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <img src={GraphIcon} alt="graphIcon" width="30px" />
        </button>
      </div>

      <MobileView handleOnClick={handleOnClick}/>
    </div>
  );
};

export default Home;
