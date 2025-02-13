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
      onUpdateTask({
        id: editingTask.id,
        title,
        description,
        category: { id: categoryId },
        dueTo: dueTo.toISOString(),
        priority,
        done: editingTask.done,
        user: { id: userId },
        updatedAt: new Date().toISOString(),
      });
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
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Task' : 'Add Task'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
        <option value="" disabled>Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <DatePicker selected={dueTo} onChange={(date) => setDueTo(date)} showTimeSelect dateFormat="Pp" />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      <button type="submit" className="btn btn-primary">{isEditing ? 'Update Task' : 'Add Task'}</button>
      {isEditing && (
        <button type="button" className="btn btn-secondary" onClick={resetForm}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default TaskForm;