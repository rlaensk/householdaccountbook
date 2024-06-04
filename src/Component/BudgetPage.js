import { useState } from "react";
import "../Conponent_css/Main_write.css";
import DateComponent from "./DateComponent";

const BudgetPage = () => {
  return (
    <div className="MainW flex">
      <DateComponent />
    </div>
  );
};

export default BudgetPage;
