import React, { FC, memo } from "react";
import { FlexBox } from "../FlexBox";

interface InputRangePropsType {
  value: number | undefined;
  [key: string]: unknown;
}

const InputRange: FC<InputRangePropsType> = memo((props) => {
  return (
    <FlexBox alignItems={"center"}>
      <input type="range" {...props} />
      <span>{props.value}</span>
    </FlexBox>
  );
});

export default InputRange;
