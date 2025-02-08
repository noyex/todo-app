import { getAuthToken, getUserId } from './authService';

const API_URL = 'http://localhost:8080/api/todos';

const headers = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getAuthToken()}`
});

export const getAllTodos = async () => {
  const userId = getUserId();
  const response = await fetch(`${API_URL}/all/${userId}`, {
    headers: headers()
  });
  
  if (!response.ok) {
    throw new Error('Nie udało się pobrać zadań');
  }
  
  return response.json();
};

export const addTodo = async (todo) => {
  const userId = getUserId();
  const response = await fetch(`${API_URL}/add/${userId}`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(todo)
  });
  
  if (!response.ok) {
    throw new Error('Nie udało się dodać zadania');
  }
  
  return response.json();
};

export const updateTodo = async (todoId, todo) => {
  const response = await fetch(`${API_URL}/update/${todoId}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(todo)
  });
  
  if (!response.ok) {
    throw new Error('Nie udało się zaktualizować zadania');
  }
  
  return response.json();
};

export const deleteTodo = async (todoId) => {
  const response = await fetch(`${API_URL}/delete/${todoId}`, {
    method: 'DELETE',
    headers: headers()
  });
  
  if (!response.ok) {
    throw new Error('Nie udało się usunąć zadania');
  }
};