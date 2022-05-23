// YourComponent.stories.ts|tsx

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Cell from "./Cell";

export default {
  title: "Game_of_life/Cell",
  component: Cell,
} as ComponentMeta<typeof Cell>;

const Template: ComponentStory<typeof Cell> = (args) => <Cell {...args} />;

export const CellDefault = Template.bind({});

CellDefault.args = {
  cellData: 1,
};
