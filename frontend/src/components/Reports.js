import React from "react";
import { useTheme } from "./ThemeContext"; // Import the custom hook
import { useTotal } from "./TotalContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Reports = () => {
  const { graphTotals } = useTotal(); // Use context to get the graph data
  const { theme } = useTheme(); // Use the custom hook to get the current theme

  // Create a new array with modified records
  let modifiedGraphTotals = graphTotals.map((item) => ({
    month: item.month.slice(0, 3).toUpperCase(), // Extract first 3 letters and convert to uppercase
    total: item.total, // Copy the amount as is
  }));

  // Define colors based on the theme
  const colors = {
    barColor: theme === "dark" ? "#82ca9d" : "#8884d8",
    gridColor: theme === "dark" ? "#444444" : "#cccccc",
    textColor: theme === "dark" ? "#ffffff" : "#333333",
  };

  return (
    <div className="graph-container" style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={modifiedGraphTotals}
          margin={{ top: 20, right: 0, left: -20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={colors.gridColor} />
          <XAxis dataKey="month" stroke={colors.textColor} />
          <YAxis stroke={colors.textColor} />
          <Tooltip />
          {/*<Legend wrapperStyle={{ color: colors.textColor }} /> */}
          <Bar
            dataKey="total"
            fill={colors.barColor}
            name="Total Expenses"
            barSize={10}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Reports;
