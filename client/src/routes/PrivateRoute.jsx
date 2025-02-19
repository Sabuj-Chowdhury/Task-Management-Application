import { Navigate, useLocation } from "react-router-dom";

import PropTypes from "prop-types";

import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
// import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);

  const location = useLocation();

  if (loading) {
    return <div>Loading </div>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
