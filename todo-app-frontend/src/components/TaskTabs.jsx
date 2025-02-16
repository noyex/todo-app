import React from 'react';
import '../styles/TaskTabs.css';

const TaskTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="task-tabs">
      <button 
        className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
        onClick={() => onTabChange('all')}
      >
        All Tasks
      </button>
      <button 
        className={`tab-button ${activeTab === 'done' ? 'active' : ''}`}
        onClick={() => onTabChange('done')}
      >
        Done
      </button>
      <button 
        className={`tab-button ${activeTab === 'not-done' ? 'active' : ''}`}
        onClick={() => onTabChange('not-done')}
      >
        Not Done
      </button>
      <button 
        className={`tab-button ${activeTab === 'calendar' ? 'active' : ''}`}
        onClick={() => onTabChange('calendar')}
      >
        Calendar
      </button>
    </div>
  );
};

export default TaskTabs;