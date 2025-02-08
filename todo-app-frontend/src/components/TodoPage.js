import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTodos, addTodo, updateTodo, deleteTodo } from '../service/todoService';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import '../styles/TodoPage.css';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await getAllTodos();
      setTodos(data);
      setIsLoading(false);
    } catch (err) {
      setError('Nie udało się załadować zadań');
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (newTodo) => {
    try {
      const added = await addTodo(newTodo);
      setTodos([...todos, added]);
      setShowAddForm(false);
    } catch (err) {
      setError('Nie udało się dodać zadania');
    }
  };

  const handleUpdateTodo = async (todoId, updatedTodo) => {
    try {
      const updated = await updateTodo(todoId, updatedTodo);
      setTodos(todos.map(todo => todo.id === todoId ? updated : todo));
    } catch (err) {
      setError('Nie udało się zaktualizować zadania');
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(todoId);
      setTodos(todos.filter(todo => todo.id !== todoId));
    } catch (err) {
      setError('Nie udało się usunąć zadania');
    }
  };

  if (isLoading) return <div className="loading">Ładowanie zadań...</div>;

  return (
    <div className="todo-page">
      <header className="todo-header">
        <h1>Moje zadania</h1>
        <button 
          className="add-todo-button"
          onClick={() => setShowAddForm(true)}
        >
          Dodaj nowe zadanie
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      <main className="todo-content">
        <TodoList 
          todos={todos} 
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </main>

      {showAddForm && (
        <AddTodoForm
          onAdd={handleAddTodo}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default TodoPage;