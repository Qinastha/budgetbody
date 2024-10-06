import React from "react";
import "./Layout.scss";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

export const Layout: React.FC = () => {
  return (
    <div className="layoutContainer">
      <header>
        <div className="headerContent">
          <Navbar />
        </div>
      </header>
      <main>
        <div className="mainContent">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
