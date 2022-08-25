import React, { useState, useEffect, useContext } from "react";
import { Modal, Box, Typography, Checkbox } from "@mui/material";

import { useMutation } from "@apollo/client";
import { GET_ALL_BOARDS } from "../../graphql/queries/boardQueries";
import { ThemeContext } from "../../context/ThemeContext";
import useActiveTheme from "../../hooks/useActiveTheme";
import {
  DeleteModalForm,
  DeleteModalInput,
  DeleteModalButton,
} from "./DeleteBoardModal.styled";

const DeleteBoardModal = ({
  isDeleteBoardModalOpen,
  toggleDeleteBoardModal,
  activeBoard,
  deleteBoard,
}) => {
  const [confirmationText, setConfirmationText] = useState("");
  const { isDarkMode } = useContext(ThemeContext);
  const theme = useActiveTheme(isDarkMode, "resetHeight");

  useEffect(() => {
    setConfirmationText("");
  }, [activeBoard?.boardname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmationText === "I'm sure to delete this board") {
      deleteBoard({ variables: { boardId: activeBoard.id } });
      toggleDeleteBoardModal();
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Modal
        open={isDeleteBoardModalOpen}
        onClose={toggleDeleteBoardModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={isDarkMode ? "task-modal" : "task-modal light-mode"}
      >
        <Box sx={theme}>
          <Typography id="modal-modal-title" variant="h4" component="h2" mb={2}>
            You are going to delete Board "{activeBoard.boardname}" with all
            tasks belong to it
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="body"
            mb={2}
            sx={{ color: "hsl(0, 0%, 76%)", fontWeight: "bold" }}
          >
            Are you sure that you'd like to delete current board. This action
            can't be undone. If you are sure then fill the input with "I'm sure
            to delete this board" and click button
          </Typography>
          <Typography mb={1}>
            Type: <b>I'm sure to delete this board</b>
          </Typography>
          <Box>
            <DeleteModalForm onSubmit={handleSubmit}>
              <DeleteModalInput
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                type="text"
                placeholder="I'm sure to delete this board"
              />
              <DeleteModalButton
                disabled={
                  confirmationText === "I'm sure to delete this board"
                    ? false
                    : true
                }
              >
                I understand the consequences
              </DeleteModalButton>
            </DeleteModalForm>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteBoardModal;
