import React from "react";
import "./PeriodItem.scss";
import { TimeResolution } from "../../core";

interface PeriodItemProps {
  activePeriod: TimeResolution;
  handlePeriodChange: (period: TimeResolution) => void;
}

export const PeriodItem: React.FC<PeriodItemProps> = ({
  activePeriod,
  handlePeriodChange,
}) => {
  const periods: TimeResolution[] = ["1m", "3m", "6m", "1y"];

  return (
    <div className="periodItemContainer">
      <ul>
        {periods.map((period: TimeResolution) => (
          <li
            key={period}
            className={activePeriod === period ? "active" : ""}
            onClick={() => handlePeriodChange(period)}>
            {period}
          </li>
        ))}
      </ul>
    </div>
  );
};
