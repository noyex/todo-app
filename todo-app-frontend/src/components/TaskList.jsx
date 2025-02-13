import React from 'react';
import Task from './Task';
import '../styles/TaskList.css';

const TaskList = ({ tasks, fetchTasks, onEditTask }) => {
  return (
    <div className="task-list">
      <h2>Your Tasks</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Task key={task.id} task={task} fetchTasks={fetchTasks} onEditTask={onEditTask} />
        ))
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;