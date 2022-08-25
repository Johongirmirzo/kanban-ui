import styled, { css } from "styled-components";
const CreateBoardBox = styled.div`
  padding-left: 15px;
  margin-top: 20px;
`;
const CreateBoardText = styled.p`
  color: hsl(247, 84%, 66%);
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
`;
const CreateBoardForm = styled.form``;
const CreateBoardInput = styled.input`
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
  font-weight: bold;
  cursor: pointer;
`;

const CreateSubmitBtn = styled(Button)`
  margin-right: 5px;
  border: 1px solid hsl(247, 84%, 66%);
  background: hsl(247, 84%, 66%);
  cursor: pointer;
`;
const CreateCancelBtn = styled(Button)`
  border: 1px solid hsl(247, 84%, 66%);
  color: hsl(247, 84%, 66%);
`;

export {
  CreateBoardBox,
  CreateBoardText,
  CreateBoardForm,
  CreateBoardInput,
  Button,
  CreateSubmitBtn,
  CreateCancelBtn,
};
