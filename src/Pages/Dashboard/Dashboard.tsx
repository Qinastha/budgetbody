import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import { Chart, DashboardItem, PeriodItem } from "../../Components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getDashboardActivePeriod,
  getDashboardAnalytics,
  getUserCurrency,
  getUserTheme,
  handleCalculationFunction,
  handleTimeResolution,
} from "../../store/userSlice";
import { DashboardCalculations, TimeResolution } from "../../core";
import { useTranslation } from "react-i18next";

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const dashboardAnalytics = useAppSelector(getDashboardAnalytics);
  const userCurrency = useAppSelector(getUserCurrency);
  const activePeriod = useAppSelector(getDashboardActivePeriod);
  const theme = useAppSelector(getUserTheme);
  const dispatch = useAppDispatch();

  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState<number>(
    window.innerHeight,
  );
  const [isPortraitMobile, setIsPortraitMobile] = useState<boolean>(false);

  const checkPortraitMobile = () => {
    const isPortrait = window.screen.orientation
      ? window.screen.orientation.type.startsWith("portrait") &&
        viewportWidth < 768
      : viewportWidth < 500;

    setIsPortraitMobile(isPortrait);
  };

  useEffect(() => {
    checkPortraitMobile();
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    const handleOrientationChange = () => {
      checkPortraitMobile();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  const handlePeriodChange = (timeResolution: TimeResolution) => {
    dispatch(
      handleTimeResolution({
        analyticsType: "dashboardAnalytics",
        timeResolution,
      }),
    );
  };

  const submitCalculationFunction = (calFunc: DashboardCalculations) => {
    dispatch(handleCalculationFunction(calFunc));
  };

  return (
    <div className="dashboardContainer">
      <div className="dashboardContainer--header">
        <h1>{t("dashboard.title")}</h1>
        <PeriodItem
          activePeriod={activePeriod}
          handlePeriodChange={handlePeriodChange}
        />
      </div>
      <div className="dashboardContainer--modules">
        <DashboardItem
          dashboardAnalytics={dashboardAnalytics}
          userCurrency={userCurrency}
          selectCalculation={submitCalculationFunction}
        />
      </div>
      {!isPortraitMobile ? (
        <div className="dashboardContainer--widget">
          <Chart
            activePeriod={activePeriod}
            dashboardAnalytics={dashboardAnalytics}
            userCurrency={userCurrency}
            theme={theme}
            viewportWidth={viewportWidth}
            viewportHeight={viewportHeight}
          />
        </div>
      ) : (
        <div className="dashboardContainer--phone_widget">
          <span className="material-symbols-outlined">screen_rotation</span>
          <p>Please rotate your device</p>
        </div>
      )}
    </div>
  );
};
