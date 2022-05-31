// YourComponent.stories.ts|tsx

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import FormLogin from "./FormLogin";

export default {
  title: "Game_of_life/FormLogin",
  component: FormLogin,
  decorators: [
    (Story) => (
      <div
        style={{
          width: 250,
        }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof FormLogin>;

const Template: ComponentStory<typeof FormLogin> = (args) => (
  <FormLogin {...args} />
);

export const FormLoginIsLogout = Template.bind({});

FormLoginIsLogout.args = {
  login: "",
  onLogin: () => null,
  onLogout: () => null,
};

export const FormLoginIsLogin = Template.bind({});

FormLoginIsLogin.args = {
  login: "UserName",
  onLogin: () => null,
  onLogout: () => null,
};
