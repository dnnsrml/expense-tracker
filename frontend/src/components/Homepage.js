import React from "react";
import Header from "./Header";
import { TotalProvider } from "./TotalContext";
import MainDisplay from "./MainDisplay";
import Footer from "./Footer";
import Breakdown from "./Breakdown";

function HomePage() {
  return (
    <div
      className="main-container"
      style={{
        backgroundColor: "var(--container-background-color)",
        color: "var(--container-text-color)",
      }}
    >
      <Header />
      <TotalProvider>
        <MainDisplay />
        <Breakdown />
        <Footer />
      </TotalProvider>
    </div>
  );
}

export default HomePage;
