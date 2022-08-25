import styled, { css } from "styled-components";

const DeleteModalForm = styled.form``;
const DeleteModalInput = styled.input`
  display: block;
  width: 100%;
  background: transparent;
  display: block;
  width: 100%;
  padding: 10px 8px;
  border: 1px solid #546990;
  background: transparent;
  outline: 0;
  border-radius: 5px;
  font-size: 0.95rem;
  color: hsl(219, 29%, 71%);
  transition: padding 0.25s ease-out;
  &::placeholder {
    color: hsl(219, 9%, 71%);
  }
  &:focus {
    padding-left: 15px;
  }
`;

const DeleteModalButton = styled.button`
  display: block;
  width: 100%;
  margin-top: 10px;
  border: 0;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  background: hsl(247, 84%, 66%);
  cursor: pointer;
  padding: 8px 15px;
  background: hsl(3, 84%, 44%);
  ${(props) =>
    props.disabled &&
    css`
      background: hsl(3, 54%, 44%);
      cursor: not-allowed;
    `}
`;

export { DeleteModalForm, DeleteModalInput, DeleteModalButton };
