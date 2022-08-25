import styled, { css } from "styled-components";

const SidebarContainer = styled.aside`
  max-width: 300px;
  min-width: 250px;
  /* background-color: hsl(240, 10%, 25%); */
  background: #283144;
  min-height: 100vh;
  padding: 20px 0;
  padding-right: 20px;
  transition: all 0.3s ease-out;
  position: relative;
  @media (max-width: 550px) {
    max-width: 250px;
    min-width: 200px;
  }
  &::before {
    position: absolute;
    content: "";
    right: 0;
    width: 100%;
    z-index: 0;
    top: 0;
    bottom: 0;
    box-shadow: 3px 0 10px rgba(0, 0, 0, 0.07);
  }

  &.light-mode::-webkit-scrollbar-thumb {
    background: hsl(0, 0%, 84%);
  }
  ${(props) =>
    props.isLightMode &&
    css`
      background: #fff;
      & h2 {
        color: #222;
      }
    `}
  ${(props) =>
    props.isSideBarToggled &&
    css`
      min-width: 80px;
      max-width: 80px;
    `};
`;
const SidebarTop = styled.div`
  position: sticky;
  top: 20px;
`;

const SidebarTopTextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SidebarLogo = styled.h2`
  color: #fff;
  padding-left: 15px;
  font-size: 1.9rem;
`;

export { SidebarContainer, SidebarTop, SidebarLogo, SidebarTopTextBox };
