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
  :focus {
    outline: 2px solid #ffcf70;
  }
  :disabled {
    background-color: #f7f7f7;
  }
  ::-webkit-file-upload-button {
    background-color: #555;
    border-radius: 4px;
    padding: 0.6em 2em;
    margin-right: 1em;
    border: none;
    color: white;
    :hover {
      background-color: #333;
    }
  }
`;
