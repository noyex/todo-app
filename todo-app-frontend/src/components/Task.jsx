import React from 'react';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
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

  const handleToggleDone = async () => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:8080/api/todos/mark-as-done/${task.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      fetchTasks();
    } catch (error) {
      console.error('Error toggling task status:', error);
    }
  };

  return (
    <div className={`task ${task.done ? 'completed' : ''}`}>
      {task.done && task.completedAt && (
        <div className="completed-at">
          completed at: {new Date(task.completedAt).toLocaleString()}
        </div>
      )}
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
        <button 
          onClick={handleToggleDone}
          className={`toggle-done-button ${task.done ? 'done' : ''}`}
          title={task.done ? "Mark as undone" : "Mark as done"}
        >
          <FaCheck />
        </button>
        <button onClick={handleEdit}><FaEdit /></button>
        <button onClick={handleDelete}><FaTrash /></button>
      </div>
    </div>
  );
};

export default Task;