import React, { useState, useEffect, useContext } from "react";
import { Modal, Box, Typography, Checkbox } from "@mui/material";
import {
  DELETE_TASK,
  TOGGLE_TASK_STATUS,
  TOGGL_SUBTASK,
} from "../../graphql/mutations/taskMutations";
import {
  TaskCheckBox,
  TaskLabel,
  TaskStatusSelect,
  TaskDeleteBtn,
  TaskEditBtn,
} from "./ViewTaskModal.styled";
import { useMutation } from "@apollo/client";
import { GET_ALL_BOARDS } from "../../graphql/queries/boardQueries";
import { ThemeContext } from "../../context/ThemeContext";
import useActiveTheme from "../../hooks/useActiveTheme";

const ViewTaskModal = ({
  isViewTaskModalOpen,
  toggleViewTaskModal,
  toggleEditTaskModal,
  activeBoard,
  activeTask,
  removeTaskFromActiveBoard,
  addUpdatedTaskToActiveBoard,
}) => {
  const [taskStatus, setTaskStatus] = useState(activeTask.status);
  const [subtasks, setSubtasks] = useState(activeTask.subtasks);
  const { isDarkMode } = useContext(ThemeContext);
  const theme = useActiveTheme(isDarkMode);

  useEffect(() => {
    setTaskStatus(activeTask.status);
    setSubtasks(activeTask.subtasks);
  }, [activeTask]);

  const [deleteTask] = useMutation(DELETE_TASK, {
    variables: {
      boardId: activeBoard.id,
      taskId: activeTask.id,
    },
    onError(err) {
      console.dir(err);
    },
    onCompleted(data) {
      removeTaskFromActiveBoard(data.deleteTask);
      console.log(data);
    },
    update(cache, { data: { deleteTask: taskId } }) {
      const { boards } = cache.readQuery({ query: GET_ALL_BOARDS });
      const cachedBoards = boards.map((board) => {
        if (board.id === activeBoard.id) {
          return {
            ...board,
            tasks: [...board.tasks.filter((task) => task.id !== taskId)],
          };
        }
        return board;
      });

      cache.writeQuery({
        query: GET_ALL_BOARDS,
        data: { boards: cachedBoards },
      });
    },
  });

  const [changeTaskStatus] = useMutation(TOGGLE_TASK_STATUS, {
    onError(err) {
      console.dir(err);
    },
    onCompleted(data) {
      addUpdatedTaskToActiveBoard(data.changeTaskStatus);
      toggleViewTaskModal();
    },
    update(cache, { data: { changeTaskStatus: editedTask } }) {
      const { boards } = cache.readQuery({ query: GET_ALL_BOARDS });
      const cachedBoards = boards.map((board) => {
        if (board.id === activeBoard.id) {
          return {
            ...board,
            tasks: board.tasks.map((task) =>
              task.id === editedTask.id ? editedTask : task
            ),
          };
        }
        return board;
      });

      cache.writeQuery({
        query: GET_ALL_BOARDS,
        data: { boards: cachedBoards },
      });
    },
  });

  const [toggleSubtask] = useMutation(TOGGL_SUBTASK, {
    onError(err) {
      console.dir(err);
    },
    onCompleted(data) {
      addUpdatedTaskToActiveBoard(data.toggleSubTask);
    },
    update(cache, { data }) {
      const { boards } = cache.readQuery({ query: GET_ALL_BOARDS });
      const cachedBoards = boards.map((board) => {
        if (board.id === activeBoard.id) {
          return {
            ...board,
            tasks: board.tasks.map((task) => {
              if (task.id === activeTask.id) {
                console.log(task, data);
                return task;
              }
              return task;
            }),
          };
        }
        return board;
      });
      // console.log(cachedBoards, "caching subtask");
      cache.writeQuery({
        query: GET_ALL_BOARDS,
        data: { boards: cachedBoards },
      });
    },
  });

  const getCompletedSubtasksAmount = (subtasks) =>
    subtasks.filter((subtask) => subtask.completed).length;

  const toggleCheckbox = (id) => {
    console.log(subtasks, "View Toggle Checkbox");
    toggleSubtask({
      variables: {
        boardId: activeBoard.id,
        taskId: activeTask.id,
        subtaskId: id,
      },
    });
    setSubtasks(
      subtasks.map((subtask) => {
        if (subtask.id === id) {
          return { ...subtask, completed: !subtask.completed };
        }
        return subtask;
      })
    );
  };

  // console.log(subtasks, "Toggling Subtasks in view task modaal");
  return (
    <div style={{ minHeight: "100vh" }}>
      <Modal
        open={isViewTaskModalOpen}
        onClose={toggleViewTaskModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={isDarkMode ? "task-modal" : "task-modal light-mode"}
      >
        <Box sx={theme}>
          <Typography id="modal-modal-title" variant="h4" component="h2" mb={2}>
            {activeTask.title}
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="body"
            mb={2}
            sx={{ color: "#999", fontWeight: "bold" }}
          >
            {activeTask.description}
          </Typography>
          <Box mb={4}>
            <Typography id="modal-modal-title" variant="h6" mb={2}>
              Subtasks (
              {`${getCompletedSubtasksAmount(subtasks)} of ${subtasks.length}`})
            </Typography>
            {subtasks?.map((subtask) => (
              <TaskCheckBox
                isLightMode={isDarkMode ? false : true}
                key={subtask.id}
              >
                <Checkbox
                  id={subtask.id}
                  checked={subtask.completed}
                  onClick={toggleCheckbox.bind(null, subtask.id)}
                />
                <TaskLabel
                  htmlFor={subtask.id}
                  style={
                    subtask.completed
                      ? { textDecoration: "line-through", color: "gray" }
                      : { textDecoration: "none" }
                  }
                >
                  {subtask.subtask}
                </TaskLabel>
              </TaskCheckBox>
            ))}
          </Box>
          <Box mb={4}>
            <TaskLabel htmlFor="status" isLightMode={isDarkMode ? false : true}>
              Status
            </TaskLabel>
            <TaskStatusSelect
              isLightMode={isDarkMode ? false : true}
              id="status"
              value={taskStatus}
              onChange={(e) => {
                changeTaskStatus({
                  variables: {
                    boardId: activeBoard.id,
                    taskId: activeTask.id,
                    taskStatus: e.target.value,
                  },
                });
                setTaskStatus(e.target.value);
              }}
            >
              <option
                value="Todo"
                selected={activeTask.status === "Todo" ? true : false}
              >
                Todo
              </option>
              <option
                value="Doing"
                selected={activeTask.status === "Doing" ? true : false}
              >
                Doing
              </option>
              <option
                value="Done"
                selected={activeTask.status === "Done" ? true : false}
              >
                Done
              </option>
            </TaskStatusSelect>
          </Box>
          <Box>
            <TaskDeleteBtn
              onClick={() => {
                deleteTask();
                toggleViewTaskModal();
              }}
            >
              Delete
            </TaskDeleteBtn>
            <TaskEditBtn
              onClick={() => {
                toggleViewTaskModal();
                toggleEditTaskModal();
              }}
            >
              Edit
            </TaskEditBtn>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewTaskModal;
