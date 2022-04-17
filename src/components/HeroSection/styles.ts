import styled from "styled-components";
import HeroImage from "../../assets/hero-background.jpg";

export const Container = styled.div`
  background-image: url(${HeroImage});
  height: 60vh;
  background-size: cover;
  display: flex;
  align-items: center;
  padding: 8%;
`;

export const HeroContent = styled.div`
  max-width: 60%;
  color: ${({ theme }) => theme.secondary};
  @media (max-width: 576px) {
    text-align: center;
    max-width: 100%;
  }
`;
