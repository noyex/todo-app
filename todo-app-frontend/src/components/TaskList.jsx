import React from 'react';
import Task from './Task';
import '../styles/TaskList.css';

const TaskList = ({ tasks, fetchTasks, onEditTask }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="empty-message">No tasks available</p>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              fetchTasks={fetchTasks}
              onEditTask={onEditTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;