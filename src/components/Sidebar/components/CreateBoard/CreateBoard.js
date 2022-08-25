import React, { useState, useContext } from "react";
import { CREATE_BOARD } from "../../../../graphql/mutations/boardMutations";
import { GET_ALL_BOARDS } from "../../../../graphql/queries/boardQueries";
import { useMutation } from "@apollo/client";
import { Alert } from "@mui/material";
import { AuthContext } from "../../../../context/AuthContext";
import { ThemeContext } from "../../../../context/ThemeContext";
import {
  CreateBoardBox,
  CreateBoardText,
  CreateBoardForm,
  CreateBoardInput,
  CreateSubmitBtn,
  CreateCancelBtn,
} from "./CreateBoard.styled";

const CreateBoard = ({ addBoard }) => {
  const [isTextClicked, setIsTextClicked] = useState(false);
  const [boardname, setBoardName] = useState("");
  const [error, setError] = useState("");
  const {
    user: { username },
  } = useContext(AuthContext);
  const { isDarkMode } = useContext(ThemeContext);
  const [createBoard] = useMutation(CREATE_BOARD, {
    variables: {
      boardInput: { boardname, username },
    },
    onError(err) {
      console.dir(err);
      setError(err.graphQLErrors[0].extensions.error);
    },
    onCompleted(data) {
      console.log(data.createBoard);
      setIsTextClicked(false);
      setError(null);
    },
    update(cache, { data: { createBoard } }) {
      const { boards } = cache.readQuery({
        query: GET_ALL_BOARDS,
      });
      console.log(boards, createBoard);
      cache.writeQuery({
        query: GET_ALL_BOARDS,
        data: { boards: [...boards, createBoard] },
      });
    },
  });

  const toggleText = () => {
    if (isTextClicked) {
      setIsTextClicked(false);
    } else {
      setIsTextClicked(true);
    }
    setError(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (boardname.trim().length > 0) {
      createBoard();
    }
  };
  const handleChange = (e) => {
    if (e.target.value.length < 25) {
      setError(null);
      return setBoardName(e.target.value);
    }
    setError("Max Board Length 25");
  };

  console.log({ boardname });
  return (
    <CreateBoardBox>
      {isTextClicked ? (
        <>
          <CreateBoardForm onSubmit={handleSubmit}>
            <CreateBoardInput
              isLightMode={isDarkMode ? false : true}
              type="text"
              placeholder="Add New Board"
              onChange={handleChange}
            />
            <CreateSubmitBtn>Create</CreateSubmitBtn>
            <CreateCancelBtn onClick={toggleText}>Cancel</CreateCancelBtn>
          </CreateBoardForm>
          {error && (
            <Alert
              severity="error"
              sx={{ background: "", padding: "0 10px", marginTop: "15px" }}
            >
              {error}
            </Alert>
          )}
        </>
      ) : (
        <CreateBoardText onClick={toggleText}>
          + Create New Board
        </CreateBoardText>
      )}
    </CreateBoardBox>
  );
};

export default CreateBoard;
