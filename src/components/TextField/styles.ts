import styled from "styled-components";

export const TextFieldContainer = styled.div`
  margin-top: 8px;
`;

export const Input = styled.input`
  margin-top: 12px;
  display: block;
  width: 100%;
  padding: 0.8em 0.5em;
  border: none;
  border-radius: 5px;
  outline: none;
  border: 1px solid #ffcf70;
  background-color: #ffffff;
  &:focus {
    outline: 2px solid #ffcf70;
  }
  &:disabled {
    background-color: #f7f7f7;
  }
`;

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
