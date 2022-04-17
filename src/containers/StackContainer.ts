import styled from "styled-components";
import { AlignItemsType, JustifyContentType } from "../types/cssTypes";

type StackContainerProps = {
  direction?: "row" | "column";
  gap?: number;
  justify?: JustifyContentType;
  align?: AlignItemsType;
};

export const StackContainer = styled.div<StackContainerProps>`
  display: flex;
  flex-direction: ${({ direction = "row" }) => direction};
  gap: ${({ gap = 0 }) => `${gap}em`};
  justify-content: ${({ justify = "flex-start" }) => justify};
  align-items: ${({ align = "stretch" }) => align};
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
