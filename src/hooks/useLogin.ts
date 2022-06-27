import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../constants";
import { selectIsLogined } from "../state/userSlice/userSelectors";
import { useTypedSelector } from "./useTypedSelector";

export const useLogin = () => {
  const navigate = useNavigate();
  const isLogined = useTypedSelector(selectIsLogined);

  useEffect(() => {
    isLogined ? navigate(ROUTE.ROOT) : navigate(ROUTE.AUTH);
  }, [isLogined, navigate]);

  return { isLogined };
};
