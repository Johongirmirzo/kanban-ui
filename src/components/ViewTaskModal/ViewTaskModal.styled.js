import styled, { css } from "styled-components";

const TaskCheckBox = styled.div`
  background: hsl(240, 15%, 16%);
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  ${(props) =>
    props.isLightMode &&
    css`
      background: #f9f9f9;
      & label {
        color: #222;
      }
    `};
`;
const TaskLabel = styled.label`
  color: #fff;
  font-size: 1.05rem;
  ${(props) =>
    props.isLightMode &&
    css`
      color: #222;
    `}
`;

const TaskStatusSelect = styled.select`
  display: block;
  width: 100%;
  background: #223;
  padding: 10px;
  color: #fff;
  border: 1px solid #546990;
  border-radius: 5px;
  margin-top: 5px;
  ${(props) =>
    props.isLightMode &&
    css`
      background: #f7f7f7;
      color: #111;
    `}
`;
const TaskDeleteBtn = styled.button`
  padding: 10px 20px;
  background: hsl(3, 94%, 44%);
  border: 0;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  font-size: 1.05rem;
  cursor: pointer;
`;
const TaskEditBtn = styled(TaskDeleteBtn)`
  background: darkorange;
  margin-left: 10px;
`;

export {
  TaskCheckBox,
  TaskLabel,
  TaskStatusSelect,
  TaskDeleteBtn,
  TaskEditBtn,
};
