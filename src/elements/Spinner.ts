import styled, { css } from "styled-components";
import theme from "../styles/theme";

type Props = {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "dark";
};

export const Spinner = styled.div<Props>`
  display: inline-block;

  ::after {
    content: " ";
    display: block;
    margin: 8px;
    border-radius: 50%;
    border-style: solid;
    animation: rotate 1.2s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  ${({ size = "md" }) => {
    switch (size) {
      case "sm":
        return css`
          ::after {
            width: 2rem;
            height: 2rem;
            border-width: 3px;
          }
        `;
      case "md":
        return css`
          ::after {
            width: 3rem;
            height: 3rem;
            border-width: 4px;
          }
        `;
      case "lg":
        return css`
          ::after {
            width: 4rem;
            height: 4rem;
            border-width: 5px;
          }
        `;
    }
  }}

  ${({ color = "dark" }) => {
    switch (color) {
      case "primary":
        return css`
          ::after {
            border-color: ${theme.primary} transparent ${theme.primary}
              transparent;
          }
        `;

      case "secondary":
        return css`
          ::after {
            border-color: ${theme.secondary} transparent ${theme.secondary}
              transparent;
          }
        `;
      case "dark":
        return css`
          ::after {
            border-color: ${theme.dark} transparent ${theme.dark} transparent;
          }
        `;
    }
  }}
`;
