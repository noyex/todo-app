import React, { useState } from 'react';
import '../styles/AddTodoForm.css';

const AddTodoForm = ({ onAdd, onClose }) => {
  const [todo, setTodo] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    dueTo: new Date(Date.now() + 86400000).toISOString().slice(0, 16), // domyślnie jutro
    category: {
      id: 1, // domyślna kategoria
      name: 'Ogólne',
      color: '#007bff'
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(todo);
  };

  return (
    <div className="add-todo-overlay">
      <div className="add-todo-modal">
        <h2>Dodaj nowe zadanie</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Tytuł:</label>
            <input
              type="text"
              id="title"
              value={todo.title}
              onChange={(e) => setTodo({...todo, title: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Opis:</label>
            <textarea
              id="description"
              value={todo.description}
              onChange={(e) => setTodo({...todo, description: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priorytet:</label>
            <select
              id="priority"
              value={todo.priority}
              onChange={(e) => setTodo({...todo, priority: e.target.value})}
            >
              <option value="HIGH">Wysoki</option>
              <option value="MEDIUM">Średni</option>
              <option value="LOW">Niski</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueTo">Termin:</label>
            <input
              type="datetime-local"
              id="dueTo"
              value={todo.dueTo}
              onChange={(e) => setTodo({...todo, dueTo: e.target.value})}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">Dodaj</button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodoForm;