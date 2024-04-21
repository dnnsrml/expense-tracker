import React from "react";
import { useTheme } from "./ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div>
        <FontAwesomeIcon
          style={theme === "light" ? { color: "#333" } : { color: "yellow" }}
          icon={theme === "light" ? faMoon : faSun}
          onClick={toggleTheme}
        />
      </div>
      <div>
        EXPENSE <strong>TRACKER</strong>
      </div>
      <div>
        <FontAwesomeIcon
          style={{ color: "red" }}
          icon={faArrowRightFromBracket}
        />
      </div>
    </header>
  );
};

export default Header;
