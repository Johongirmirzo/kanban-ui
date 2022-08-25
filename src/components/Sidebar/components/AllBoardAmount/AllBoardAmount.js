import React, { useContext } from "react";
import { BoardsAmount } from "./AllBoardAmount.styled";
import { ThemeContext } from "../../../../context/ThemeContext";

const AllBoardAmount = ({ boards }) => {
  const { isDarkMode } = useContext(ThemeContext);
  // console.log(boards);
  return (
    <BoardsAmount isLightMode={isDarkMode ? false : true}>
      ALL BOARDS {boards?.length >= 0 && `(${boards.length})`}
    </BoardsAmount>
  );
};

export default AllBoardAmount;
