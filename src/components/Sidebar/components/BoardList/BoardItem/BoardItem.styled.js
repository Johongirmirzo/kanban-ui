import styled, { css } from "styled-components";
const BoardItemBox = styled.div`
  padding: 10px 0;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  padding-left: 15px;
  margin-bottom: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 600;
  color: #a1b0cb;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  transition: all 0.3s ease-out;
  &.active {
    background: hsla(247, 84%, 66%, 0.8);
    color: #fff;
  }
  &:hover {
    background: hsla(247, 84%, 66%, 0.8);
    color: #fff;
  }

  ${(props) =>
    props.isLightMode &&
    css`
      color: #333;
    `}
`;
const BoardIconsBox = styled.div`
  padding-right: 5px;
`;

export { BoardItemBox, BoardIconsBox };
