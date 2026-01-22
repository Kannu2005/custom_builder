import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../services/api';

const Header = () => {
  const { user, logout, isAdmin, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    if (user) {
      loadCartCount();
    } else {
      setCartCount(0);
    }
  }, [user, location.pathname]); // Refresh cart count when route changes

  const loadCartCount = async () => {
    try {
      const res = await apiClient.get('/builds/my-builds');
      const builds = res.data || [];
      setCartCount(builds.length);
    } catch (err) {
      console.error('Failed to load cart count:', err);
      setCartCount(0);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowProfileMenu(false);
  };

  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">Custom PC Builder</Link>
      </div>
      <nav>
        {user ? (
          <>
            <Link to="/build">Build PC</Link>
            <Link to="/dashboard" className="cart-link">
              <span className="cart-icon">🛒</span>
              <span className="cart-text">My Cart</span>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
            {isAdmin() && <Link to="/admin">Admin</Link>}
            <div className="profile-dropdown">
              <button 
                className="profile-btn"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                onBlur={() => setTimeout(() => setShowProfileMenu(false), 200)}
              >
                <span className="profile-icon">👤</span>
                <span className="profile-name">{user.name}</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              {showProfileMenu && (
                <div className="profile-menu">
                  <div className="profile-menu-header">
                    <div className="profile-menu-name">{user.name}</div>
                    <div className="profile-menu-email">{user.email}</div>
                  </div>
                  <div className="profile-menu-divider"></div>
                  <Link to="/profile" className="profile-menu-item" onClick={() => setShowProfileMenu(false)}>
                    <span>👤</span> Your Account
                  </Link>
                  <Link to="/my-orders" className="profile-menu-item" onClick={() => setShowProfileMenu(false)}>
                    <span>📋</span> My Orders
                  </Link>
                  <Link to="/build" className="profile-menu-item" onClick={() => setShowProfileMenu(false)}>
                    <span>⚙️</span> Build PC
                  </Link>
                  {isAdmin() && (
                    <Link to="/admin" className="profile-menu-item" onClick={() => setShowProfileMenu(false)}>
                      <span>🔧</span> Admin Panel
                    </Link>
                  )}
                  <div className="profile-menu-divider"></div>
                  <button onClick={handleLogout} className="profile-menu-item logout-menu-item">
                    <span>🚪</span> Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

