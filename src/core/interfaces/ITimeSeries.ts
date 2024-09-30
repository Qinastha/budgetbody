import { IFinances } from "./IFinances";
import { Categories } from "../types/categories";

export interface ITimeSeries {
  timestamp: Date;
  value: IFinances;
  category: Categories;
}
