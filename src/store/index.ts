import { configureStore } from "@reduxjs/toolkit";
import general from "./appSlice";

const store = configureStore({
  reducer: {
    general,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
