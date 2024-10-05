import { IFinances } from "./IFinances";
import { Categories } from "../types/categories";

export interface ITimeSeries {
  _id: string;
  timestamp: Date;
  value: IFinances;
  category: Categories;
}
