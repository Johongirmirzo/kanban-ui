import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation CreateTask($input: TaskInput!, $boardId: ID!) {
    createTask(taskInput: $input, boardId: $boardId) {
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
  }
`;
export const EDIT_TASK = gql`
  mutation EDITask($input: TaskInput!, $boardId: ID!, $taskId: ID!) {
    editTask(taskInput: $input, boardId: $boardId, taskId: $taskId) {
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
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($boardId: ID!, $taskId: ID!) {
    deleteTask(boardId: $boardId, taskId: $taskId)
  }
`;

export const TOGGLE_TASK_STATUS = gql`
  mutation ToggleTaskStatus($boardId: ID!, $taskId: ID!, $taskStatus: String!) {
    changeTaskStatus(
      boardId: $boardId
      taskId: $taskId
      taskStatus: $taskStatus
    ) {
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
  }
`;

export const TOGGL_SUBTASK = gql`
  mutation ToggleSubtask($boardId: ID!, $taskId: ID!, $subtaskId: ID!) {
    toggleSubTask(boardId: $boardId, taskId: $taskId, subtaskId: $subtaskId) {
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
  }
`;
