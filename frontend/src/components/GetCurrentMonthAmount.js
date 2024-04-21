import React from "react";
import { useEffect, useState } from "react";

const GetCurrentMonthAmount = () => {
  const [amount, setAmount] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/financial//expenses/total-current-month`
    )
      .then((response) => response.json())
      .then((data) => setAmount(data))
      .catch((error) => console.error("error fetching total amount:", error));
  }, []);
  return <div>GetCurrentMonthAmount</div>;
};

export default GetCurrentMonthAmount;
