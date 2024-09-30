import React, { useState } from "react";
import "./PeriodItem.scss";
import { TimeResolution } from "../../core";

export const PeriodItem: React.FC = () => {
  const periods: TimeResolution[] = ["1m", "3m", "6m", "1y"];
  const [activePeriod, setActivePeriod] = useState<TimeResolution>("1m");

  const handlePeriodChange = (period: TimeResolution) => {
    setActivePeriod(period);
  };

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
