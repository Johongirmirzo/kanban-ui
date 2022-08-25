import styled, { css } from "styled-components";
const AddTaskForm = styled.form`
  ${(props) =>
    props.isLightMode &&
    css`
      & label {
        color: #222;
      }
      & .add-task-btn {
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
const AddTaskFormControl = styled.div`
  margin-bottom: 15px;
`;
const AddTaskLabel = styled.label`
  color: #fff;
  padding-bottom: 10px;
`;
const AddTaskInput = styled.input`
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
const AddTaskDescription = styled.textarea`
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
const AddSubtaskTitle = styled.p`
  margin-bottom: 15px;
`;
const AddSubtaskBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;
const AddSubtaskClose = styled.div`
  font-weight: bold;
  font-size: 1.25rem;
  cursor: pointer;
`;
const AddSubTaskBtn = styled.button`
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

const AddTaskStatus = styled.select`
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
const AddTaskBtn = styled.button`
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

export {
  AddTaskForm,
  AddTaskFormControl,
  AddTaskLabel,
  AddTaskInput,
  AddTaskDescription,
  AddSubtaskTitle,
  AddSubtaskBox,
  AddSubtaskClose,
  AddSubTaskBtn,
  AddTaskStatus,
  AddTaskBtn,
};
