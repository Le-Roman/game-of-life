import React from "react";
import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { ROUTE } from "../../constants";
import { UserLoginContext } from "../UserLoginProvider/UserLoginProvider";

export const RequireLogin = ({ children }: { children: JSX.Element }) => {
  const {
    state: { login },
  } = useContext(UserLoginContext);
  const location = useLocation();

  if (!login) {
    return <Navigate to={ROUTE.AUTH} state={{ from: location }} replace />;
  }

  return children;
};
