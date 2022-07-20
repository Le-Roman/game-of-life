import React from "react";
import { Provider } from "react-redux";
import FormLogin from "../src/components/FormLogin/FormLogin";
import { store } from "../src/state/store";

const Auth = () => {
  return (
    <Provider store={store}>
      <FormLogin />
    </Provider>
  );
};

export default Auth;
