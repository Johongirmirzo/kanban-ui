import styled, { css } from "styled-components";
const EditTaskForm = styled.form`
  ${(props) =>
    props.isLightMode &&
    css`
      & label {
        color: #222;
      }
      & .edit-task-btn {
        border: 2px solid #000;
        color: #111;
      }
      & input,
      textarea {
        color: #222;
      }
      & input::placeholder {
        color: #666;
      }
      & textarea::placeholder {
        color: #666;
      }
    `}
`;
const EditTaskFormControl = styled.div`
  margin-bottom: 15px;
`;
const EditTaskLabel = styled.label`
  color: #fff;
  padding-bottom: 10px;
`;
const EditTaskInput = styled.input`
  display: block;
  width: 100%;
  padding: 10px 8px;
  border: 1px solid #546990;
  background: transparent;
  outline: 0;
  border-radius: 5px;
  font-size: 0.95rem;
  color: #a1b0cb;
  transition: padding 0.25s ease-out;
  &::placeholder {
    color: #a1b0cb;
  }
  &:focus {
    padding-left: 15px;
  }
`;
const EditTaskDescription = styled.textarea`
  display: block;
  width: 100%;
  padding: 10px 8px;
  border: 1px solid #546990;
  background: transparent;
  outline: 0;
  border-radius: 5px;
  font-size: 0.95rem;
  color: #a1b0cb;
  height: 140px;
  resize: none;
  transition: padding 0.25s ease-out;
  &::placeholder {
    color: #a1b0cb;
  }
  &:focus {
    padding-left: 15px;
  }
`;
const EditSubtaskTitle = styled.p`
  margin-bottom: 15px;
`;
const EditSubtaskBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;
const EditSubtaskClose = styled.div`
  font-weight: bold;
  font-size: 1.25rem;
  cursor: pointer;
`;
const EditSubTaskBtn = styled.button`
  display: block;
  width: 100%;
  border: 0;
  border-radius: 30px;
  padding: 10px 0;
  color: #222;
  font-weight: 700;
  font-size: 1.05rem;

  cursor: pointer;
  background: #fff;
  margin: 20px 0;
`;

const EditTaskStatus = styled.select`
  display: block;
  width: 100%;
  background: #223;
  padding: 10px;
  color: #fff;
  border: 1px solid #546990;
  border-radius: 5px;
  ${(props) =>
    props.isLightMode &&
    css`
      background: #f7f7f7;
      color: #111;
    `}
`;
const EditTaskBtn = styled.button`
  display: block;
  width: 100%;
  border: 0;
  border-radius: 30px;
  padding: 10px 0;
  color: #fff;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  background: hsl(247, 84%, 66%);

  margin: 20px 0;
`;
const EditTaskFieldError = styled.p`
  color: hsl(0, 88%, 50%);
  font-size: 0.9rem;
  margin-top: 2px;
  font-weight: 600;
`;

export {
  EditTaskForm,
  EditTaskFormControl,
  EditTaskLabel,
  EditTaskInput,
  EditTaskDescription,
  EditSubtaskTitle,
  EditSubtaskBox,
  EditSubtaskClose,
  EditSubTaskBtn,
  EditTaskStatus,
  EditTaskBtn,
  EditTaskFieldError,
};
