import React, {
  FC,
  PropsWithChildren,
  ReactChild,
  ReactElement,
  ReactNode,
} from "react";
import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { ROUTE } from "../../constants";
import { UserLoginContext } from "../UserLoginProvider/UserLoginProvider";

interface RequireLoginProps {
  children: ReactElement;
}

export const RequireLogin: FC<PropsWithChildren<RequireLoginProps>> = ({
  children,
}) => {
  const {
    state: { login },
  } = useContext(UserLoginContext);
  const location = useLocation();

  if (!login) {
    return <Navigate to={ROUTE.AUTH} state={{ from: location }} replace />;
  }

  return children;
};
