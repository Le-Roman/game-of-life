// YourComponent.stories.ts|tsx

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Cell from "./Cell";
import { cellStateAlive, cellStateEmpty } from "../../constants";

export default {
  title: "Game_of_life/Cell",
  component: Cell,
} as ComponentMeta<typeof Cell>;

const Template: ComponentStory<typeof Cell> = (args) => <Cell {...args} />;

export const CellAlive = Template.bind({});
CellAlive.args = {
  cellData: cellStateAlive,
};

export const CellEmpty = Template.bind({});
CellEmpty.args = {
  cellData: cellStateEmpty,
};
