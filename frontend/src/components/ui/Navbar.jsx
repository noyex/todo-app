import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        {user?.role === 'ADMIN' && <Link to="/admin">Admin Panel</Link>}
      </div>
      {user && (
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;