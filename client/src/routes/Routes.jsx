import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Home from "../pages/home/HomePage/Home";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
]);

export default router;
