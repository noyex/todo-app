import React, { useEffect, useState } from 'react';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#000000');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
    fetchCategories();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/categories/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm("Czy na pewno chcesz usunąć tego użytkownika?");
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:8080/api/users/delete/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          fetchUsers();
        } else {
          console.error('Failed to delete user');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/update/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole })
      });
      if (response.ok) {
        fetchUsers();
      } else {
        console.error('Failed to update user role');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/categories/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newCategoryName,
          color: newCategoryColor
        })
      });
      if (response.ok) {
        setNewCategoryName('');
        setNewCategoryColor('#000000');
        fetchCategories();
      } else {
        console.error('Failed to add category');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateCategory = async (categoryId, name, color) => {
    try {
      const response = await fetch(`http://localhost:8080/api/categories/update/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, color })
      });
      if (response.ok) {
        fetchCategories();
      } else {
        console.error('Failed to update category');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const confirmed = window.confirm("Czy na pewno chcesz usunąć tę kategorię?");
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:8080/api/categories/delete/${categoryId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          fetchCategories();
        } else {
          console.error('Failed to delete category');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="dashboard-page">
      <h1>Admin AdminPanel</h1>
      <div className="dashboard-content">
        <div className="admin-container">
          <div className="section users-section">
            <h2>Manage users</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Mail</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.mail}</td>
                      <td>{user.username}</td>
                      <td>
                        <select 
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className="role-select"
                        >
                          <option value="USER">USER</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </td>
                      <td className="action-buttons">
                        <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="section categories-section">
            <h2>Manage categories</h2>
            <div className="add-category">
              <input 
                type="text"
                placeholder="Category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="category-input"
              />
              <input 
                type="color"
                value={newCategoryColor}
                onChange={(e) => setNewCategoryColor(e.target.value)}
                className="color-input"
              />
              <button onClick={handleAddCategory} className="add-btn">
                Add category
              </button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Color</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>
                        <input 
                          type="text"
                          defaultValue={category.name}
                          onBlur={(e) => handleUpdateCategory(category.id, e.target.value, category.color)}
                          className="category-name-input"
                        />
                      </td>
                      <td>
                        <input 
                          type="color"
                          defaultValue={category.color}
                          onBlur={(e) => handleUpdateCategory(category.id, category.name, e.target.value)}
                          className="color-input"
                        />
                      </td>
                      <td>
                        <button className="delete-btn" onClick={() => handleDeleteCategory(category.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
