import React from "react";
import { useEffect, useState } from "react";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  // Function to fetch categories
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/financial/categories/monthly-totals`
    )
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div>
      <h1>EXPENSE TRACKER</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.categoryId}>
            {category.categoryName} - ${category.totalAmount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
