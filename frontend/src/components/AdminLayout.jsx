import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  const menuItems = [
    {
      path: '/admin/dashboard',
      icon: '📊',
      label: 'Dashboard',
      description: 'Overview & Analytics'
    },
    {
      path: '/admin/components',
      icon: '🔧',
      label: 'Products',
      description: 'Manage Inventory'
    },
    {
      path: '/admin/orders',
      icon: '📦',
      label: 'Orders',
      description: 'Order Management'
    },
    {
      path: '/admin/users',
      icon: '👥',
      label: 'Users',
      description: 'User Management'
    },
    {
      path: '/admin/analytics',
      icon: '📈',
      label: 'Analytics',
      description: 'Reports & Insights'
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="admin-logo">
            <span className="logo-icon">🖥️</span>
            {sidebarOpen && (
              <div className="logo-text">
                <h2>PC Builder</h2>
                <p>Admin Panel</p>
              </div>
            )}
          </div>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-title">
              {sidebarOpen && <span>Main Menu</span>}
            </div>
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                title={!sidebarOpen ? item.label : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {sidebarOpen && (
                  <div className="nav-content">
                    <span className="nav-label">{item.label}</span>
                    <span className="nav-description">{item.description}</span>
                  </div>
                )}
                {isActive(item.path) && <div className="active-indicator"></div>}
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          {sidebarOpen && (
            <div className="nav-section">
              <div className="nav-title">
                <span>Quick Actions</span>
              </div>
              <button
                onClick={() => navigate('/admin/components')}
                className="quick-action-item"
              >
                <span className="action-icon">➕</span>
                <span>Add Product</span>
              </button>
              <button
                onClick={() => navigate('/admin/orders')}
                className="quick-action-item"
              >
                <span className="action-icon">📋</span>
                <span>View Orders</span>
              </button>
              <button
                onClick={() => navigate('/')}
                className="quick-action-item"
              >
                <span className="action-icon">🌐</span>
                <span>View Website</span>
              </button>
            </div>
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          {sidebarOpen && (
            <div className="admin-profile">
              <div className="profile-info">
                <div className="profile-avatar">👨‍💼</div>
                <div className="profile-details">
                  <div className="profile-name">Admin User</div>
                  <div className="profile-role">Administrator</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="footer-actions">
            <button
              onClick={() => navigate('/')}
              className="footer-btn"
              title="View Website"
            >
              <span>🌐</span>
              {sidebarOpen && <span>Website</span>}
            </button>
            <button
              onClick={handleLogout}
              className="footer-btn logout"
              title="Logout"
            >
              <span>🚪</span>
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`admin-main ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Top Bar */}
        <div className="admin-topbar">
          <div className="topbar-left">
            <button 
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <div className="breadcrumb">
              <span className="breadcrumb-icon">📍</span>
              <span className="breadcrumb-text">
                {menuItems.find(item => isActive(item.path))?.label || 'Admin Panel'}
              </span>
            </div>
          </div>
          
          <div className="topbar-right">
            <div className="topbar-stats">
              <div className="stat-item">
                <span className="stat-icon">👥</span>
                <span className="stat-text">Online Users</span>
                <span className="stat-value">24</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📦</span>
                <span className="stat-text">Pending Orders</span>
                <span className="stat-value">8</span>
              </div>
            </div>
            
            <div className="topbar-actions">
              <button className="notification-btn">
                <span>🔔</span>
                <span className="notification-badge">3</span>
              </button>
              <button 
                className="profile-btn"
                onClick={handleLogout}
              >
                <span>👨‍💼</span>
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="admin-content">
          {children}
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;