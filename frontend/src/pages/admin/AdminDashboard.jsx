import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/api';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardStats();
    
    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.admin-hamburger-menu')) {
        setShowAdminMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadDashboardStats = async () => {
    try {
      const response = await apiClient.get('/admin/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
      if (error.response?.status === 403) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Admin Header */}
      <div className="admin-header">
        <div className="admin-header-content">
          {/* Hamburger Menu */}
          <div className="admin-hamburger-menu">
            <button 
              className="hamburger-btn"
              onClick={() => setShowAdminMenu(!showAdminMenu)}
            >
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
            </button>
            
            {/* Admin Edit Dropdown */}
            {showAdminMenu && (
              <div className="admin-edit-dropdown">
                <div className="dropdown-header">
                  <span className="dropdown-icon">⚙️</span>
                  <span>Admin Controls</span>
                </div>
                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item"
                  onClick={() => navigate('/admin/components')}
                >
                  <span className="item-icon">📦</span>
                  <span>Product Management</span>
                  <span className="item-desc">Add, Edit, Delete Products</span>
                </button>
                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item"
                  onClick={() => navigate('/admin/users')}
                >
                  <span className="item-icon">👥</span>
                  <span>User Management</span>
                  <span className="item-desc">View and manage users</span>
                </button>
                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item"
                  onClick={() => navigate('/admin/orders')}
                >
                  <span className="item-icon">📋</span>
                  <span>Order Management</span>
                  <span className="item-desc">Process customer orders</span>
                </button>
                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item danger"
                  onClick={() => {
                    if (confirm('Are you sure you want to logout?')) {
                      handleLogout();
                    }
                  }}
                >
                  <span className="item-icon">🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          <div className="admin-title-section">
            <h1 className="admin-title">
              <span className="admin-icon">📊</span>
              Admin Dashboard
            </h1>
            <p className="admin-subtitle">PC Builder Management System</p>
          </div>
          
          <div className="admin-actions">
            <button 
              onClick={() => navigate('/')}
              className="view-site-btn"
            >
              🌐 View Site
            </button>
            <button 
              onClick={handleLogout}
              className="admin-logout-btn"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admin-content">
        {/* Quick Summary */}
        <div className="quick-summary">
          <div className="summary-header">
            <h2>Business Overview</h2>
            <div className="summary-period">Last 30 Days</div>
          </div>
          <div className="summary-metrics">
            <div className="metric-item">
              <span className="metric-label">New Users:</span>
              <span className="metric-value">{stats?.newUsersThisMonth || 0}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Active Users:</span>
              <span className="metric-value">{stats?.activeUsersCount || 0}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Orders Placed:</span>
              <span className="metric-value">{stats?.monthlyOrders || 0}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Revenue Generated:</span>
              <span className="metric-value revenue">${stats?.monthlyRevenue?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="stat-icon users">👥</div>
            <div className="stat-content">
              <h3>Total Users</h3>
              <div className="stat-number">{stats?.totalUsers || 0}</div>
              <div className="stat-change">
                +{stats?.newUsersThisMonth || 0} this month
              </div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon active">🟢</div>
            <div className="stat-content">
              <h3>Active Users</h3>
              <div className="stat-number">{stats?.activeUsersCount || 0}</div>
              <div className="stat-change">Last 30 days</div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon components">🔧</div>
            <div className="stat-content">
              <h3>Components</h3>
              <div className="stat-number">{stats?.totalComponents || 0}</div>
              <div className="stat-change">Active products</div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon orders">📦</div>
            <div className="stat-content">
              <h3>Total Orders</h3>
              <div className="stat-number">{stats?.totalOrders || 0}</div>
              <div className="stat-change">All time</div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon monthly">📈</div>
            <div className="stat-content">
              <h3>Monthly Orders</h3>
              <div className="stat-number">{stats?.monthlyOrders || 0}</div>
              <div className="stat-change">Last 30 days</div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon pending">⏳</div>
            <div className="stat-content">
              <h3>Pending Orders</h3>
              <div className="stat-number">{stats?.pendingOrders || 0}</div>
              <div className="stat-change">Need attention</div>
            </div>
          </div>

          <div className="admin-stat-card revenue-card">
            <div className="stat-icon revenue">💰</div>
            <div className="stat-content">
              <h3>Monthly Revenue</h3>
              <div className="stat-number">${stats?.monthlyRevenue?.toFixed(2) || '0.00'}</div>
              <div className="stat-change positive">Last 30 days</div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon builds">🏗️</div>
            <div className="stat-content">
              <h3>Custom Builds</h3>
              <div className="stat-number">{stats?.totalBuilds || 0}</div>
              <div className="stat-change">Created by users</div>
            </div>
          </div>
        </div>

        {/* Order Status Overview */}
        {stats?.ordersByStatus && stats.ordersByStatus.length > 0 && (
          <div className="order-status-overview">
            <h2>Order Status Overview</h2>
            <div className="status-cards-grid">
              {stats.ordersByStatus.map((statusData) => (
                <div key={statusData._id} className={`status-overview-card ${statusData._id}`}>
                  <div className="status-info">
                    <div className="status-name">{statusData._id}</div>
                    <div className="status-count">{statusData.count}</div>
                  </div>
                  <div className="status-percentage">
                    {((statusData.count / stats.totalOrders) * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Revenue Chart */}
        {stats?.revenueByMonth && stats.revenueByMonth.length > 0 && (
          <div className="revenue-chart-section">
            <h2>Revenue Trend (Last 6 Months)</h2>
            <div className="chart-container">
              <div className="revenue-bars">
                {stats.revenueByMonth.map((monthData, index) => {
                  const maxRevenue = Math.max(...stats.revenueByMonth.map(m => m.revenue));
                  const height = (monthData.revenue / maxRevenue) * 100;
                  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                  
                  return (
                    <div key={index} className="revenue-bar-item">
                      <div className="revenue-bar-container">
                        <div 
                          className="revenue-bar" 
                          style={{ height: `${height}%` }}
                          title={`${monthData.revenue.toFixed(2)}`}
                        ></div>
                      </div>
                      <div className="revenue-bar-label">
                        {monthNames[monthData._id.month - 1]}
                      </div>
                      <div className="revenue-bar-value">
                        ${monthData.revenue.toFixed(0)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="admin-quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons-grid">
            <button 
              onClick={() => navigate('/admin/components')}
              className="admin-action-btn components"
            >
              <span className="action-icon">🔧</span>
              <div className="action-content">
                <h3>Manage Components</h3>
                <p>Add, edit, or remove PC components</p>
              </div>
            </button>

            <button 
              onClick={() => navigate('/admin/orders')}
              className="admin-action-btn orders"
            >
              <span className="action-icon">📦</span>
              <div className="action-content">
                <h3>Manage Orders</h3>
                <p>View and update order status</p>
              </div>
            </button>

            <button 
              onClick={() => navigate('/admin/users')}
              className="admin-action-btn users"
            >
              <span className="action-icon">👥</span>
              <div className="action-content">
                <h3>User Management</h3>
                <p>View registered users</p>
              </div>
            </button>

            <button 
              onClick={() => navigate('/admin/analytics')}
              className="admin-action-btn analytics"
            >
              <span className="action-icon">📈</span>
              <div className="action-content">
                <h3>Analytics</h3>
                <p>View detailed reports</p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Orders */}
        {stats?.recentOrders && stats.recentOrders.length > 0 && (
          <div className="admin-recent-orders">
            <div className="section-header">
              <h2>Recent Orders</h2>
              <button 
                onClick={() => navigate('/admin/orders')}
                className="view-all-btn"
              >
                View All Orders →
              </button>
            </div>
            <div className="recent-orders-grid">
              {stats.recentOrders.map((order) => (
                <div key={order._id} className="recent-order-card">
                  <div className="order-header">
                    <div className="order-id">#{order._id.slice(-6)}</div>
                    <span className={`status-badge ${order.status}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-customer">
                    <div className="customer-name">{order.userId?.name || 'N/A'}</div>
                    <div className="customer-email">{order.userId?.email || 'N/A'}</div>
                  </div>
                  <div className="order-footer">
                    <div className="order-amount">${order.totalAmount?.toFixed(2)}</div>
                    <div className="order-date">{new Date(order.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;