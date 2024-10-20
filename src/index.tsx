import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import "./index.scss";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV !== "production") disableReactDevTools();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
