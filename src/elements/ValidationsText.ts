import styled from "styled-components";

export const ValidationsText = styled.small`
  font-size: 0.8rem;
  color: #eb4034;
  font-weight: 500;
  padding-left: 0.2em;
  animation: fadein 0.3s linear;

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
