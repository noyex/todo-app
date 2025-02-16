import React, { useState } from 'react';
import Task from './Task';
import '../styles/TaskList.css';

const TaskList = ({ tasks, fetchTasks, onEditTask }) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });

  const sortedTasks = [...tasks].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let comparison = 0;
    if (sortConfig.key === 'dueTo') {
      comparison = new Date(a.dueTo) - new Date(b.dueTo);
    } else if (sortConfig.key === 'priority') {
      const priorityWeight = {
        'LOW': 1,
        'MEDIUM': 2,
        'HIGH': 3,
        'URGENT': 4
      };
      comparison = priorityWeight[a.priority] - priorityWeight[b.priority];
    }

    return sortConfig.direction === 'asc' ? comparison : -comparison;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const resetSort = () => {
    setSortConfig({ key: null, direction: 'asc' });
  };

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Your tasks</h2>
        <div className="sort-buttons">
          <button
            className={`sort-button ${sortConfig.key === 'dueTo' ? 'active' : ''}`}
            onClick={() => requestSort('dueTo')}
          >
            Sort by date
            {sortConfig.key === 'dueTo' && (
              <span className="sort-direction">
                {sortConfig.direction === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </button>
          <button
            className={`sort-button ${sortConfig.key === 'priority' ? 'active' : ''}`}
            onClick={() => requestSort('priority')}
          >
            Sort by priority
            {sortConfig.key === 'priority' && (
              <span className="sort-direction">
                {sortConfig.direction === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </button>
          {sortConfig.key && (
            <button
              className="reset-button"
              onClick={resetSort}
            >
              Reset
            </button>
          )}
        </div>
      </div>
      
      {sortedTasks.length === 0 ? (
        <p className="empty-message">No tasks</p>
      ) : (
        <div className="tasks-grid">
          {sortedTasks.map((task) => (
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