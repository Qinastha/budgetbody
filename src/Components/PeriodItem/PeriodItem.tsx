import React, { useState } from "react";
import "./PeriodItem.scss";
import { Periods } from "../../core";

export const PeriodItem: React.FC = () => {
  const periods: Periods[] = ["1m", "3m", "6m", "1y"];
  const [activePeriod, setActivePeriod] = useState<Periods>("1m");

  const handlePeriodChange = (period: Periods) => {
    setActivePeriod(period);
  };

  return (
    <div className="periodItemContainer">
      <ul>
        {periods.map((period: Periods) => (
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
