import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TodoForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    due_to: new Date(),
    priority: 'MEDIUM'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      due_to: formData.due_to.toISOString()
    });
    setFormData({
      title: '',
      description: '',
      category_id: '',
      due_to: new Date(),
      priority: 'MEDIUM'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
      />
      <DatePicker
        selected={formData.due_to}
        onChange={(date) => setFormData({...formData, due_to: date})}
        showTimeSelect
        dateFormat="Pp"
      />
      <select
        value={formData.priority}
        onChange={(e) => setFormData({...formData, priority: e.target.value})}
      >
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TodoForm;