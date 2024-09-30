import { ITimeSeries } from "./ITimeSeries";
import { IApplicationSettings } from "./IApplicationSettings";
import { IAnalytics } from "./IAnalytics";
import { Gender } from "../types";

export interface IUser {
  email: string;
  userName: string;
  gender: Gender;
  dateOfBirth: string;
  address: string;
  avatar: string;
  applicationSettings: IApplicationSettings;
  incomes: ITimeSeries[];
  expenses: ITimeSeries[];
  analytics: IAnalytics;
}
