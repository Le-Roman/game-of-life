import React from "react";
import { Provider } from "react-redux";
import Game from "../src/components/Game/Game";
import { store } from "../src/state/store";

const Index = () => {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
};

export default Index;
