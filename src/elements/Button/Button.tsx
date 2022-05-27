import styled from "styled-components";

interface ButtonProps {
  mode?: "primary" | "secondary";
}

export const Button = styled.button`
  font-family: Roboto, Golos, monospace;
  font-size: 1rem;
  background-color: ${({ mode }: ButtonProps) => getBackgroundColor(mode)};
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`;

const backgroundColor = {
  primary: "lightgreen",
  secondary: "#fafad2",
};

function getBackgroundColor(mode: ButtonProps["mode"]) {
  return (mode && backgroundColor[mode]) || "#fff";
}
