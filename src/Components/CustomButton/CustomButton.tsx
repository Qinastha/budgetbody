import React from "react";
import "./CustomButton.scss";

interface CustomButtonProps {
  label: string;
  style: string;
  onClick: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  style,
  onClick,
}) => {
  return (
    <button type="button" className={style} onClick={onClick}>
      {label}
    </button>
  );
};
