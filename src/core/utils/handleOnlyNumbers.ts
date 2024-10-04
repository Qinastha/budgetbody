import React from "react";

export const handleOnlyNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (
    !(
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "Tab" ||
      /^[0-9]$/.test(e.key)
    )
  ) {
    e.preventDefault();
  }
};
