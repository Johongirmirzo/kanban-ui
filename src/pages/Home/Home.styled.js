import styled, { css } from "styled-components";

const HomeContainer = styled.div`
  display: flex;
`;
const MainArea = styled.div`
  flex: 1;
  background: #1c222f;
  min-height: 100vh;
  ${(props) =>
    props.isLightMode &&
    css`
      background: hsl(244, 91%, 98%);
    `}
`;
export { HomeContainer, MainArea };
