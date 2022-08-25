import React from "react";
import BoardItem from "./BoardItem/BoardItem";

const BoardList = ({
  boards,
  deleteTodo,
  selectBoard,
  getBoardId,
  activeTask,
  toggleDeleteBoardModal,
}) => {
  return (
    boards?.length > 0 &&
    boards.map((board) => (
      <BoardItem
        key={board.id}
        board={board}
        deleteTodo={deleteTodo}
        selectBoard={selectBoard}
        getBoardId={getBoardId}
        activeTask={activeTask}
        toggleDeleteBoardModal={toggleDeleteBoardModal}
      />
    ))
  );
};

export default BoardList;
