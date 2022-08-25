import React, { useState, useEffect, useRef, useContext } from "react";
import { EDIT_BOARD } from "../../../../graphql/mutations/boardMutations";
import { GET_ALL_BOARDS } from "../../../../graphql/queries/boardQueries";
import { useMutation } from "@apollo/client";
import { Alert, Stack } from "@mui/material";
import { AuthContext } from "../../../../context/AuthContext";
import { ThemeContext } from "../../../../context/ThemeContext";
import {
  EditBoardBox,
  EditBoardText,
  EditBoardForm,
  EditBoardInput,
  Button,
  EditSubmitBtn,
  EditCancelBtn,
} from "./EditBoard.styled";

const EditBoard = ({ editBoard, addEditedBoard, resetEditedBoard }) => {
  const [boardname, setBoardName] = useState(editBoard.boardname);
  const [error, setError] = useState("");
  const {
    user: { username },
  } = useContext(AuthContext);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    setBoardName(editBoard.boardname);
  }, [editBoard]);

  const [updateBoard] = useMutation(EDIT_BOARD, {
    variables: {
      boardInput: { boardname, username },
      boardId: editBoard.id,
    },
    onError(err) {
      setError(err.graphQLErrors[0].extensions.error);
    },
    onCompleted(data) {
      addEditedBoard(data.editBoard);
      resetEditedBoard();
      setError(null);
    },
    update(cache, { data: { editBoard } }) {
      const { boards } = cache.readQuery({
        query: GET_ALL_BOARDS,
      });
      const cachedBoards = boards.map((board) => {
        if (board.id === editBoard.id) {
          return editBoard;
        }
        return board;
      });
      cache.writeQuery({
        query: GET_ALL_BOARDS,
        data: { boards: cachedBoards },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (boardname.trim().length > 0) {
      updateBoard();
    }
  };
  const handleChange = (e) => {
    if (e.target.value.length < 25) {
      setError(null);
      return setBoardName(e.target.value);
    }
    setError("Max Board Length 25");
    return setBoardName(e.target.value);
  };

  console.log(editBoard, "Edit Board");
  return (
    <EditBoardBox>
      <EditBoardForm onSubmit={handleSubmit}>
        <EditBoardInput
          isLightMode={isDarkMode ? false : true}
          type="text"
          placeholder="Edit Board"
          value={boardname}
          onChange={handleChange}
        />
        <EditSubmitBtn>Edit</EditSubmitBtn>
        <EditCancelBtn onClick={resetEditedBoard}>Cancel</EditCancelBtn>
      </EditBoardForm>
      {error && (
        <Alert
          severity="error"
          sx={{ background: "", padding: "0 10px", marginTop: "15px" }}
        >
          {error}
        </Alert>
      )}
    </EditBoardBox>
  );
};

export default EditBoard;
