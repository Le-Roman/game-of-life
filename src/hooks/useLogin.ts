import { useEffect } from "react";
import { useRouter } from "next/router";
import { ROUTE } from "../constants";
import { loadLocalLogin } from "../localStorage";
import { selectIsLogined } from "../state/userSlice/userSelectors";
import { useUserActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector";

export const useLogin = () => {
  const router = useRouter();
  const { login } = useUserActions();
  const isLogined = useTypedSelector(selectIsLogined);

  useEffect(() => {
    if (isLogined) {
      router.push(ROUTE.ROOT);
    } else {
      const user = loadLocalLogin();
      if (user) {
        login(user);
      } else {
        router.push(ROUTE.AUTH);
      }
    }
  }, [isLogined]);

  return { isLogined };
};
