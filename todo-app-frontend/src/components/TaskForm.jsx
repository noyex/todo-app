import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/TaskForm.css';

const TaskForm = ({ userId, categories, fetchTasks, editingTask, onUpdateTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [dueTo, setDueTo] = useState(new Date());
  const [priority, setPriority] = useState('MEDIUM');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setCategoryId(editingTask.category.id);
      setDueTo(new Date(editingTask.dueTo));
      setPriority(editingTask.priority);
      setIsEditing(true);
    } else {
      resetForm();
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const token = localStorage.getItem('token');
      // Zmieniony endpoint na prawidłowy
      const response = await fetch(`http://localhost:8080/api/todos/update/${editingTask.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          category_id: categoryId,
          due_to: dueTo.toISOString(),
          priority,
          done: editingTask.done,
          updated_at: new Date().toISOString(),
        }),
      });
      
      if (response.ok) {
        fetchTasks();
        resetForm();
      } else {
        console.error('Failed to update task');
      }
    } else {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/todos/add/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          category_id: categoryId,
          due_to: dueTo.toISOString(),
          priority,
          done: false,
          updated_at: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        fetchTasks();
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategoryId('');
    setDueTo(new Date());
    setPriority('MEDIUM');
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter task title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          placeholder="Enter task description"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="categoryId">Category</label>
        <select
          id="categoryId"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="dueTo">Due Date</label>
        <DatePicker
          selected={dueTo}
          onChange={(date) => setDueTo(date)}
          showTimeSelect
          dateFormat="Pp"
          className="date-picker"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-button">
          {isEditing ? 'Update Task' : 'Add Task'}
        </button>
        {isEditing && (
          <button type="button" className="cancel-button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;