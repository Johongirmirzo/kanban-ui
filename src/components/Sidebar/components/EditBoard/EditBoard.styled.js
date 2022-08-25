import styled, { css } from "styled-components";

const EditBoardBox = styled.div`
  padding-left: 15px;
  margin-top: 20px;
`;
const EditBoardText = styled.p`
  color: hsl(247, 84%, 66%);
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
`;
const EditBoardForm = styled.form``;
const EditBoardInput = styled.input`
  display: block;
  width: 100%;
  padding: 10px 8px;
  border: 1px solid #546990;
  background: transparent;
  outline: 0;
  font-size: 0.9rem;
  border-radius: 5px;
  color: #a1b0cb;
  &::placeholder {
    color: #a1b0cb;
  }
  ${(props) =>
    props.isLightMode &&
    css`
      color: #333;
      &::placeholder {
        color: #777;
      }
    `}
`;
const Button = styled.button`
  padding: 8px 12px;
  margin-top: 5px;
  border: 0;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
`;
const EditSubmitBtn = styled(Button)`
  background: orange;
`;
const EditCancelBtn = styled(Button)`
  border: 1px solid lightblue;
  color: darkblue;
  margin-left: 5px;
`;

export {
  EditBoardBox,
  EditBoardText,
  EditBoardForm,
  EditBoardInput,
  Button,
  EditSubmitBtn,
  EditCancelBtn,
};
