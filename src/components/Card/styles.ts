import styled, { css } from "styled-components";

type CardContainerProps = {
  size?: "sm" | "md" | "lg";
};

export const Container = styled.div`
  padding: 1em 1.5em;
`;

export const CardContainer = styled.section<CardContainerProps>`
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.45);
  border-radius: 3px;

  ${({ size = "md" }) => {
    switch (size) {
      case "sm":
        return css`
          width: 360px;
          @media (max-width: 576px) {
            width: 300px;
          }
        `;
      case "md":
        return css`
          width: 520px;

          @media (max-width: 768px) {
            width: auto;
          }
          @media (max-width: 576px) {
            width: 300px;
          }
        `;
      case "lg":
        return css`
          width: 90%;
          @media (max-width: 768px) {
            width: 520px;
          }
          @media (max-width: 576px) {
            width: 300px;
          }
        `;
    }
  }}

  @media (max-width: 576px) {
    width: auto;
  }
`;

export const MediaImg = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 3px 3px 0 0;
`;

export const MediaContainer = styled.div`
  width: 100%;
`;
