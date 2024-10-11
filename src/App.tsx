import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./i18n";
import { useAppSelector } from "./hooks";
import { getUserTheme } from "./store/userSlice";

export const App = () => {
  const [theme, setTheme] = useState<string | null>("orange-black");
  const userTheme = useAppSelector(getUserTheme);
  useEffect(() => {
    const defaultTheme =
      userTheme !== ""
        ? userTheme
        : localStorage.getItem("theme")
          ? localStorage.getItem("theme")
          : "orange-black";
    setTheme(defaultTheme);
  }, [userTheme]);

  return (
    <div className={`appContainer ${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
