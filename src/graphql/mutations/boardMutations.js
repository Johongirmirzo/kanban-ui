import { gql } from "@apollo/client";

export const CREATE_BOARD = gql`
  mutation CreateBoard($boardInput: BoardInput!) {
    createBoard(boardInput: $boardInput) {
      id
      boardname
      tasks {
        id
        title
        description
        status
        subtasks {
          id
          subtask
          completed
        }
      }
      __typename
    }
  }
`;

export const EDIT_BOARD = gql`
  mutation EditBoard($boardInput: BoardInput!, $boardId: ID!) {
    editBoard(boardInput: $boardInput, boardId: $boardId) {
      id
      boardname
      tasks {
        id
        title
        description
        status
        subtasks {
          id
          subtask
          completed
        }
      }
      __typename
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation DeleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId) {
      id
    }
  }
`;
