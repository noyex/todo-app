import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // Dodaj import ikon
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
    <div className="about-container">
      <section className="about-hero">
        <div className="profile-section">
          <div className="profile-avatar">
            <span className="avatar-text">M</span>
          </div>
          <h1>About Me</h1>
          <p className="subtitle">Mikołaj - Student & Developer from Poland</p>
          <div className="social-links">
            <a 
              href="https://github.com/noyex" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaGithub /> GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/mikolaj-szechniuk/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>
      </section>

        <section className="about-content">
          <div className="about-card">
            <h2>Who Am I?</h2>
            <p>
              Hello! I'm a passionate student from Poland, currently focusing on Java development.
              I love exploring new technologies and pushing my boundaries in software development.
              This Todo App is my learning project where I combine my growing Java skills with
              modern frontend development.
            </p>
          </div>

          <div className="interests-grid">
            <div className="interest-card">
              <div className="interest-icon">💻</div>
              <h3>Technology</h3>
              <p>
                Fascinated by software development, particularly Java backend development.
                Always eager to learn new technologies and best practices in programming.
              </p>
            </div>

            <div className="interest-card">
              <div className="interest-icon">🏃‍♂️</div>
              <h3>Sports</h3>
              <p>
                Sports enthusiast who believes in maintaining a healthy balance between coding
                and physical activity. It helps me stay focused and energized.
              </p>
            </div>
          </div>

          <div className="project-card">
            <h2>About This Project</h2>
            <div className="tech-stack">
              <div className="tech-item">
                <div className="tech-icon">☕</div>
                <span>Java Backend</span>
              </div>
              <div className="tech-icon-arrow">➜</div>
              <div className="tech-item">
                <div className="tech-icon">⚛️</div>
                <span>React Frontend</span>
              </div>
            </div>
            <p>
              This Todo App is a learning project where I focus on mastering Java backend development.
              The frontend is created with React, utilizing AI assistance to explore modern web development
              practices. It's a perfect blend of learning and practical application.
            </p>
          </div>

          <div className="learning-journey">
            <h2>My Learning Journey</h2>
            <div className="journey-points">
              <div className="journey-item">
                <div className="journey-icon">🎯</div>
                <div className="journey-text">
                  <h4>Main Focus</h4>
                  <p>Java Development & Backend Architecture</p>
                </div>
              </div>
              <div className="journey-item">
                <div className="journey-icon">🔄</div>
                <div className="journey-text">
                  <h4>Current Status</h4>
                  <p>Learning and implementing real-world applications</p>
                </div>
              </div>
              <div className="journey-item">
                <div className="journey-icon">🚀</div>
                <div className="journey-text">
                  <h4>Future Goals</h4>
                  <p>Becoming a proficient Java developer</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;