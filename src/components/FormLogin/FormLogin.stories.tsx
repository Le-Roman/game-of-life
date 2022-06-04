// YourComponent.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import FormLogin from "./FormLogin";
import {
  ContextState,
  UserLoginContext,
} from "../UserLoginProvider/UserLoginProvider";
import { MemoryRouter } from "react-router-dom";

const contextValue: ContextState = {
  state: { login: "" },
  onLogin: () => null,
  onLogout: () => null,
};

export default {
  title: "Game_of_life/FormLogin",
  component: FormLogin,
  decorators: [
    (Story) => (
      <UserLoginContext.Provider value={{ ...contextValue }}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </UserLoginContext.Provider>
    ),
  ],
} as ComponentMeta<typeof FormLogin>;

const Template: ComponentStory<typeof FormLogin> = () => <FormLogin />;

export const FormLoginDefault = Template;
