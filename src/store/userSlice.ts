import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IAnalytics,
  IApplicationSettings,
  ICurrency,
  IFinances,
  IUser,
} from "../core";
import axios from "axios";

export const zeroFinances: IFinances = {
  USD: 0,
  EUR: 0,
  UAH: 0,
};

export const defaultCurrency: ICurrency = {
  name: "US Dollar",
  code: "USD",
  symbol: "$",
};

export const defaultExpenses = {
  monthHealthcare: zeroFinances,
  monthTax: zeroFinances,
  monthHousing: zeroFinances,
  monthCredit: zeroFinances,
  monthOther: zeroFinances,
  food: zeroFinances,
  transport: zeroFinances,
  shopping: zeroFinances,
  entertainment: zeroFinances,
};

export const defaultApplicationSettings: IApplicationSettings = {
  monthIncome: zeroFinances,
  monthHealthcare: zeroFinances,
  monthTax: zeroFinances,
  monthHousing: zeroFinances,
  monthCredit: zeroFinances,
  monthOther: zeroFinances,
  currency: defaultCurrency,
  theme: "dark-green",
  diagramLineType: "line",
};

export const defaultAnalytics: IAnalytics = {
  dashboardAnalytics: {
    totalIncome: zeroFinances,
    totalExpense: zeroFinances,
    totalSave: zeroFinances,
    diagramData: [],
    selectedCalculation: "income" || "expense" || "save",
    timeResolution: "1m" || "3m" || "6m" || "1y",
  },
  expensesAnalytics: {
    mainExpenses: defaultExpenses,
    timeResolution: "1m" || "3m" || "6m" || "1y",
  },
};

const initialState: IUser = {
  email: "",
  userName: "",
  gender: "",
  dateOfBirth: "",
  address: "",
  avatar: "",
  applicationSettings: defaultApplicationSettings,
  incomes: [],
  expenses: [],
  analytics: defaultAnalytics,
};

export const fetchUserData = createAsyncThunk(
  "userData/getUserData",
  async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.value) {
        return response.data.value;
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (err) {
      throw err;
    }
  },
);

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAvatar: (state, action: PayloadAction<string>) => {
      return { ...state, avatar: action.payload };
    },
  },
  selectors: {
    getUser: state => state,
    getUserAvatar: state => state.avatar,
  },
  extraReducers: builder => {
    builder.addCase(
      fetchUserData.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        return {
          ...state,
          ...action.payload,
        };
      },
    );
  },
});

export const { setUserAvatar } = user.actions;

export const { getUser, getUserAvatar } = user.selectors;

export default user.reducer;
