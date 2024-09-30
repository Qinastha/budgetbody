import React from "react";
import "./Navbar.scss";
import { MiniProfile } from "../../../Components";
import { NavLink } from "react-router-dom";
import { Logo } from "../Logo/Logo";

export const Navbar: React.FC = () => {
  return (
    <div className="navbarContainer">
      <MiniProfile />
      <div className="navbarContainer--links">
        <NavLink to="/"> Dashboard </NavLink>
        <NavLink to="/expenses"> Expenses </NavLink>
        <NavLink to="/settings"> Settings </NavLink>
      </div>
      <Logo />
    </div>
  );
};
