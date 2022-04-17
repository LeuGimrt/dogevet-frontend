import styled from "styled-components";

type Props = {
  fullwidth: boolean;
  fullheight: boolean;
};

export const LoadingContainer = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ fullwidth }) => (fullwidth ? "100%" : "auto")};
  height: ${({ fullheight }) => (fullheight ? "100%" : "auto")};
`;
