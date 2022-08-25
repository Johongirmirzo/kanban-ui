import React, { useContext, useState, useEffect, useRef } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { BoardItemBox, BoardIconsBox } from "./BoardItem.styled";
import { ThemeContext } from "../../../../../context/ThemeContext";

const BoardItem = ({
  board,
  selectBoard,
  getBoardId,
  toggleDeleteBoardModal,
}) => {
  const { isDarkMode } = useContext(ThemeContext);
  const ref = useRef();

  const handleClick = () => {
    getBoardId(board.id);
    document.querySelectorAll(".board__items").forEach((item) => {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      }
      ref.current.classList.add("active");
    });
  };
  const handleAction = (actionType, e) => {
    if (actionType === "edit") {
      selectBoard(board.id);
    }
    if (actionType === "delete") {
      toggleDeleteBoardModal();
      console.log("Deleting");
    }
  };

  // console.log(ref, "Board");
  return (
    <BoardItemBox
      isLightMode={isDarkMode ? false : true}
      onClick={handleClick}
      ref={ref}
      className={
        ref?.current?.classList?.contains("active")
          ? "board__items active"
          : "board__items"
      }
    >
      <p>
        {board.boardname.length > 20
          ? board.boardname.slice(0, 20)
          : board.boardname}
      </p>
      <BoardIconsBox>
        <EditIcon
          sx={{ color: "orange" }}
          onClick={handleAction.bind(null, "edit")}
        />
        <DeleteForeverIcon
          sx={{ color: "red" }}
          onClick={handleAction.bind(null, "delete")}
        />
      </BoardIconsBox>
    </BoardItemBox>
  );
};

export default BoardItem;
