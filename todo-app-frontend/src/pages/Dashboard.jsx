import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchUser(token);
      fetchCategories(token);
    }
  }, [navigate]);

  const fetchUser = async (token) => {
    const email = parseJwt(token).sub;
    const response = await fetch(`http://localhost:8080/api/users/by-email/${email}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      setUser(data);
      fetchTasks(data.id, token);
    } else {
      console.error('Failed to fetch user data');
    }
  };

  const fetchTasks = async (userId, token) => {
    const response = await fetch(`http://localhost:8080/api/todos/all/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      setTasks(data);
    } else {
      console.error('Failed to fetch tasks');
    }
  };

  const fetchCategories = async (token) => {
    const response = await fetch('http://localhost:8080/api/categories/all', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      setCategories(data);
    } else {
      console.error('Failed to fetch categories');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = async (task) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/todos/update/${task.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (response.ok) {
      fetchTasks(user.id, token);
      setEditingTask(null);
    } else {
      console.error('Failed to update task');
    }
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      {user && (
        <div className="dashboard-content">
          <div className="task-list-container">
            <TaskList tasks={tasks} fetchTasks={() => fetchTasks(user.id, localStorage.getItem('token'))} onEditTask={handleEditTask} />
          </div>
          <div className="task-form-container">
            <TaskForm
              userId={user.id}
              categories={categories}
              fetchTasks={() => fetchTasks(user.id, localStorage.getItem('token'))}
              editingTask={editingTask}
              onUpdateTask={handleUpdateTask}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;