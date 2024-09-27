import React from "react";
import "./Layout.scss";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <div className="layout">
      <header>
        <div className="headerContent"></div>
      </header>
      <main>
        <div className="mainContent">
          <Outlet />
        </div>
      </main>
      <footer>Footer</footer>
    </div>
  );
};
