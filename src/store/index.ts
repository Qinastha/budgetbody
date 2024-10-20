import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";

const store = configureStore({
  reducer: {
    user,
  },
  devTools: false,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
