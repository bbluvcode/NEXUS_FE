import React from "react";
import { Navigate } from "react-router-dom";
import { useDataContext } from "../context/DataContext";

const EmployeePrivateRoute = ({ element }) => {
  const {currentEmployee} = useDataContext();
  return currentEmployee ? element : <Navigate to="/employeelogin" replace />;
};

export default EmployeePrivateRoute;
