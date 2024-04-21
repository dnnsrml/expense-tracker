import React from "react";
import { useTotal } from "./TotalContext";
import { formatNumber } from "../utils/utilityFunctions";

const MainDisplay = () => {
  const { total } = useTotal();

  const currentDate = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[currentDate.getMonth()].toUpperCase();
  const currentYear = currentDate.getFullYear();

  return (
    <div className="main-display">
      <div className="display-area">
        <p className="display-date">
          <strong>{`${monthName}, ${currentYear}`}</strong>
        </p>
        <p className="monthly-amount">{formatNumber(total)}</p>
        <p className="display-label">Expenses This Month</p>
      </div>
    </div>
  );
};

export default MainDisplay;
