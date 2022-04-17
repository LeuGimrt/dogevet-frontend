import styled, { css } from "styled-components";

type HeadingProps = {
  color?: string;
  center?: boolean;
};

const headingStyle = css<HeadingProps>`
  margin-bottom: 0.5rem;
  font-family: "Quicksand", sans-serif;
  color: ${({ color }) => color || "#111"};
  text-align: ${({ center = false }) => (center ? "center" : "start")};
`;

export const H1 = styled.h1<HeadingProps>`
  ${headingStyle};
  font-size: 3rem;
`;

export const H2 = styled.h4<HeadingProps>`
  ${headingStyle};
  font-size: 2.5rem;
`;

export const H3 = styled.h4<HeadingProps>`
  ${headingStyle};
  font-size: 2rem;
`;

export const H4 = styled.h4<HeadingProps>`
  ${headingStyle};
  font-size: 1.75rem;
`;

export const H5 = styled.h4<HeadingProps>`
  ${headingStyle};
  font-size: 1.5rem;
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
`;

export const H6 = styled.h4<HeadingProps>`
  ${headingStyle};
  font-size: 1.25rem;
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
`;
