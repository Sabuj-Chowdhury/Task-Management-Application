import { createBrowserRouter } from "react-router";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Login from "../pages/Login/LoginPage/Login";
import Home from "../pages/home/HomePage/Home";
import PrivateRoute from "./PrivateRoute";
import TaskUpdate from "../pages/TaskUpdate/TaskUpdate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },

  {
    path: "/task/:id",
    element: (
      <PrivateRoute>
        <TaskUpdate />
      </PrivateRoute>
    ),
  },
]);

export default router;
