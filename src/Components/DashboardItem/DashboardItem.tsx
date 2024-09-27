import React from "react";
import "./DashboardItem.scss";

export const DashboardItem: React.FC = () => {
  return (
    <div className="dashboardItemContainer">
      <div className="dashboardItemContainer--module">
        <h4>Income</h4>
        <p>$1000</p>
      </div>
      <div className="dashboardItemContainer--module">
        <h4>Expense</h4>
        <p>$800</p>
      </div>
      <div className="dashboardItemContainer--module">
        <h4>Saved</h4>
        <p>$300</p>
      </div>
    </div>
  );
};
