import React, { useState, useEffect, useContext } from "react";
import {
  AllBoardAmount,
  BoardList,
  CreateBoard,
  EditBoard,
  SidebarToggler,
} from "./components/index";
import { GET_ALL_BOARDS } from "../../graphql/queries/boardQueries";
import { useQuery, NetworkStatus } from "@apollo/client";
import ThemeToggler from "../ThemeToggler/ThemeToggler";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import {
  SidebarContainer,
  SidebarTop,
  SidebarLogo,
  SidebarTopTextBox,
} from "./Sidebar.styled";

const Sidebar = ({
  getSelectedBoard,
  toggleDeleteBoardModal,
  isActiveBoardDeleted,
  deletedBoardData,
  activeTask,
}) => {
  const [boards, setBoards] = useState([]);
  const [editBoard, setEditBoard] = useState(null);
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const { data, refetch, networkStatus } = useQuery(GET_ALL_BOARDS, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data) {
      setBoards(data.boards);
    }
  }, [data, deletedBoardData]);

  useEffect(() => {
    if (isActiveBoardDeleted) {
      resetEditedBoard();
    }
  }, [isActiveBoardDeleted]);

  useEffect(() => {
    if (networkStatus === NetworkStatus.ready) {
      refetch();
    }

    console.log({
      user,
      username: user.username,
      networkStatus,
      NetworkStatus,
    });
  }, [user.username]);

  const selectBoard = (boardId) =>
    setEditBoard(boards.find((board) => board.id === boardId));
  const addBoard = (board) => setBoards([...boards, board]);
  const addEditedBoard = (editedBoard) => {
    setBoards(
      boards.map((board) => (board.id === editedBoard.id ? editedBoard : board))
    );
    setEditBoard(null);
  };
  const resetEditedBoard = () => setEditBoard(null);
  const getBoardId = (boardId) =>
    getSelectedBoard(boards.find((board) => board.id === boardId));

  const toggleSidebar = () => setIsSidebarToggled(!isSidebarToggled);

  return (
    <SidebarContainer
      isLightMode={isDarkMode ? false : true}
      isLight={isDarkMode ? "#283144" : "#fff"}
      isSideBarToggled={isSidebarToggled ? true : false}
    >
      <SidebarTop>
        <SidebarToggler toggleSidebar={toggleSidebar} isDarkMode={isDarkMode} />
        {!isSidebarToggled && (
          <>
            <SidebarTopTextBox>
              <SidebarLogo>Kanban</SidebarLogo>
            </SidebarTopTextBox>
            <ThemeToggler />
            <AllBoardAmount boards={boards} />

            <BoardList
              boards={boards}
              selectBoard={selectBoard}
              getBoardId={getBoardId}
              activeTask={activeTask}
              toggleDeleteBoardModal={toggleDeleteBoardModal}
            />

            {editBoard ? (
              <EditBoard
                editBoard={editBoard}
                addEditedBoard={addEditedBoard}
                resetEditedBoard={resetEditedBoard}
              />
            ) : (
              <CreateBoard addBoard={addBoard} />
            )}
          </>
        )}
      </SidebarTop>
    </SidebarContainer>
  );
};

export default Sidebar;
