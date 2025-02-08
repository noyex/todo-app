import React, { useState } from 'react';
import '../styles/TodoItem.css';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pl-PL');
  };

  const handleUpdate = () => {
    onUpdate(todo.id, editedTodo);
    setIsEditing(false);
  };

  const getPriorityClass = (priority) => {
    const classes = {
      HIGH: 'priority-high',
      MEDIUM: 'priority-medium',
      LOW: 'priority-low'
    };
    return classes[priority] || '';
  };

  if (isEditing) {
    return (
      <div className="todo-item-edit">
        <input
          type="text"
          value={editedTodo.title}
          onChange={(e) => setEditedTodo({...editedTodo, title: e.target.value})}
        />
        <textarea
          value={editedTodo.description}
          onChange={(e) => setEditedTodo({...editedTodo, description: e.target.value})}
        />
        <select
          value={editedTodo.priority}
          onChange={(e) => setEditedTodo({...editedTodo, priority: e.target.value})}
        >
          <option value="HIGH">Wysoki</option>
          <option value="MEDIUM">Średni</option>
          <option value="LOW">Niski</option>
        </select>
        <input
          type="datetime-local"
          value={editedTodo.dueTo.slice(0, 16)}
          onChange={(e) => setEditedTodo({...editedTodo, dueTo: e.target.value})}
        />
        <div className="edit-buttons">
          <button onClick={handleUpdate}>Zapisz</button>
          <button onClick={() => setIsEditing(false)}>Anuluj</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${getPriorityClass(todo.priority)}`}>
      <div className="todo-header">
        <h3>{todo.title}</h3>
        <div className="todo-category" style={{backgroundColor: todo.category.color}}>
          {todo.category.name}
        </div>
      </div>
      <p className="todo-description">{todo.description}</p>
      <div className="todo-details">
        <span>Termin: {formatDate(todo.dueTo)}</span>
        <span>Priorytet: {todo.priority}</span>
        <span>Status: {todo.done ? 'Zakończone' : 'W trakcie'}</span>
      </div>
      <div className="todo-actions">
        <button onClick={() => setIsEditing(true)}>Edytuj</button>
        <button onClick={() => onDelete(todo.id)}>Usuń</button>
        <button 
          onClick={() => onUpdate(todo.id, {...todo, done: !todo.done})}
          className={todo.done ? 'done' : ''}
        >
          {todo.done ? 'Przywróć' : 'Zakończ'}
        </button>
      </div>
    </div>
  );
};

export default TodoItem;