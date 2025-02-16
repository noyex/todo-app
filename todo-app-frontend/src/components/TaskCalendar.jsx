import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../styles/TaskCalendar.css';

const TaskCalendar = ({ tasks, categories }) => {
  const [hoveredTaskDetails, setHoveredTaskDetails] = useState(null);

  const getCategoryColor = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category?.color || '#808080'; // domyślny kolor jeśli nie znaleziono
  };

  const getCalendarEvents = () => {
    if (!tasks) return [];
    
    return tasks.map(task => ({
      id: task.id,
      title: task.title,
      start: task.dueTo.split('T')[0],
      backgroundColor: getCategoryColor(task.category.name),
      classNames: ['calendar-event'],
      extendedProps: {
        description: task.description,
        category: task.category.name,
        categoryColor: getCategoryColor(task.category.name),
        priority: task.priority,
        time: new Date(task.dueTo).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    }));
  };

  const handleEventMouseEnter = (info) => {
    const rect = info.el.getBoundingClientRect();
    setHoveredTaskDetails({
      task: {
        title: info.event.title,
        category: info.event.extendedProps.category,
        categoryColor: info.event.extendedProps.categoryColor,
        description: info.event.extendedProps.description,
        priority: info.event.extendedProps.priority,
        time: info.event.extendedProps.time
      },
      position: {
        x: rect.right + 10,
        y: rect.top
      }
    });
    
    info.el.classList.add('event-hover');
  };

  const handleEventMouseLeave = (info) => {
    setHoveredTaskDetails(null);
    info.el.classList.remove('event-hover');
  };

  const TaskPopover = ({ details }) => {
    if (!details) return null;

    const style = {
      '--category-color': details.task.categoryColor
    };

    return (
      <div 
        className="task-popover"
        style={{
          position: 'fixed',
          left: `${details.position.x}px`,
          top: `${details.position.y}px`,
          ...style
        }}
      >
        <div className="task-popover-content">
          <div className="task-popover-header">
            <div className="task-popover-title">{details.task.title}</div>
            <div className="priority-badge">{details.task.priority}</div>
          </div>
          <div className="task-popover-metadata">
            <div className="task-popover-category">
              <span 
                className="category-dot"
                style={{ backgroundColor: details.task.categoryColor }}
              />
              {details.task.category}
            </div>
            <div className="task-popover-time">
              <i className="far fa-clock"></i> {details.task.time}
            </div>
          </div>
          {details.task.description && (
            <div className="task-popover-description">
              {details.task.description}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="task-calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={getCalendarEvents()}
        eventMouseEnter={handleEventMouseEnter}
        eventMouseLeave={handleEventMouseLeave}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: ''
        }}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false
        }}
        eventDisplay="block"
        dayMaxEvents={3}
        moreLinkContent={(args) => `+${args.num} more`}
      />
      <TaskPopover details={hoveredTaskDetails} />
    </div>
  );
};

export default TaskCalendar;