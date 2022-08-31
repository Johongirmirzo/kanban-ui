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
  EditTaskFieldError,
} from "./EditTaskModal.styled";
import { Formik, FieldArray, getIn, Field } from "formik";
import { formTaskSchema } from "../../schemas/formTaskSchema";
import useActiveTheme from "../../hooks/useActiveTheme";

const EditTaskModal = ({
  isEditTaskModalOpen,
  toggleEditTaskModal,
  activeBoard,
  activeTask,
  addUpdatedTaskToActiveBoard,
}) => {
  const { isDarkMode } = useContext(ThemeContext);
  const theme = useActiveTheme(isDarkMode);

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
  const handle = (props) => {
    console.log(props);
  };

  console.log(activeTask.subtasks, "editing subtasks");
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
          <Formik
            initialValues={{
              title: activeTask.title || "",
              description: activeTask.description || "",
              status: activeTask.status || "Todo",
              subtasks: activeTask?.subtasks || [],
            }}
            validationSchema={formTaskSchema}
            onSubmit={(values) => {
              editTask({
                variables: {
                  input: {
                    ...values,
                    subtasks: removeTypename(values.subtasks),
                  },
                  boardId: activeBoard.id,
                  taskId: activeTask.id,
                },
              });
            }}
          >
            {(props) => (
              <EditTaskForm
                onSubmit={props.handleSubmit}
                isLightMode={isDarkMode ? false : true}
              >
                <EditTaskFormControl>
                  <EditTaskLabel htmlFor="title">Title</EditTaskLabel>
                  <EditTaskInput
                    type="text"
                    id="title"
                    name="title"
                    value={props.values.title}
                    onChange={props.handleChange}
                    placeholder="Edit Task"
                  />
                  {props.errors.title && props.touched.title ? (
                    <EditTaskFieldError>
                      {props.errors.title}
                    </EditTaskFieldError>
                  ) : null}
                </EditTaskFormControl>
                <EditTaskFormControl>
                  <EditTaskLabel htmlFor="description">
                    Description
                  </EditTaskLabel>
                  <EditTaskDescription
                    id="description"
                    name="description"
                    value={props.values.description}
                    onChange={props.handleChange}
                    placeholder="Edit Task"
                  ></EditTaskDescription>
                  {props.errors.description && props.touched.description ? (
                    <EditTaskFieldError>
                      {props.errors.description}
                    </EditTaskFieldError>
                  ) : null}
                </EditTaskFormControl>
                <EditTaskFormControl>
                  <EditSubtaskTitle>Subtasks</EditSubtaskTitle>
                  <FieldArray name="subtasks">
                    {({ push, remove }) => (
                      <div>
                        {props.values.subtasks.map((subtask, index) => (
                          <EditSubtaskBox key={subtask.id}>
                            <Field name={`subtasks.${index}.subtask`}>
                              {({ field, meta, form: { touched, errors } }) => (
                                <>
                                  <div style={{ flex: 1 }}>
                                    <EditTaskInput
                                      type="text"
                                      placeholder="Edit Subtask"
                                      {...field}
                                    />
                                    {meta.touched && meta.error && (
                                      <EditTaskFieldError>
                                        {meta.error}
                                      </EditTaskFieldError>
                                    )}
                                  </div>
                                  <EditSubtaskClose
                                    onClick={() => remove(index)}
                                  >
                                    <DeleteForeverIcon
                                      sx={{ color: "hsl(3, 94%, 44%)" }}
                                    />
                                  </EditSubtaskClose>
                                </>
                              )}
                            </Field>
                          </EditSubtaskBox>
                        ))}
                        <EditSubTaskBtn
                          type="button"
                          onClick={() =>
                            push({
                              id: uuidv4(),
                              subtask: "",
                              completed: false,
                            })
                          }
                          className="edit-task-btn"
                        >
                          + Add New Subtask
                        </EditSubTaskBtn>
                      </div>
                    )}
                  </FieldArray>
                </EditTaskFormControl>
                <EditTaskFormControl>
                  <EditTaskLabel htmlFor="status">Status</EditTaskLabel>
                  <EditTaskStatus
                    isLightMode={isDarkMode ? false : true}
                    id="status"
                    name="status"
                    value={props.values.status}
                    onChange={props.handleChange}
                  >
                    <option value="Todo">Todo</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                  </EditTaskStatus>
                </EditTaskFormControl>
                <EditTaskBtn type="submit">Edit Task</EditTaskBtn>
              </EditTaskForm>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default EditTaskModal;
