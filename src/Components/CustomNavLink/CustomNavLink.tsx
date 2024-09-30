import React from "react";
import { NavLink } from "react-router-dom";
import "./CustomNavLink.scss";

interface CustomNavLinkProps {
  link: string;
  label: string;
}

export const CustomNavLink: React.FC<CustomNavLinkProps> = ({
  link,
  label,
}) => {
  return <NavLink to={link}> {label} </NavLink>;
};
