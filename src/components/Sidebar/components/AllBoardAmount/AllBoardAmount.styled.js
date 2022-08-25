import styled, { css } from "styled-components";
const BoardsAmount = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
  padding-left: 15px;
  color: #a1b0cb;
  font-weight: bold;
  ${(props) =>
    props.isLightMode &&
    css`
      color: #333;
    `}
`;
export { BoardsAmount };
