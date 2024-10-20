import React, {useEffect, useRef, useState} from "react";
import "./Layout.scss";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getLastIncome, getUser, getUserCurrency, updateMonthFinances} from "../../../store/userSlice";
import {IUser} from "../../interfaces";

export const Layout: React.FC = () => {
  const [isNavbarHidden, setIsNavbarHidden] = useState<boolean>(false);
  const toggleNavbar = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsNavbarHidden(!isNavbarHidden);
  };
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchEndX.current) {
      touchEndX.current = e.changedTouches[0].clientX;
    }

    if (touchStartX.current - touchEndX.current > 50) {
      toggleNavbar(e);
    } else if (touchEndX.current - touchStartX.current > 50) {
      toggleNavbar(e);
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };
  return (
    <div className={`layoutContainer  ${!isNavbarHidden ? "" : "hidden"}`}>
      <header>
        <div className={`headerContent  ${!isNavbarHidden ? "" : "hidden"}`}>
          <Navbar />
        </div>
      </header>
      <main>
        <div
          className="mainContent"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
