import styled from "styled-components";
import {
  AlignItemsType,
  FlexDirectionType,
  JustifyContentType,
} from "../types/cssTypes";

type Props = {
  flex?: boolean;
  flexDirection?: FlexDirectionType;
  alignItems?: AlignItemsType;

  justifyContent?: JustifyContentType;
  py?: number;
  px?: number;
  fullheight?: boolean;
};

export const SectionContainer = styled.section<Props>`
  display: ${({ flex = false }) => (flex ? "flex" : "static")};
  flex-direction: ${({ flexDirection = "row" }) => flexDirection};
  align-items: ${({ alignItems = "stretch" }) => alignItems};
  justify-content: ${({ justifyContent = "flex-start" }) => justifyContent};
  padding-right: ${({ px = 1 }) => `${px}em`};
  padding-left: ${({ px = 1 }) => `${px}em`};
  padding-top: ${({ py = 1 }) => `${py}em`};
  padding-bottom: ${({ py = 1 }) => `${py}em`};
  margin-right: auto;
  margin-left: auto;
  height: ${({ fullheight = false }) => (fullheight ? "100%" : "auto")};

  @media (min-width: 768px) {
    width: 750px;
  }
  @media (min-width: 992px) {
    width: 970px;
  }
  @media (min-width: 1200px) {
    width: 1170px;
  }
`;
