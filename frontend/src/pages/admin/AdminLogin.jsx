import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('🔐 Attempting admin login...');
      console.log('Email:', formData.email);
      console.log('API URL:', api.defaults.baseURL);
      
      const response = await api.post('/auth/login', formData);
      console.log('✅ Login response received:', response.data);
      
      if (!response.data.user) {
        setError('Invalid response from server');
        return;
      }
      
      if (response.data.user.role !== 'admin') {
        setError('Access denied. Admin credentials required.');
        console.log('❌ User role:', response.data.user.role);
        return;
      }

      console.log('✅ Admin login successful!');
      
      // Store admin credentials
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Force page reload to ensure clean state
      window.location.href = '/admin/dashboard';
      
    } catch (err) {
      console.error('❌ Login error:', err);
      
      if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to server. Make sure backend is running on port 5000.');
      } else if (err.response?.status === 401) {
        setError('Invalid email or password');
      } else if (err.response?.status === 400) {
        setError(err.response.data.message || 'Invalid request');
      } else {
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-logo">
              <span className="admin-icon">🔐</span>
              <h1>Admin Panel</h1>
            </div>
            <p className="admin-subtitle">PC Builder Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="admin-login-form">
            {error && (
              <div className="admin-error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <div className="admin-form-group">
              <label htmlFor="email" className="admin-label">
                Admin Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@pcbuilder.com"
                className="admin-input"
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="password" className="admin-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter admin password"
                className="admin-input"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="admin-login-btn"
            >
              {loading ? (
                <>
                  <span className="loading-spinner-small"></span>
                  Authenticating...
                </>
              ) : (
                <>
                  <span className="login-icon">🚀</span>
                  Access Admin Panel
                </>
              )}
            </button>
          </form>

          <div className="admin-login-footer">
            <p className="admin-warning">
              ⚠️ Authorized personnel only. All access is logged and monitored.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="back-to-site-btn"
            >
              ← Back to Main Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
