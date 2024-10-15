import React, {useEffect, useRef, useState} from "react";
import "./Layout.scss";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getLastIncome, getUser, getUserCurrency, updateMonthFinances} from "../../../store/userSlice";
import {IUser} from "../../interfaces";

export const Layout: React.FC = () => {
  const [isNavbarHidden, setIsNavbarHidden] = useState<boolean>(false);
  const lastIncome = useAppSelector(getLastIncome)
  const user:IUser = useAppSelector(getUser);
  const userCurrency = useAppSelector(getUserCurrency)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(lastIncome && lastIncome.timestamp.getMonth() !== new Date(Date.now()).getMonth()
        && lastIncome.timestamp.getFullYear() !== new Date(Date.now()).getFullYear()){
      const {monthIncome,monthHealthcare,monthTax,monthCredit,monthHousing,monthOther} = user.applicationSettings
      console.log('dasfasd')
      console.log(lastIncome)
      console.error(monthIncome[userCurrency.code])
        dispatch(updateMonthFinances({
          monthIncome: monthIncome[userCurrency.code],
          monthCredit: monthCredit[userCurrency.code],
          monthHealthcare: monthHealthcare[userCurrency.code],
          monthHousing: monthHousing[userCurrency.code],
          monthOther: monthOther[userCurrency.code],
          monthTax: monthTax[userCurrency.code]
        }))
    }
  },[])

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
