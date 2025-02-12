import api from '../utils/api';

export const TodosService = {
  getTodos: async (userId) => {
    const response = await api.get(`/todos/all/${userId}`);
    return response.data;
  },

  addTodo: async (userId, todoData) => {
    const response = await api.post(`/todos/add/${userId}`, todoData);
    return response.data;
  },

  deleteTodo: async (todoId) => {
    await api.delete(`/todos/delete/${todoId}`);
  }
};