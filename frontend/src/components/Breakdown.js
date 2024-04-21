import React from "react";
import { useTotal } from "./TotalContext";
import { useTheme } from "./ThemeContext";
import { formatNumber } from "../utils/utilityFunctions";
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

const Breakdown = () => {
  const { monthlyTotals } = useTotal();
  const { theme } = useTheme();

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

  return (
    <div className="breakdowns">
      {Array.isArray(monthlyTotals) &&
        monthlyTotals.map((thisCategory, index) => (
          <div
            key={thisCategory._id || `category-${index}`}
            className="breakdowns-row"
          >
            <div className="category-info">
              <div className="icon-container">
                <FontAwesomeIcon
                  icon={iconMapping[thisCategory.categoryName]?.icon}
                  style={{
                    color:
                      theme === "dark"
                        ? iconMapping[thisCategory.categoryName]?.darkColor
                        : iconMapping[thisCategory.categoryName]?.lightColor,
                  }}
                />
              </div>
              <span className="category-name">
                {thisCategory.categoryName.toUpperCase()}
              </span>
            </div>
            <span className="total-amount">
              {formatNumber(thisCategory.totalAmount)}
            </span>
          </div>
        ))}
    </div>
  );
};

export default Breakdown;
