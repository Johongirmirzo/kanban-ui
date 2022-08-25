import React, { useState, useContext } from "react";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal";
import EditTaskModal from "../../components/EditTaskModal/EditTaskModal";
import ViewTaskModal from "../../components/ViewTaskModal/ViewTaskModal";
import DeleteBoardModal from "../../components/DeleteBoardModal/DeleteBoardModal";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import TaskList from "../../components/TaskList/TaskList";
import { ThemeContext } from "../../context/ThemeContext";
import { HomeContainer, MainArea } from "./Home.styled";
import { GET_ALL_BOARDS } from "../../graphql/queries/boardQueries";
import { DELETE_BOARD } from "../../graphql/mutations/boardMutations";
import { useQuery, useMutation } from "@apollo/client";

const Home = () => {
  const [activeBoard, setActiveBoard] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [isActiveBoardDeleted, setIsActiveBoardDeleted] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [isViewTaskModalOpen, setIsViewTaskModalOpen] = useState(false);
  const [isDeleteBoardModalOpen, setIsDeleteBoardModalOpen] = useState(false);

  const { isDarkMode } = useContext(ThemeContext);

  const [deleteBoard, { data: lists }] = useMutation(DELETE_BOARD, {
    refetchQueries: [{ query: GET_ALL_BOARDS }, "GetAllBoards"],
    onCompleted(data) {
      getDeletedBoardId(data.deleteBoard.id);
      setIsActiveBoardDeleted(true);

      setTimeout(() => {
        setIsActiveBoardDeleted(false);
      }, 1500);
    },
  });

  const getSelectedBoard = (board) => setActiveBoard(board);
  const getDeletedBoardId = (boardId) => {
    if (boardId === activeBoard?.id) {
      setActiveBoard(null);
    }
  };
  const getSelectedTask = (task) => setActiveTask(task);

  const toggleAddTaskModal = () => {
    setIsAddTaskModalOpen(!isAddTaskModalOpen);
  };
  const toggleViewTaskModal = () => {
    setIsViewTaskModalOpen(!isViewTaskModalOpen);
  };
  const toggleEditTaskModal = () => {
    setIsEditTaskModalOpen(!isEditTaskModalOpen);
  };
  const toggleDeleteBoardModal = () => {
    console.log("Deleting", { isDeleteBoardModalOpen });
    setIsDeleteBoardModalOpen(!isDeleteBoardModalOpen);
  };

  const addTaskToActiveBoard = (task) =>
    setActiveBoard({ ...activeBoard, tasks: [...activeBoard.tasks, task] });

  const removeTaskFromActiveBoard = (taskId) =>
    setActiveBoard({
      ...activeBoard,
      tasks: activeBoard?.tasks?.filter((task) => task.id !== taskId),
    });

  const addUpdatedTaskToActiveBoard = (editedTask) => {
    setActiveBoard({
      ...activeBoard,
      tasks: activeBoard?.tasks?.map((task) =>
        task.id === editedTask.id ? editedTask : task
      ),
    });
    setActiveTask(editedTask);
  };

  return (
    <HomeContainer>
      <Sidebar
        getSelectedBoard={getSelectedBoard}
        activeBoard={activeBoard}
        activeTask={activeTask}
        toggleDeleteBoardModal={toggleDeleteBoardModal}
        isActiveBoardDeleted={isActiveBoardDeleted}
        deletedBoardData={lists}
      />
      <MainArea isLightMode={isDarkMode ? false : true}>
        <Navbar
          activeBoard={activeBoard}
          toggleAddTaskModal={toggleAddTaskModal}
        />
        {activeBoard && (
          <TaskList
            activeBoard={activeBoard}
            getSelectedTask={getSelectedTask}
            toggleViewTaskModal={toggleViewTaskModal}
          />
        )}
        {activeBoard && (
          <AddTaskModal
            activeBoard={activeBoard}
            isAddTaskModalOpen={isAddTaskModalOpen}
            toggleAddTaskModal={toggleAddTaskModal}
            addTaskToActiveBoard={addTaskToActiveBoard}
          />
        )}
        {activeTask && activeBoard && (
          <ViewTaskModal
            isViewTaskModalOpen={isViewTaskModalOpen}
            toggleViewTaskModal={toggleViewTaskModal}
            toggleEditTaskModal={toggleEditTaskModal}
            activeTask={activeTask}
            activeBoard={activeBoard}
            removeTaskFromActiveBoard={removeTaskFromActiveBoard}
            getSelectedTask={getSelectedTask}
            addUpdatedTaskToActiveBoard={addUpdatedTaskToActiveBoard}
          />
        )}
        {activeTask && activeBoard && (
          <EditTaskModal
            isEditTaskModalOpen={isEditTaskModalOpen}
            toggleEditTaskModal={toggleEditTaskModal}
            activeTask={activeTask}
            activeBoard={activeBoard}
            addUpdatedTaskToActiveBoard={addUpdatedTaskToActiveBoard}
          />
        )}
        {activeBoard && (
          <DeleteBoardModal
            isDeleteBoardModalOpen={isDeleteBoardModalOpen}
            toggleDeleteBoardModal={toggleDeleteBoardModal}
            activeBoard={activeBoard}
            deleteBoard={deleteBoard}
          />
        )}
      </MainArea>
    </HomeContainer>
  );
};

export default Home;
