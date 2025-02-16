import React, { useState } from 'react';
import Task from './Task';
import '../styles/TaskList.css';

const TaskList = ({ tasks, fetchTasks, onEditTask }) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories from tasks
  const categories = ['all', ...new Set(tasks.map(task => task.category.name))];

  const sortedAndFilteredTasks = [...tasks]
    // First filter by category
    .filter(task => selectedCategory === 'all' || task.category.name === selectedCategory)
    // Then sort
    .sort((a, b) => {
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
        <div className="filter-sort-controls">
          <div className="category-filter">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
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
      </div>
      
      {sortedAndFilteredTasks.length === 0 ? (
        <p className="empty-message">No tasks</p>
      ) : (
        <div className="tasks-grid">
          {sortedAndFilteredTasks.map((task) => (
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