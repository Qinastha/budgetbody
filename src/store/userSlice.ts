import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ApplicationSettingsForm,
  IAnalytics,
  IApplicationSettings,
  ICurrency,
  IFinances,
  IUser,
  RegisterProfileForm,
} from "../core";
import axios from "axios";
import { Categories } from "../core/types/categories";
import { IMainExpenses } from "../core/interfaces/IMainExpenses";

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

export const allCurrencies: ICurrency[] = [
  { name: "US Dollar", code: "USD", symbol: "$" },
  { name: "Euro", code: "EUR", symbol: "€" },
  { name: "Ukrainian Hryvnia", code: "UAH", symbol: "₴" },
];

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

export const updateProfileData = createAsyncThunk(
  "userData/updateProfileData",
  async (data: Partial<RegisterProfileForm>) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/update-profile`,
        data,
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
        console.error("Failed to update user data");
      }
    } catch (err) {
      throw err;
    }
  },
);

export const updateApplicationSettingsData = createAsyncThunk(
  "userData/updateApplicationSettingsData",
  async (data: ApplicationSettingsForm) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/update-application`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.value) {
        console.log(response.data.value);
        return response.data.value;
      } else {
        console.error("Failed to update application settings");
      }
    } catch (err) {
      throw err;
    }
  },
);

export const deleteUserProfile = createAsyncThunk(
  "userData/deleteUserProfile",
  async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/user`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.status == 204) {
        localStorage.removeItem("token");
        return response.data;
      } else {
        console.error("Failed to delete user profile");
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
    getUserExpenses: state => state.expenses,
    getUserIncomes: state => state.incomes,
    getUserCurrency: state => state.applicationSettings.currency,
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
    builder.addCase(
      updateProfileData.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        return {
          ...state,
          userName: action.payload.userName,
          gender: action.payload.gender,
          dateOfBirth: action.payload.dateOfBirth,
          address: action.payload.address,
        };
      },
    );
    builder.addCase(
      updateApplicationSettingsData.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        return {
          ...state,
          applicationSettings: {
            ...state.applicationSettings,
            ...action.payload.applicationSettings,
          },
        };
      },
    );
    builder.addCase(deleteUserProfile.fulfilled, state => {
      return initialState;
    });
  },
});

export const { setUserAvatar } = user.actions;

export const {
  getUser,
  getUserAvatar,
  getUserExpenses,
  getUserIncomes,
  getUserCurrency,
} = user.selectors;

export default user.reducer;
