import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

type ButtonProps = {
  bgcolor?: "primary" | "secondary" | "dark";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

const buttonStyle = css<ButtonProps>`
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.5);
  margin: 5px;
  transition: outline-color 200ms ease-in-out;
  outline: 2px dotted transparent;
  outline-offset: -2px;
  :hover:not(:disabled) {
    opacity: 0.9;
    outline-color: black;
  }

  :active {
    opacity: 0.5;
  }

  ${({ bgcolor = "primary", theme }) => {
    switch (bgcolor) {
      case "primary":
        return css`
          background-color: ${theme.primary};
          color: #111;
        `;
      case "secondary":
        return css`
          background-color: ${theme.secondary};
          color: #111;
        `;
      case "dark":
        return css`
          background-color: ${theme.dark};
          color: #fff;
        `;
    }
  }}
  ${({ size = "md" }) => {
    switch (size) {
      case "sm":
        return css`
          font-size: 0.8rem;
          padding: 0.7em 2.5em;
        `;
      case "md":
        return css`
          font-size: 0.95rem;
          padding: 0.9em 3em;
        `;
      case "lg":
        return css`
          font-size: 1.05rem;
          padding: 1em 3.5em;
        `;
    }
  }}
  ${({ fullWidth = false }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  :disabled {
    background-color: #999;
  }
`;

export const Button = styled.button<ButtonProps>`
  ${buttonStyle}
`;

export const LinkButton = styled(Link)<ButtonProps>`
  ${buttonStyle}
`;

export const ExternalLinkButton = styled.a`
  ${buttonStyle}
`;

export const ContainerLinkButton = styled(Link)`
  transition: transform 100ms linear;
  &:hover {
    transform: scale(1.01);
    opacity: 0.9;
  }
`;
