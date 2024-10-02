import React from "react";
import "./Dashboard.scss";
import { DashboardItem } from "../../Components";
import { useAppSelector } from "../../hooks";
import { getUser } from "../../store/userSlice";

export const Dashboard: React.FC = () => {
  const user = useAppSelector(getUser);
  return (
    <div>
      <DashboardItem user={user} />
    </div>
  );
};
