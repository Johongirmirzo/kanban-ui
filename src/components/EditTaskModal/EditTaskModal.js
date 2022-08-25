import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { EDIT_TASK } from "../../graphql/mutations/taskMutations";
import { GET_ALL_BOARDS } from "../../graphql/queries/boardQueries";
import { useMutation } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import { ThemeContext } from "../../context/ThemeContext";
import {
  EditTaskForm,
  EditTaskFormControl,
  EditTaskLabel,
  EditTaskInput,
  EditTaskDescription,
  EditSubtaskTitle,
  EditSubtaskBox,
  EditSubtaskClose,
  EditSubTaskBtn,
  EditTaskStatus,
  EditTaskBtn,
} from "./EditTaskModal.styled";
import useActiveTheme from "../../hooks/useActiveTheme";

const EditTaskModal = ({
  isEditTaskModalOpen,
  toggleEditTaskModal,
  activeBoard,
  activeTask,
  addUpdatedTaskToActiveBoard,
}) => {
  const [taskInput, setTaskInput] = useState({
    title: activeTask.title,
    description: activeTask.description,
    status: activeTask.status || "Todo",
  });
  const [subtasks, setSubtasks] = useState(activeTask.subtasks);
  const { isDarkMode } = useContext(ThemeContext);
  const theme = useActiveTheme(isDarkMode);

  useEffect(() => {
    setTaskInput({
      title: activeTask.title,
      description: activeTask.description,
      status: activeTask.status || "Todo",
    });
    setSubtasks(activeTask.subtasks);
    console.log(activeTask, "Use Effect active task");
  }, [activeTask]);

  const removeTypename = (subtasks) => {
    return subtasks.map((subtask) =>
      subtask.__typename
        ? {
            id: subtask.id,
            subtask: subtask.subtask,
            completed: subtask.completed,
          }
        : subtask
    );
  };
  const [editTask] = useMutation(EDIT_TASK, {
    variables: {
      input: {
        ...taskInput,
        subtasks: removeTypename(subtasks),
      },
      boardId: activeBoard.id,
      taskId: activeTask.id,
    },
    onError(err) {
      console.dir(err);
    },
    onCompleted(data) {
      addUpdatedTaskToActiveBoard(data.editTask);
      // console.log(data, "Editing Task");
      toggleEditTaskModal();
    },
    update(cache, { data: { editTask } }) {
      const { boards } = cache.readQuery({ query: GET_ALL_BOARDS });

      const cachedBoards = boards.map((board) => {
        if (board.id === activeBoard.id) {
          return {
            ...board,
            tasks: board.tasks.map((task) =>
              task.id === editTask.id ? editTask : task
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

  const handleChange = (e) =>
    setTaskInput({ ...taskInput, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    editTask();
  };

  const closeSubtask = (id) =>
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  const updateSubtask = (id, e) =>
    setSubtasks(
      subtasks.map((subtask) =>
        subtask.id === id ? { ...subtask, subtask: e.target.value } : subtask
      )
    );

  const addSubtask = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSubtasks([...subtasks, { id: uuidv4(), subtask: "", completed: false }]);
  };

  console.log(activeTask, "editing subtasks");
  return (
    <div style={{ minHeight: "100vh" }}>
      <Modal
        open={isEditTaskModalOpen}
        onClose={toggleEditTaskModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={isDarkMode ? "task-modal" : "task-modal light-mode"}
      >
        <Box sx={theme}>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            Edit Current Task
          </Typography>
          <EditTaskForm
            onSubmit={handleSubmit}
            isLightMode={isDarkMode ? false : true}
          >
            <EditTaskFormControl>
              <EditTaskLabel htmlFor="title">Title</EditTaskLabel>
              <EditTaskInput
                type="text"
                id="title"
                name="title"
                value={taskInput.title}
                onChange={handleChange}
                placeholder="Edit Task"
                required
              />
            </EditTaskFormControl>
            <EditTaskFormControl>
              <EditTaskLabel htmlFor="description">Description</EditTaskLabel>
              <EditTaskDescription
                id="description"
                name="description"
                value={taskInput.description}
                onChange={handleChange}
                placeholder="Edit Task"
              ></EditTaskDescription>
            </EditTaskFormControl>
            <EditTaskFormControl>
              <EditSubtaskTitle>Subtasks</EditSubtaskTitle>
              {subtasks.map((subtask) => (
                <EditSubtaskBox key={subtask.id}>
                  <EditTaskInput
                    type="text"
                    id="title"
                    name="title"
                    value={subtask.subtask}
                    onChange={updateSubtask.bind(null, subtask.id)}
                    placeholder="Edit Subtask"
                  />
                  <EditSubtaskClose
                    onClick={closeSubtask.bind(null, subtask.id)}
                  >
                    <DeleteForeverIcon sx={{ color: "hsl(3, 94%, 44%)" }} />
                  </EditSubtaskClose>
                </EditSubtaskBox>
              ))}
              <EditSubTaskBtn onClick={addSubtask} className="edit-task-btn">
                + Add New Subtask
              </EditSubTaskBtn>
            </EditTaskFormControl>
            <EditTaskFormControl>
              <EditTaskLabel htmlFor="status">Status</EditTaskLabel>
              <EditTaskStatus
                isLightMode={isDarkMode ? false : true}
                id="status"
                name="status"
                value={taskInput.status}
                onChange={handleChange}
              >
                <option value="Todo">Todo</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </EditTaskStatus>
            </EditTaskFormControl>
            <EditTaskBtn type="submit">Edit Task</EditTaskBtn>
          </EditTaskForm>
        </Box>
      </Modal>
    </div>
  );
};

export default EditTaskModal;
