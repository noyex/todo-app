import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import '../styles/Task.css';

const Task = ({ task, fetchTasks, onEditTask }) => {
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:8080/api/todos/delete/${task.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    fetchTasks();
  };

  const handleEdit = () => {
    onEditTask(task);
  };

  return (
    <div className={`task ${task.done ? 'completed' : ''}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due: {new Date(task.dueTo).toLocaleString()}</p>
      <p>Priority: {task.priority}</p>
      <p>
        Category: 
        <span className="category-dot" style={{ backgroundColor: task.category.color }}></span>
        {task.category.name}
      </p>
      <div className="task-actions">
        <button onClick={handleEdit}><FaEdit /></button>
        <button onClick={handleDelete}><FaTrash /></button>
      </div>
    </div>
  );
};

export default Task;