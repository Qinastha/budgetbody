import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userName: "",
    email: "",
    avatarUrl: "",
    dob: "",
    gender: "",
    address: "",
    mouthIncome: "",
    healthcare: "",
    monthTax: "",
    housing: "",
    creditTax: "",
    otherExpenses: "",
    currency: "",
    appTheme: "",
    diagramLineType: "",
    categories: "",
  },
};

const general = createSlice({
  name: "general",
  initialState,
  reducers: {},
  selectors: {},
  extraReducers: builder => {},
});

export default general.reducer;
