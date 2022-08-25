import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { TaskBox, TaskTitle, TaskSubtasksText } from "./TaskItem.styled";

const TaskItem = ({ task, getSelectedTask, toggleViewTaskModal }) => {
  const { isDarkMode } = useContext(ThemeContext);

  const getCompletedSubtasksAmount = (subtasks) =>
    subtasks.filter((subtask) => subtask.completed).length;
  return (
    <TaskBox
      onClick={() => {
        getSelectedTask(task);
        toggleViewTaskModal();
      }}
      isLightMode={isDarkMode ? false : true}
    >
      <TaskTitle>{task.title}</TaskTitle>
      <TaskSubtasksText>
        {`${getCompletedSubtasksAmount(task.subtasks)} of ${
          task.subtasks.length
        } subtasks`}
      </TaskSubtasksText>
    </TaskBox>
  );
};

export default TaskItem;
