import React from 'react';
import '../styles/TaskTabs.css';

const TaskTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="task-tabs">
      <button 
        className={`tab ${activeTab === 'all' ? 'active' : ''}`}
        onClick={() => onTabChange('all')}
      >
        All Tasks
      </button>
      <button 
        className={`tab ${activeTab === 'not-done' ? 'active' : ''}`}
        onClick={() => onTabChange('not-done')}
      >
        Not Done
      </button>
      <button 
        className={`tab ${activeTab === 'done' ? 'active' : ''}`}
        onClick={() => onTabChange('done')}
      >
        Done
      </button>
    </div>
  );
};

export default TaskTabs;