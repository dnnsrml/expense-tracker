import React, { useState, useEffect } from "react";
import { useTotal } from "./TotalContext";
import { useTheme } from "./ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faShirt,
  faPills,
  faCar,
  faHome,
  faBook,
  faFileInvoiceDollar,
  faShoppingBasket,
  faPlane,
  faBus,
  faTimes,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

const AddExpense = ({ confirm, setConfirm, step, setStep, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amount, setAmount] = useState("");
  const { addToTotal } = useTotal();
  const { theme } = useTheme(); // Access the current theme

  const iconMapping = {
    Food: { icon: faUtensils, lightColor: "#FF6991", darkColor: "#FFD1DC" },
    Clothing: { icon: faShirt, lightColor: "#6497B1", darkColor: "#AEC6CF" },
    Medicine: { icon: faPills, lightColor: "#33A532", darkColor: "#77DD77" },
    Car: { icon: faCar, lightColor: "#FF8640", darkColor: "#FFB347" },
    Housing: { icon: faHome, lightColor: "#40A5A5", darkColor: "#99C7C6" },
    Education: { icon: faBook, lightColor: "#805D80", darkColor: "#B39EB5" },
    Bills: {
      icon: faFileInvoiceDollar,
      lightColor: "#FF6F61",
      darkColor: "#F88379",
    },
    Groceries: {
      icon: faShoppingBasket,
      lightColor: "#47B891",
      darkColor: "#BDFCC9",
    },
    Travel: { icon: faPlane, lightColor: "#D1D17A", darkColor: "#FDFD96" },
    Transport: { icon: faBus, lightColor: "#B695C0", darkColor: "#E6E6FA" },
    Others: { icon: faEllipsisH, lightColor: "#6C757D", darkColor: "#ADB5BD" },
    Cancel: { icon: faTimes, lightColor: "#FF0000", darkColor: "#FF0000" },
  };

  console.log(step);

  useEffect(() => {
    if (step === 0) {
      console.log(`${process.env.REACT_APP_API_URL}/api/financial/categories`);
      fetch(`${process.env.REACT_APP_API_URL}/api/financial/categories`)
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => console.error("Error fetching categories:", err));
    }
  }, [step]);

  const handleClick = (category) => {
    if (category.name === "Cancel") {
      handleCancel();
    } else {
      handleCategorySelect(category);
      console.log("clicked");
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setStep(1);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setConfirm(true);
  };

  const saveExpense = () => {
    const expenseAmount = parseFloat(amount);
    fetch(`${process.env.REACT_APP_API_URL}/api/financial/add-expense`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: selectedCategory._id,
        amount: expenseAmount,
        date: new Date(),
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Expense added successfully");
          addToTotal(expenseAmount); // This now also triggers a refetch of monthlyTotals
          setStep(0);
          setConfirm(false);
          onClose();
        } else {
          throw new Error("Failed to add expense");
        }
      })
      .catch((err) => console.error("Error saving expense:", err));
  };

  const handleCancel = () => {
    setStep(0); // Reset to the initial step
    setConfirm(false); // Also make sure to reset confirm state if needed
    setAmount(""); // Clear any input amount
    onClose();
  };

  if (step === 0) {
    return (
      <div className="category-container">
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => handleClick(category)}
            className="category-item"
          >
            <div
              className="category-icon"
              style={{
                color:
                  theme === "dark"
                    ? iconMapping[category.name].darkColor
                    : iconMapping[category.name].lightColor,
              }}
            >
              <FontAwesomeIcon icon={iconMapping[category.name].icon} />
            </div>
            {category.name.toUpperCase()}{" "}
          </div>
        ))}
      </div>
    );
  } else if (step === 1 && !confirm) {
    return (
      <form
        onSubmit={handleFormSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
          width: "100%", // Ensure form width adjusts to container
        }}
      >
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
          style={{
            width: "80%",
            padding: "10px",
            fontSize: "16px",
            border: `2px solid ${theme === "dark" ? "#555" : "#ccc"}`, // Conditional border color
            borderRadius: "5px",
            backgroundColor: theme === "dark" ? "#333" : "#fff", // Conditional background color
            color: theme === "dark" ? "#fff" : "#000", // Text color changes with theme
          }}
        />
        <div
          style={{
            display: "flex",
            width: "80%",
            justifyContent: "space-between",
          }}
        >
          {" "}
          {/* Container for buttons */}
          <button
            type="submit"
            style={{
              backgroundColor: theme === "dark" ? "#007BFF" : "#ADD8E6", // Darker blue for dark mode
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              color: "white",
              fontWeight: "bold",
              width: "48%", // Adjust width to fit side by side
              transition: "background-color 0.3s", // Smooth transition for theme change
            }}
          >
            Enter
          </button>
          <button
            onClick={handleCancel}
            type="button"
            style={{
              backgroundColor: theme === "dark" ? "#6c757d" : "#D3D3D3", // Darker gray for dark mode
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              color: theme === "dark" ? "#fff" : "#000", // Ensuring text is visible
              fontWeight: "bold",
              width: "48%", // Adjust width to fit side by side
              transition: "background-color 0.3s", // Smooth transition for theme change
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  } else if (confirm) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
          width: "100%",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            color: theme === "dark" ? "#fff" : "#000", // Dynamic text color based on theme
            padding: "10px",
          }}
        >
          Are you sure you want to add this expense?
        </p>
        <div
          style={{
            display: "flex",
            width: "80%",
            justifyContent: "space-between",
          }}
        >
          {" "}
          {/* Container for buttons */}
          <button
            onClick={saveExpense}
            style={{
              backgroundColor: theme === "dark" ? "#007BFF" : "#ADD8E6", // Darker blue for dark mode
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              color: "white",
              fontWeight: "bold",
              width: "48%", // Adjust width to fit side by side
              transition: "background-color 0.3s", // Smooth transition for theme change
            }}
          >
            Yes
          </button>
          <button
            onClick={handleCancel}
            style={{
              backgroundColor: theme === "dark" ? "#6c757d" : "#D3D3D3", // Darker gray for dark mode
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              color: theme === "dark" ? "#fff" : "#000", // Ensuring text is visible
              fontWeight: "bold",
              width: "48%", // Adjust width to fit side by side
              transition: "background-color 0.3s", // Smooth transition for theme change
            }}
          >
            No
          </button>
        </div>
      </div>
    );
  }
};

export default AddExpense;
