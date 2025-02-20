import { Navigate, useLocation } from "react-router-dom";

import PropTypes from "prop-types";

import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import Spinner from "../components/Spinner/Spinner";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);

  const location = useLocation();

  if (loading) {
    return <Spinner />;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
