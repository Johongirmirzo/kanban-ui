import styled, { css } from "styled-components";

const NavHeader = styled.header`
  /* background: hsl(240, 10%, 25%); */
  position: sticky;
  top: 0;
  background: #283144;
  border-left: 1px solid #777;
  height: 110px;
  padding: 20px;
  padding-bottom: 30px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  justify-content: center;
  ${(props) =>
    props.isLightMode &&
    css`
      background: #fff;
      border-left: 1px solid #f8f8f8;
      & h1 {
        color: #222;
      }
    `}
  @media(min-width: 868px) {
    justify-content: space-between;
    height: 90px;
  }
`;
const NavTitle = styled.h1`
  color: #fff;
  font-size: clamp(1.1rem, calc(2vw + 1rem), 2rem);
`;

const NavButtonsBox = styled.div`
  display: flex;
`;
const NavButton = styled.button`
  border: 0;
  display: inline-block;
  border-radius: 30px;

  color: #fff;
  font-weight: bold;
  background: hsl(247, 84%, 66%);
  cursor: pointer;
  padding: 8px 15px;

  @media (min-width: 760px) {
    padding: 15px 30px;
  }
`;
const NavLogoutButton = styled(NavButton)`
  background: hsl(3, 94%, 44%);
  margin-left: 20px;
`;

export { NavHeader, NavTitle, NavButtonsBox, NavButton, NavLogoutButton };
