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
  AddSubtaskInput,
  AddTaskFieldError,
  AddSubTaskFieldError,
} from "./AddTaskModal.styled";
import useActiveTheme from "../../hooks/useActiveTheme";
import { Formik, FieldArray, getIn, Field } from "formik";
import { formTaskSchema } from "../../schemas/formTaskSchema";

const AddTaskModal = ({
  isAddTaskModalOpen,
  toggleAddTaskModal,
  activeBoard,
  addTaskToActiveBoard,
}) => {
  const { isDarkMode } = useContext(ThemeContext);
  const theme = useActiveTheme(isDarkMode);

  const [createTask] = useMutation(CREATE_TASK, {
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
          <Formik
            initialValues={{
              title: "",
              description: "",
              status: "Todo",
              subtasks: [{ id: uuidv4(), subtask: "", completed: false }],
            }}
            validationSchema={formTaskSchema}
            onSubmit={(values) => {
              createTask({
                variables: {
                  input: values,
                  boardId: activeBoard.id,
                },
              });

              console.log(values, "Adding Task");
            }}
          >
            {(props) => (
              <AddTaskForm
                onSubmit={props.handleSubmit}
                isLightMode={isDarkMode ? false : true}
              >
                <AddTaskFormControl>
                  <AddTaskLabel htmlFor="title">Title</AddTaskLabel>
                  <AddTaskInput
                    type="text"
                    id="title"
                    name="title"
                    value={props.values.title}
                    onChange={props.handleChange}
                    placeholder="Add Task"
                  />
                  {props.errors.title && props.touched.title ? (
                    <AddTaskFieldError>{props.errors.title}</AddTaskFieldError>
                  ) : null}
                </AddTaskFormControl>
                <AddTaskFormControl>
                  <AddTaskLabel htmlFor="description">Description</AddTaskLabel>
                  <AddTaskDescription
                    id="description"
                    name="description"
                    value={props.values.description}
                    onChange={props.handleChange}
                    placeholder="Add Task"
                  ></AddTaskDescription>
                  {props.errors.description && props.touched.description ? (
                    <AddTaskFieldError>
                      {props.errors.description}
                    </AddTaskFieldError>
                  ) : null}
                </AddTaskFormControl>
                <AddTaskFormControl>
                  <AddSubtaskTitle>Subtasks</AddSubtaskTitle>
                  <FieldArray name="subtasks">
                    {({ push, remove }) => (
                      <div>
                        {props.values.subtasks.map((subtask, index) => (
                          <AddSubtaskBox key={subtask.id}>
                            <Field name={`subtasks.${index}.subtask`}>
                              {({ field, meta, form: { touched, errors } }) => (
                                <>
                                  <div style={{ flex: "1" }}>
                                    <AddSubtaskInput
                                      type="text"
                                      placeholder="Add Subtask"
                                      {...field}
                                    />
                                    {meta.error && meta.touched && (
                                      <AddSubTaskFieldError>
                                        {meta.error}
                                      </AddSubTaskFieldError>
                                    )}
                                  </div>
                                  <AddSubtaskClose
                                    onClick={() => remove(index)}
                                  >
                                    <DeleteForeverIcon
                                      sx={{ color: "hsl(3, 84%, 44%)" }}
                                    />
                                  </AddSubtaskClose>
                                </>
                              )}
                            </Field>
                          </AddSubtaskBox>
                        ))}

                        <AddSubTaskBtn
                          type="button"
                          onClick={() =>
                            push({
                              id: uuidv4(),
                              subtask: "",
                              completed: false,
                            })
                          }
                          className="add-task-btn"
                        >
                          + Add New Subtask
                        </AddSubTaskBtn>
                      </div>
                    )}
                  </FieldArray>
                </AddTaskFormControl>
                <AddTaskFormControl>
                  <AddTaskLabel htmlFor="status">Status</AddTaskLabel>
                  <AddTaskStatus
                    isLightMode={isDarkMode ? false : true}
                    id="status"
                    name="status"
                    value={props.values.status}
                    onChange={props.handleChange}
                  >
                    <option value="Todo">Todo</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                  </AddTaskStatus>
                </AddTaskFormControl>
                <AddTaskBtn type="submit">Create Task</AddTaskBtn>
              </AddTaskForm>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default AddTaskModal;
