import React from "react";
import "./Dashboard.scss";
import { Chart, DashboardItem, PeriodItem } from "../../Components";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {
    getDashboardActivePeriod,
    getDashboardAnalytics,
    getUserCurrency, handleCalculationFunction, handleTimeResolution,
} from "../../store/userSlice";
import {DashboardCalculations, TimeResolution} from "../../core";
import { useTranslation } from "react-i18next";

export const Dashboard: React.FC = () => {
    const { t } = useTranslation();
    const dashboardAnalytics = useAppSelector(getDashboardAnalytics);
    const userCurrency = useAppSelector(getUserCurrency);
    const activePeriod = useAppSelector(getDashboardActivePeriod)
    const dispatch = useAppDispatch();

    const handlePeriodChange = (timeResolution: TimeResolution) => {
        dispatch(handleTimeResolution({analyticsType: 'dashboardAnalytics',timeResolution }))
    };

    const submitCalculationFunction = (calFunc: DashboardCalculations) => {
        dispatch(handleCalculationFunction(calFunc))
    }

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
            <div className="dashboardContainer--widget">
                {/*{diagramType === "line"}*/}
                <Chart
                    activePeriod={activePeriod}
                    dashboardAnalytics={dashboardAnalytics}
                    userCurrency={userCurrency}
                />
            </div>
        </div>
    );
};
