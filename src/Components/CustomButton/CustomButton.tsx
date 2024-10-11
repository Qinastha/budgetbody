import React from "react";
import "./CustomButton.scss";

interface CustomButtonProps {
  label: string;
  view: string;
  onClick: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  view,
  onClick,
}) => {
  return (
    <button type="button" className={`customButton ${view}`} onClick={onClick}>
      {label}
    </button>
  );
};
