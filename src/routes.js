import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout, PrivateRoute } from "./core";
import {
  Dashboard,
  Expenses,
  Login,
  NotFound,
  Register,
  Settings,
} from "./Pages";
import { userLoader } from "./loaders";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        loader={userLoader}
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
        <Route index element={<Dashboard />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>,
  ),
);

export default router;
