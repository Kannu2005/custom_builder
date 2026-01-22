import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-modern">
      <div className="auth-container-modern">
        <div className="auth-header-modern">
          <div className="auth-logo-modern">
            <span className="logo-icon">🖥️</span>
            <span className="logo-text">Custom PC Builder</span>
          </div>
          <h1 className="auth-title-modern">Welcome Back</h1>
          <p className="auth-subtitle-modern">Sign in to your account to continue building</p>
        </div>

        <form className="auth-form-modern" onSubmit={handleSubmit}>
          {error && (
            <div className="auth-error-modern">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div className="form-group-modern">
            <label className="form-label-modern">
              <span className="label-text">Email Address</span>
              <span className="required-star">*</span>
            </label>
            <div className="input-container-modern">
              <span className="input-icon">📧</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="form-input-modern"
                required
              />
            </div>
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern">
              <span className="label-text">Password</span>
              <span className="required-star">*</span>
            </label>
            <div className="input-container-modern">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="form-input-modern"
                required
              />
              <button
                type="button"
                className="password-toggle-modern"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button 
            className="auth-submit-btn-modern" 
            type="submit" 
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner-auth"></span>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Sign In</span>
              </>
            )}
          </button>

          <div className="auth-divider-modern">
            <span>or</span>
          </div>

          <div className="auth-links-modern">
            <p className="auth-switch-text">
              Don't have an account?{' '}
              <Link to="/register" className="auth-link-modern">
                Create Account
              </Link>
            </p>
          </div>
        </form>

        <div className="auth-footer-modern">
          <div className="auth-features">
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Fast & Secure</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🛡️</span>
              <span>Protected Data</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <span>Easy Building</span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-background-modern">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
        <div className="bg-gradient-3"></div>
      </div>
    </div>
  );
}

export default LoginPage;

