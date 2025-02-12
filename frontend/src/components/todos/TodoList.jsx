import { TodosService } from '../../services/todos.service';

const TodoList = ({ todos }) => {
  const handleDelete = async (todoId) => {
    await TodosService.deleteTodo(todoId);
    // Tutaj należy zaktualizować stan todos
  };

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <div key={todo.id} className="todo-item">
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <p>Due: {new Date(todo.due_to).toLocaleString()}</p>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;