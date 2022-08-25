import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem/TaskItem";

import {
  TaskContainer,
  TaskRow,
  TaskHeader,
  TaskBox,
  TaskTodoCircle,
  TaskDoingCircle,
  TaskDoneCircle,
  TaskStatusAmount,
} from "./TaskList.styled";

const TaskList = ({ activeBoard, getSelectedTask, toggleViewTaskModal }) => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    if (activeBoard) {
      setTasks(activeBoard?.tasks);
    }
    console.log(activeBoard, "Task List");
  }, [activeBoard]);
  const filterTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <TaskContainer>
      <TaskRow>
        <TaskBox>
          <TaskHeader>
            <TaskTodoCircle />
            <TaskStatusAmount>
              TODO ( {filterTasksByStatus("Todo").length} )
            </TaskStatusAmount>
          </TaskHeader>
          {filterTasksByStatus("Todo").map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              boardId={activeBoard.id}
              getSelectedTask={getSelectedTask}
              toggleViewTaskModal={toggleViewTaskModal}
            />
          ))}
        </TaskBox>
        <TaskBox>
          <TaskHeader>
            <TaskDoingCircle />
            <TaskStatusAmount>
              DOING ( {filterTasksByStatus("Doing").length} )
            </TaskStatusAmount>
          </TaskHeader>
          {filterTasksByStatus("Doing").map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              boardId={activeBoard.id}
              getSelectedTask={getSelectedTask}
              toggleViewTaskModal={toggleViewTaskModal}
            />
          ))}
        </TaskBox>
        <TaskBox>
          <TaskHeader>
            <TaskDoneCircle />
            <TaskStatusAmount>
              DONE ( {filterTasksByStatus("Done").length} )
            </TaskStatusAmount>
          </TaskHeader>
          {filterTasksByStatus("Done").map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              boardId={activeBoard.id}
              getSelectedTask={getSelectedTask}
              toggleViewTaskModal={toggleViewTaskModal}
            />
          ))}
        </TaskBox>
      </TaskRow>
    </TaskContainer>
  );
};

export default TaskList;
