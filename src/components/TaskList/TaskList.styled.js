import styled, { css } from "styled-components";

const TaskContainer = styled.div`
  padding: 20px;
`;
const TaskRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1160px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const TaskHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 25px;
`;

const TaskBox = styled.div``;
const TaskCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;
const TaskTodoCircle = styled(TaskCircle)`
  background: hsl(183, 100%, 50%);
`;
const TaskDoingCircle = styled(TaskCircle)`
  background: hsl(265, 78%, 56%);
`;
const TaskDoneCircle = styled(TaskCircle)`
  background: hsl(160, 100%, 50%);
`;
const TaskStatusAmount = styled.p`
  color: #a1b0cb;
  font-weight: bold;
`;

export {
  TaskContainer,
  TaskRow,
  TaskHeader,
  TaskBox,
  TaskCircle,
  TaskTodoCircle,
  TaskDoingCircle,
  TaskDoneCircle,
  TaskStatusAmount,
};
