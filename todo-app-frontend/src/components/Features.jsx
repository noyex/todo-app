import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Features.css';

const Features = () => {
  return (
    <div className="features-page">
      <section className="features-hero">
        <h1>Features & Capabilities</h1>
        <p>Discover the powerful features that make Todo App your perfect task management solution</p>
      </section>

      <div className="features-container">
        <section className="feature-section">
          <div className="feature-content">
            <h2>Task Management</h2>
            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">✏️</div>
                <h3>Create & Edit</h3>
                <p>Easily create new tasks and edit existing ones with a user-friendly interface. Add titles, descriptions, and set due dates.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Priority Levels</h3>
                <p>Assign priorities (Low, Medium, High, Urgent) to your tasks for better organization and focus on what matters most.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📂</div>
                <h3>Categories</h3>
                <p>Organize tasks into custom categories with color coding for better visual organization and grouping.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="feature-section alternate">
          <div className="feature-content">
            <h2>Smart Organization</h2>
            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">🔄</div>
                <h3>Advanced Sorting</h3>
                <p>Sort tasks by due date or priority level. Toggle between ascending and descending order with a single click.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🏷️</div>
                <h3>Category Filtering</h3>
                <p>Filter tasks by categories to focus on specific areas of your work or life.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">✅</div>
                <h3>Task Status</h3>
                <p>Mark tasks as complete, track completion time, and easily distinguish between pending and completed tasks.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="feature-section">
          <div className="feature-content">
            <h2>User Experience</h2>
            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3>Modern Interface</h3>
                <p>Clean and intuitive design with smooth animations and visual feedback for better user experience.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Responsive Design</h3>
                <p>Access and manage your tasks from any device - desktop, tablet, or mobile phone.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Secure Access</h3>
                <p>Protected with user authentication and role-based access control for your data security.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to Get Started?</h2>
          <p>Join now and experience the power of organized productivity</p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-button primary">Create Account</Link>
            <Link to="/login" className="cta-button secondary">Sign In</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Features;