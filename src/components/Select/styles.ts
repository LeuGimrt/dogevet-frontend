import styled from "styled-components";

export const SelectContainer = styled.div`
  margin-top: 20px;
`;

export const SelectInput = styled.select`
  margin-top: 8px;
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
`;
