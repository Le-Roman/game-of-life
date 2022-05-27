import styled from "styled-components";

interface FlexBoxProps {
  flex?: "block" | "inline";
  flexDirection?: "vertical" | "horisontal";
  alignItems?: string;
  justifyContent?: string;
  gap?: string;
  width?: string;
}

export const FlexBox = styled.div`
  display: ${({ flex }: FlexBoxProps) =>
    flex === "inline" ? "inline-flex" : "flex"};
  flex-direction: ${({ flexDirection }: FlexBoxProps) =>
    flexDirection === "vertical" ? "column" : "row"};
  gap: ${({ gap }: FlexBoxProps) => gap || ".5rem"};
  align-items: ${({ alignItems }) => alignItems || "unset"};
  justify-content: ${({ justifyContent }: FlexBoxProps) =>
    justifyContent || "unset"};
  font-family: Roboto, Golos, monospace;
  width: ${({ width }) => width};
`;
