import { gql } from "@apollo/client";

export const GET_ALL_BOARDS = gql`
  query GetAllBoards {
    boards {
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
