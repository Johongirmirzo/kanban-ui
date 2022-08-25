import styled, { css } from "styled-components";

const TaskBox = styled.div`
  /* background: hsl(240, 10%, 25%); */
  background: #283144;
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  ${(props) =>
    props.isLightMode &&
    css`
      background: #fff;
      & h2 {
        color: #222;
      }
    `}
`;
const TaskTitle = styled.h2`
  color: #fff;
`;
const TaskSubtasksText = styled.p`
  color: #999;
  font-weight: bold;
  margin-top: 15px;
`;

export { TaskBox, TaskTitle, TaskSubtasksText };
