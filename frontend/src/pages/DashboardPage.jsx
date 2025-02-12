import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TodosService } from '../services/todos.service';
import TodoForm from '../components/todos/TodoForm';
import TodoList from '../components/todos/TodoList';

const DashboardPage = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      if (user) {
        const data = await TodosService.getTodos(user.id);
        setTodos(data);
      }
    };
    loadTodos();
  }, [user]);

  const handleAddTodo = async (newTodo) => {
    const addedTodo = await TodosService.addTodo(user.id, newTodo);
    setTodos([...todos, addedTodo]);
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.username}</h1>
      <TodoForm onAdd={handleAddTodo} />
      <TodoList todos={todos} />
    </div>
  );
};

export default DashboardPage;