import React from "react";
import "./CustomProgressItem.scss";

export const CustomProgressItem: React.FC = () => {
  return (
    <div className="customProgressItem">
      <span className="customProgressItem--header">
        <h5>Category</h5>
        <p>300$</p>
      </span>
      <progress
        value={300}
        max={1000}
        className="customProgressItem--progress"
      />
    </div>
  );
};
