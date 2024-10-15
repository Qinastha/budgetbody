import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ApplicationSettingsForm,
  DashboardCalculations,
  IAnalytics,
  IApplicationSettings,
  ICurrency,
  IFinances,
  ITimeSeries,
  IUser,
  newExpenseForm,
  RegisterProfileForm,
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
  theme: "",
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
    totalExpense: zeroFinances,
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
  async (data: Omit<RegisterProfileForm, "email" | "password">) => {
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
      if (response?.data?.value) {
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
      if (response?.data?.value) {
        localStorage.setItem(
          "theme",
          response.data.value.applicationSettings.theme,
        );
        return response.data.value;
      } else {
        console.error("Failed to update application settings");
      }
    } catch (err) {
      throw err;
    }
  },
);

export const updateMonthFinances = createAsyncThunk(
    "userData/updateMonthFinances",
    async (data: any) => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/time-series/month-update`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                },
            );
            if (response?.data?.value) {
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
      if (response.status === 204) {
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

export const handleAddExpense = createAsyncThunk(
  "userData/handleAddExpense",
  async (data: newExpenseForm) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/time-series/create-expense`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data?.value) {
        return response.data.value;
      }
    } catch (err) {
      console.error(err);
    }
  },
);

export const handleDeleteExpense = createAsyncThunk(
  "userData/handleDeleteExpense",
  async (expenseId: string) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/time-series/delete-expense/${expenseId}`,
        { headers },
      );
      if (response.status === 204) {
        const userResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/user`,
          { headers },
        );
        if (userResponse.data.value) {
          return userResponse.data.value;
        } else {
          console.error("Failed to fetch user data");
        }
      } else {
        console.error("Failed to delete expense");
      }
    } catch (err) {
      console.error(err);
    }
  },
);

export const handleCalculationFunction = createAsyncThunk(
  "userData/handleCalculationFunction",
  async (selectedCalculation: DashboardCalculations) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/analytics/dashboard-calculation`,
        {
          selectedCalculation,
        },
        { headers },
      );
      if (response.data?.value) {
        return response.data.value;
      }
    } catch (err) {
      console.error(err);
    }
  },
);

export const handleTimeResolution = createAsyncThunk(
  "userData/handleTimeResolution",
  async (timeResolutionData: any) => {
    const { analyticsType, timeResolution } = timeResolutionData;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/analytics/time-resolution/${analyticsType}`,
        {
          timeResolution,
        },
        { headers },
      );
      if (response.data?.value) {
        return response.data.value;
      }
    } catch (err) {
      console.error(err);
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
    getUserExpenses: state => state.expenses,
    getUserCurrency: state => state.applicationSettings.currency,
    getExpenseAnalytics: state => state.analytics.expensesAnalytics,
    getDashboardAnalytics: state => state.analytics.dashboardAnalytics,
    getDiagramType: state => state.applicationSettings.diagramLineType,
    getDashboardActivePeriod: state =>
      state.analytics.dashboardAnalytics.timeResolution,
    getExpensesActivePeriod: state =>
      state.analytics.expensesAnalytics.timeResolution,
    getUserTheme: state => state.applicationSettings.theme,
      getLastIncome: state => {
        console.log('check in state')
          console.log(state)
          console.log([...state.incomes].sort((a: ITimeSeries,b: ITimeSeries) => b.timestamp.getTime() - a.timestamp.getTime()))
          return state.incomes.length > 0 ? [...state.incomes].sort((a: ITimeSeries,b: ITimeSeries) => b.timestamp.getTime() - a.timestamp.getTime())[0] : null
      }
  },
  extraReducers: builder => {
    builder.addCase(
      fetchUserData.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        if (!localStorage.getItem("theme")) {
          localStorage.setItem(
            "theme",
            action.payload.applicationSettings.theme,
          );
        }
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
          ...action.payload,
        };
      },
    );
      builder.addCase(
          updateMonthFinances.fulfilled,
          (state, action: PayloadAction<IUser>) => {
              return {
                  ...state,
                  ...action.payload,
              };
          },
      );
    builder.addCase(deleteUserProfile.fulfilled, state => {
      return initialState;
    });
    builder.addCase(
      handleAddExpense.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        return {
          ...state,
          ...action.payload,
        };
      },
    );
    builder.addCase(
      handleDeleteExpense.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        return {
          ...state,
          ...action.payload,
        };
      },
    );
    builder.addCase(
      handleCalculationFunction.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        return {
          ...state,
          ...action.payload,
        };
      },
    );
    builder.addCase(
      handleTimeResolution.fulfilled,
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

export const {
  getUser,
  getUserExpenses,
  getUserCurrency,
  getExpenseAnalytics,
  getDashboardAnalytics,
  getDashboardActivePeriod,
  getExpensesActivePeriod,
  getUserTheme,
    getLastIncome
} = user.selectors;

export default user.reducer;
