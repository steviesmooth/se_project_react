import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, isloggedIn, ...props }) {
  return (
    <Route {...props}>{isloggedIn ? children : <Redirect to={"/"} />}</Route>
  );
}

export default ProtectedRoute;
