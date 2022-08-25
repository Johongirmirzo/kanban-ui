import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Modal from "@mui/material/Modal";
import { CREATE_TASK } from "../../graphql/mutations/taskMutations";
import { GET_ALL_BOARDS } from "../../graphql/queries/boardQueries";
import { useMutation } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import { ThemeContext } from "../../context/ThemeContext";
import {
  AddTaskForm,
  AddTaskFormControl,
  AddTaskLabel,
  AddTaskInput,
  AddTaskDescription,
  AddSubtaskTitle,
  AddSubtaskBox,
  AddSubtaskClose,
  AddSubTaskBtn,
  AddTaskStatus,
  AddTaskBtn,
} from "./AddTaskModal.styled";
import useActiveTheme from "../../hooks/useActiveTheme";

const AddTaskModal = ({
  isAddTaskModalOpen,
  toggleAddTaskModal,
  activeBoard,
  addTaskToActiveBoard,
}) => {
  const [taskInput, setTaskInput] = useState({
    title: "",
    description: "",
    status: "Todo",
  });
  const [subtasks, setSubtasks] = useState([
    { id: uuidv4(), subtask: "", completed: false },
  ]);
  const { isDarkMode } = useContext(ThemeContext);
  const theme = useActiveTheme(isDarkMode);

  useEffect(() => {
    setTaskInput({ title: "", description: "", status: "" });
    setSubtasks([{ id: uuidv4(), subtask: "", completed: false }]);
  }, [activeBoard]);

  const [createTask] = useMutation(CREATE_TASK, {
    variables: {
      input: {
        ...taskInput,
        subtasks,
        status: taskInput.status ? taskInput.status : "Todo",
      },
      boardId: activeBoard.id,
    },
    onCompleted(data) {
      addTaskToActiveBoard(data.createTask);
      toggleAddTaskModal();
    },
    onError(err) {
      console.dir(err);
    },
    update(cache, { data: { createTask } }) {
      const { boards } = cache.readQuery({ query: GET_ALL_BOARDS });

      const cachedBoards = boards.map((board) => {
        if (board.id === activeBoard.id) {
          return { ...board, tasks: [...board.tasks, createTask] };
        }
        return board;
      });

      cache.writeQuery({
        query: GET_ALL_BOARDS,
        data: { boards: cachedBoards },
      });
    },
  });

  const handleChange = (e) =>
    setTaskInput({ ...taskInput, [e.target.name]: e.target.value });

  const addSubtask = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setSubtasks([...subtasks, { id: uuidv4(), subtask: "", completed: false }]);
  };
  const closeSubtask = (id, e) => {
    e.stopPropagation();
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  };

  const updateSubtask = (id, e) => {
    setSubtasks(
      subtasks.map((subtask) =>
        subtask.id === id ? { ...subtask, subtask: e.target.value } : subtask
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(taskInput);
    createTask();
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Modal
        open={isAddTaskModalOpen}
        onClose={toggleAddTaskModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={isDarkMode ? "task-modal" : "task-modal light-mode"}
      >
        <Box sx={theme}>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            Add New Task
          </Typography>
          <AddTaskForm
            onSubmit={handleSubmit}
            isLightMode={isDarkMode ? false : true}
          >
            <AddTaskFormControl>
              <AddTaskLabel htmlFor="title">Title</AddTaskLabel>
              <AddTaskInput
                type="text"
                id="title"
                name="title"
                value={taskInput.title}
                onChange={handleChange}
                placeholder="Add Task"
                required
              />
            </AddTaskFormControl>
            <AddTaskFormControl>
              <AddTaskLabel htmlFor="description">Description</AddTaskLabel>
              <AddTaskDescription
                id="description"
                name="description"
                value={taskInput.description}
                onChange={handleChange}
                placeholder="Add Task"
              ></AddTaskDescription>
            </AddTaskFormControl>
            <AddTaskFormControl>
              <AddSubtaskTitle>Subtasks</AddSubtaskTitle>
              {subtasks?.map((subtask) => (
                <AddSubtaskBox key={subtask.id}>
                  <AddTaskInput
                    type="text"
                    id="title"
                    name="title"
                    value={subtask.subtask}
                    onChange={updateSubtask.bind(null, subtask.id)}
                    placeholder="Add Subtask"
                  />
                  <AddSubtaskClose
                    onClick={closeSubtask.bind(null, subtask.id)}
                  >
                    <DeleteForeverIcon sx={{ color: "hsl(3, 84%, 44%)" }} />
                  </AddSubtaskClose>
                </AddSubtaskBox>
              ))}
              <AddSubTaskBtn onClick={addSubtask} className="add-task-btn">
                + Add New Subtask
              </AddSubTaskBtn>
            </AddTaskFormControl>
            <AddTaskFormControl>
              <AddTaskLabel htmlFor="status">Status</AddTaskLabel>
              <AddTaskStatus
                isLightMode={isDarkMode ? false : true}
                id="status"
                name="status"
                value={taskInput.status}
                onChange={handleChange}
              >
                <option value="Todo">Todo</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </AddTaskStatus>
            </AddTaskFormControl>
            <AddTaskBtn type="submit">Create Task</AddTaskBtn>
          </AddTaskForm>
        </Box>
      </Modal>
    </div>
  );
};

export default AddTaskModal;
