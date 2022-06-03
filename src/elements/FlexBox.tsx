import styled from "styled-components";

interface FlexBoxProps {
  flex?: "block" | "inline";
  flexDirection?: "vertical" | "horisontal";
  alignItems?: string;
  justifyContent?: string;
  gap?: string;
  width?: string;
  margin?: string;
}

export const FlexBox = styled.div<FlexBoxProps>`
  display: ${({ flex }) => (flex === "inline" ? "inline-flex" : "flex")};
  flex-direction: ${({ flexDirection }) =>
    flexDirection === "vertical" ? "column" : "row"};
  gap: ${({ gap }) => gap || ".5rem"};
  align-items: ${({ alignItems }) => alignItems || "unset"};
  justify-content: ${({ justifyContent }) => justifyContent || "unset"};
  font-family: Roboto, Golos, monospace;
  width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
`;
