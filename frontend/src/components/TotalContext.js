import React, { createContext, useContext, useState, useEffect } from "react";

const TotalContext = createContext();

export const TotalProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [monthlyTotals, setMonthlyTotals] = useState([]);
  const [graphTotals, setGraphTotals] = useState([]);

  useEffect(() => {
    // Fetch initial data for both total and monthly totals
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    const totalsResponse = await fetch(
      `${process.env.REACT_APP_API_URL}/api/financial/expenses/total-current-month`
    );
    const totalsData = await totalsResponse.json();
    setTotal(totalsData.total || 0);

    const monthlyResponse = await fetch(
      `${process.env.REACT_APP_API_URL}/api/financial/categories/monthly-totals`
    );
    const monthlyData = await monthlyResponse.json();
    setMonthlyTotals(
      monthlyData.filter((item) => item.categoryName !== "Cancel")
    );

    const graphResponse = await fetch(
      `${process.env.REACT_APP_API_URL}/api/financial/expenses/monthly-totals`
    );
    const graphData = await graphResponse.json();
    setGraphTotals(graphData);
  };

  const addToTotal = (amount) => {
    setTotal((prevTotal) => prevTotal + parseFloat(amount));
    fetchInitialData(); // Refetch or update monthly totals after adding to the total
  };

  return (
    <TotalContext.Provider
      value={{
        total,
        addToTotal,
        monthlyTotals,
        setMonthlyTotals,
        graphTotals,
        setGraphTotals,
      }}
    >
      {children}
    </TotalContext.Provider>
  );
};

export const useTotal = () => useContext(TotalContext);
