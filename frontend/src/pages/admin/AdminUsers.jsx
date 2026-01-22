import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/api';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await apiClient.get('/admin/users');
      setUsers(response.data || []);
    } catch (error) {
      console.error('Failed to load users:', error);
      if (error.response?.status === 403) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const viewUserDetails = (user) => {
    const details = `
User Details:
-------------
Name: ${user.name}
Email: ${user.email}
Role: ${user.role}
User ID: ${user._id}
Joined: ${new Date(user.createdAt).toLocaleString()}
Last Updated: ${new Date(user.updatedAt).toLocaleString()}
Email Verified: ${user.emailVerificationCode ? 'No' : 'Yes'}
    `;
    alert(details);
  };

  const viewUserOrders = (user) => {
    navigate(`/admin/orders?user=${user._id}`);
  };

  const verifyUser = async (userId) => {
    if (window.confirm('Manually verify this user\'s email?')) {
      try {
        // This would need a backend endpoint to manually verify users
        alert('User verification feature would be implemented here');
      } catch (error) {
        alert('Failed to verify user');
      }
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <h2>Loading Users...</h2>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-header-content">
          <div className="admin-title-section">
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="back-btn"
            >
              ← Dashboard
            </button>
            <h1 className="admin-title">
              <span className="admin-icon">👥</span>
              User Management
            </h1>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="users-summary">
          <div className="summary-cards">
            <div className="summary-card active">
              <div className="card-icon">✅</div>
              <div className="card-content">
                <h3>Active Users</h3>
                <div className="card-number">{users.length}</div>
              </div>
            </div>
            <div className="summary-card new">
              <div className="card-icon">🆕</div>
              <div className="card-content">
                <h3>New This Month</h3>
                <div className="card-number">{users.filter(u => new Date(u.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}</div>
              </div>
            </div>
            <div className="summary-card verified">
              <div className="card-icon">🔐</div>
              <div className="card-content">
                <h3>Verified Users</h3>
                <div className="card-number">{users.filter(u => !u.emailVerificationCode).length}</div>
              </div>
            </div>
            <div className="summary-card total">
              <div className="card-icon">👥</div>
              <div className="card-content">
                <h3>Total Users</h3>
                <div className="card-number">{users.length}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-table-container">
          <div className="table-header">
            <h3>All Users ({users.length})</h3>
            <div className="table-filters">
              <select className="filter-select">
                <option value="">All Users</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>
              <input 
                type="text" 
                className="filter-input"
                placeholder="Search users..."
              />
            </div>
          </div>
          
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="user-details">
                        <div className="user-name">{user.name}</div>
                        <div className="user-id">ID: {user._id.slice(-6)}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="email-info">
                      <div className="email-address">{user.email}</div>
                      <div className="email-status">
                        {user.emailVerificationCode ? (
                          <span className="unverified">Unverified</span>
                        ) : (
                          <span className="verified">Verified</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className="status-badge delivered">
                      Active
                    </span>
                  </td>
                  <td>
                    <div className="date-info">
                      <div>{new Date(user.createdAt).toLocaleDateString()}</div>
                      <div className="date-time">{new Date(user.createdAt).toLocaleTimeString()}</div>
                    </div>
                  </td>
                  <td>
                    <div className="date-info">
                      <div>{new Date(user.updatedAt).toLocaleDateString()}</div>
                      <div className="date-time">{new Date(user.updatedAt).toLocaleTimeString()}</div>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => viewUserDetails(user)}
                        className="view-btn"
                        title="View Details"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => viewUserOrders(user)}
                        className="orders-btn"
                        title="View Orders"
                      >
                        📦
                      </button>
                      {user.emailVerificationCode && (
                        <button
                          onClick={() => verifyUser(user._id)}
                          className="verify-btn"
                          title="Verify User"
                        >
                          ✅
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">👥</div>
              <h3>No Users Found</h3>
              <p>Registered users will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;