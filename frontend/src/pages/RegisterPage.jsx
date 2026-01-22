import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../services/api';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Timer for resend OTP
  const startOtpTimer = () => {
    setOtpTimer(60);
    const timer = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Send OTP to email
  const handleSendOtp = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setSendingOtp(true);
    setError('');
    setSuccess('');

    try {
      const res = await apiClient.post('/auth/send-registration-otp', { email });
      setOtpSent(true);
      setSuccess('OTP sent to your email! Please check your inbox.');
      startOtpTimer();
      
      // Show OTP in alert for testing (remove in production)
      if (res.data.otp) {
        alert(`📧 Registration OTP\n\nEmail: ${email}\nOTP: ${res.data.otp}\n\n(Check backend console for email preview URL)`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setSendingOtp(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setVerifyingOtp(true);
    setError('');

    try {
      await apiClient.post('/auth/verify-registration-otp', { email, otp });
      setEmailVerified(true);
      setSuccess('Email verified successfully! You can now complete registration.');
      setOtpSent(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Password strength calculation
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    // Calculate score
    if (checks.length) score += 2;
    if (checks.lowercase) score += 1;
    if (checks.uppercase) score += 1;
    if (checks.numbers) score += 1;
    if (checks.special) score += 1;
    
    if (score <= 2) return { strength: 1, label: 'Weak', color: '#ef4444' };
    if (score <= 4) return { strength: 2, label: 'Medium', color: '#f59e0b' };
    if (score <= 5) return { strength: 3, label: 'Strong', color: '#10b981' };
    return { strength: 4, label: 'Very Strong', color: '#059669' };
  };

  // Password match validation
  const getPasswordMatch = () => {
    if (!confirmPassword) return null;
    if (password === confirmPassword) {
      return { match: true, message: 'Passwords match', color: '#10b981' };
    } else {
      return { match: false, message: 'Passwords do not match', color: '#ef4444' };
    }
  };

  const passwordStrength = getPasswordStrength(password);
  const passwordMatch = getPasswordMatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!emailVerified) {
      setError('Please verify your email first');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
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
          <h1 className="auth-title-modern">Create Account</h1>
          <p className="auth-subtitle-modern">Join us to start building your dream PC</p>
        </div>

        <form className="auth-form-modern" onSubmit={handleSubmit}>
          {error && (
            <div className="auth-error-modern">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="auth-success-modern">
              <span className="success-icon">✅</span>
              <span>{success}</span>
            </div>
          )}

          <div className="form-group-modern">
            <label className="form-label-modern">
              <span className="label-text">Full Name</span>
              <span className="required-star">*</span>
            </label>
            <div className="input-container-modern">
              <span className="input-icon">👤</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="form-input-modern"
                required
              />
            </div>
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern">
              <span className="label-text">Email Address</span>
              <span className="required-star">*</span>
            </label>
            <div className="email-verification-container">
              <div className="input-container-modern">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailVerified(false);
                    setOtpSent(false);
                  }}
                  placeholder="Enter your email"
                  className="form-input-modern"
                  required
                  disabled={emailVerified}
                />
                {emailVerified && (
                  <span className="email-verified-icon">✅</span>
                )}
              </div>
              
              {!emailVerified && (
                <button
                  type="button"
                  className="verify-email-btn"
                  onClick={handleSendOtp}
                  disabled={sendingOtp || !email || otpTimer > 0}
                >
                  {sendingOtp ? (
                    <>
                      <span className="loading-spinner-small"></span>
                      <span>Sending...</span>
                    </>
                  ) : otpTimer > 0 ? (
                    <span>Resend in {otpTimer}s</span>
                  ) : (
                    <>
                      <span>📧</span>
                      <span>Verify Email</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* OTP Input */}
            {otpSent && !emailVerified && (
              <div className="otp-verification-container">
                <label className="form-label-modern">
                  <span className="label-text">Enter OTP</span>
                  <span className="required-star">*</span>
                </label>
                <div className="otp-input-container">
                  <div className="input-container-modern">
                    <span className="input-icon">🔢</span>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setOtp(value);
                      }}
                      placeholder="Enter 6-digit OTP"
                      className="form-input-modern otp-input"
                      maxLength="6"
                    />
                  </div>
                  <button
                    type="button"
                    className="verify-otp-btn"
                    onClick={handleVerifyOtp}
                    disabled={verifyingOtp || otp.length !== 6}
                  >
                    {verifyingOtp ? (
                      <>
                        <span className="loading-spinner-small"></span>
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>✓</span>
                        <span>Verify</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="otp-help-text">
                  Check your email for the 6-digit verification code
                </div>
              </div>
            )}
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
                placeholder="Create a password (min 6 characters)"
                className="form-input-modern"
                required
                minLength="6"
              />
              <button
                type="button"
                className="password-toggle-modern"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {password && (
              <div className="password-strength-container">
                <div className="password-strength-bar">
                  <div 
                    className="password-strength-fill"
                    style={{ 
                      width: `${(passwordStrength.strength / 4) * 100}%`,
                      backgroundColor: passwordStrength.color
                    }}
                  ></div>
                </div>
                <div className="password-strength-info">
                  <span 
                    className="password-strength-label"
                    style={{ color: passwordStrength.color }}
                  >
                    {passwordStrength.label}
                  </span>
                  <div className="password-requirements">
                    <div className={`requirement ${password.length >= 8 ? 'met' : 'unmet'}`}>
                      {password.length >= 8 ? '✓' : '○'} At least 8 characters
                    </div>
                    <div className={`requirement ${/[a-z]/.test(password) ? 'met' : 'unmet'}`}>
                      {/[a-z]/.test(password) ? '✓' : '○'} Lowercase letter
                    </div>
                    <div className={`requirement ${/[A-Z]/.test(password) ? 'met' : 'unmet'}`}>
                      {/[A-Z]/.test(password) ? '✓' : '○'} Uppercase letter
                    </div>
                    <div className={`requirement ${/\d/.test(password) ? 'met' : 'unmet'}`}>
                      {/\d/.test(password) ? '✓' : '○'} Number
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern">
              <span className="label-text">Confirm Password</span>
              <span className="required-star">*</span>
            </label>
            <div className="input-container-modern">
              <span className="input-icon">🔐</span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="form-input-modern"
                required
              />
              <button
                type="button"
                className="password-toggle-modern"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            
            {/* Password Match Indicator */}
            {passwordMatch && (
              <div className="password-match-container">
                <div 
                  className="password-match-indicator"
                  style={{ color: passwordMatch.color }}
                >
                  <span className="match-icon">
                    {passwordMatch.match ? '✓' : '✗'}
                  </span>
                  <span className="match-message">{passwordMatch.message}</span>
                </div>
              </div>
            )}
          </div>

          <button 
            className="auth-submit-btn-modern" 
            type="submit" 
            disabled={loading || !emailVerified}
          >
            {loading ? (
              <>
                <span className="loading-spinner-auth"></span>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>✨</span>
                <span>Create Account</span>
              </>
            )}
          </button>

          <div className="auth-divider-modern">
            <span>or</span>
          </div>

          <div className="auth-links-modern">
            <p className="auth-switch-text">
              Already have an account?{' '}
              <Link to="/login" className="auth-link-modern">
                Sign In
              </Link>
            </p>
          </div>
        </form>

        <div className="auth-footer-modern">
          <div className="auth-features">
            <div className="feature-item">
              <span className="feature-icon">🎮</span>
              <span>Gaming PCs</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💼</span>
              <span>Workstations</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🏠</span>
              <span>Home Office</span>
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

export default RegisterPage;


