import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Default theme is light

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Apply theme changes to CSS variables
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.style.setProperty(
        "--background-color",
        "#333333"
      );
      document.documentElement.style.setProperty("--text-color", "#ffffff");
      document.documentElement.style.setProperty(
        "--container-background-color",
        "#222222"
      ); // Dark mode background for main-container
      document.documentElement.style.setProperty(
        "--container-text-color",
        "#eeeeee"
      ); // Dark mode text for main-container
      document.documentElement.style.setProperty(
        "--alt-background-color",
        "#111111"
      ); // Light mode text for main-container
      document.documentElement.style.setProperty("--alt-text-color", "#eeeeee"); // Light mode text for main-container
    } else {
      document.documentElement.style.setProperty(
        "--background-color",
        "#f2f2f2"
      );
      document.documentElement.style.setProperty("--text-color", "#333333");
      document.documentElement.style.setProperty(
        "--container-background-color",
        "#ffffff"
      ); // Light mode background for main-container
      document.documentElement.style.setProperty(
        "--container-text-color",
        "#333333"
      ); // Light mode text for main-container
      document.documentElement.style.setProperty(
        "--alt-background-color",
        "#cccccc"
      ); // Light mode text for main-container
      document.documentElement.style.setProperty("--alt-text-color", "#333333"); // Light mode text for main-container
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => useContext(ThemeContext);
