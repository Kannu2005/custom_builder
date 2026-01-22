import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../services/api';

function ProfilePage() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [emailChanged, setEmailChanged] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [sendingCode, setSendingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Check if email changed from original
    if (name === 'email' && value !== user?.email) {
      setEmailChanged(true);
    } else if (name === 'email' && value === user?.email) {
      setEmailChanged(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      setMessage('Name cannot be empty');
      return;
    }

    // If email changed, send verification code first
    if (emailChanged && formData.email !== user?.email) {
      await handleSendVerificationCode();
      return;
    }

    // If email not changed, just update name
    setLoading(true);
    setMessage('');

    try {
      const res = await apiClient.put('/auth/profile', { name: formData.name.trim() });
      updateUser(res.data);
      setIsEditing(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSendVerificationCode = async () => {
    if (!formData.email.trim()) {
      setMessage('Email cannot be empty');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setMessage('Please enter a valid email address');
      return;
    }

    setSendingCode(true);
    setMessage('');

    try {
      console.log('📧 Sending verification code request for:', formData.email.trim());
      const res = await apiClient.post('/auth/send-email-verification', {
        newEmail: formData.email.trim(),
      });
      
      console.log('✅ Response received:', res.data);
      setShowVerification(true);
      setMessage(res.data.message || 'Verification code sent to your email');
      
      // Always show code in alert for testing
      if (res.data.code) {
        alert(`📧 Email Verification Code\n\nEmail: ${res.data.email}\nCode: ${res.data.code}\n\n(Check backend console for email preview URL if using Ethereal Email)`);
      } else {
        console.warn('⚠️ Code not received in response');
        alert(`⚠️ Code not received. Check browser console and backend logs.`);
      }
    } catch (err) {
      console.error('❌ Error sending verification code:', err);
      setMessage(err.response?.data?.message || 'Failed to send verification code');
      alert(`Error: ${err.response?.data?.message || 'Failed to send verification code'}`);
    } finally {
      setSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode.trim() || verificationCode.length !== 6) {
      setMessage('Please enter a valid 6-digit code');
      return;
    }

    setVerifyingCode(true);
    setMessage('');

    try {
      const res = await apiClient.post('/auth/verify-email-code', {
        code: verificationCode.trim(),
      });
      
      // Update name as well if changed
      if (formData.name !== user?.name) {
        await apiClient.put('/auth/profile', { name: formData.name.trim() });
      }
      
      updateUser(res.data.user);
      setIsEditing(false);
      setShowVerification(false);
      setEmailChanged(false);
      setVerificationCode('');
      setMessage('Email and profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to verify code');
    } finally {
      setVerifyingCode(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
    setMessage('');
    setEmailChanged(false);
    setShowVerification(false);
    setVerificationCode('');
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <button 
        className="back-button"
        onClick={() => navigate('/dashboard')}
        title="Go back"
      >
        ← Back to Cart
      </button>
      
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">
            <span className="title-icon">👤</span>
            Your Account
          </h1>
          <p className="page-subtitle">Manage your profile and account settings</p>
        </div>
      </div>

      <div className="profile-sections">
        {/* Profile Information Section */}
        <div className="profile-section">
          <div className="profile-section-header">
            <h2>Profile Information</h2>
            {!isEditing && (
              <button 
                className="edit-profile-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
          </div>

          <div className="profile-section-content">
            {message && (
              <div className={`profile-message ${message.includes('successfully') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            <div className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="profile-input"
                    placeholder="Enter your name"
                  />
                ) : (
                  <div className="profile-value">{user.name}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                {isEditing ? (
                  <>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="profile-input"
                      placeholder="Enter your email"
                    />
                    {emailChanged && formData.email !== user?.email && !showVerification && (
                      <small className="profile-hint">
                        Email changed. Click "Save Changes" to send verification code.
                      </small>
                    )}
                  </>
                ) : (
                  <div className="profile-value">{user.email}</div>
                )}
              </div>

              {showVerification && (
                <div className="verification-section">
                  <div className="form-group">
                    <label htmlFor="verificationCode">Verification Code</label>
                    <input
                      type="text"
                      id="verificationCode"
                      value={verificationCode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setVerificationCode(value);
                      }}
                      className="profile-input verification-input"
                      placeholder="Enter 6-digit code"
                      maxLength="6"
                    />
                    <small className="profile-hint">
                      Enter the 6-digit code sent to {formData.email}
                    </small>
                  </div>
                  <div className="verification-actions">
                    <button
                      onClick={handleVerifyCode}
                      className="verify-code-btn"
                      disabled={verifyingCode || verificationCode.length !== 6}
                    >
                      {verifyingCode ? 'Verifying...' : 'Verify & Update Email'}
                    </button>
                    <button
                      onClick={handleSendVerificationCode}
                      className="resend-code-btn"
                      disabled={sendingCode}
                    >
                      {sendingCode ? 'Sending...' : 'Resend Code'}
                    </button>
                  </div>
                </div>
              )}

              {isEditing && (
                <div className="profile-form-actions">
                  <button
                    onClick={handleSave}
                    className="save-profile-btn"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="cancel-profile-btn"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="profile-section">
          <div className="profile-section-header">
            <h2>Account Settings</h2>
          </div>
          <div className="profile-section-content">
            <div className="account-options">
              <div className="account-option">
                <div className="account-option-info">
                  <h3>My Orders</h3>
                  <p>View and track your orders</p>
                </div>
                <button
                  className="account-option-btn"
                  onClick={() => navigate('/my-orders')}
                >
                  View Orders →
                </button>
              </div>

              <div className="account-option">
                <div className="account-option-info">
                  <h3>My Cart</h3>
                  <p>View your saved builds</p>
                </div>
                <button
                  className="account-option-btn"
                  onClick={() => navigate('/dashboard')}
                >
                  View Cart →
                </button>
              </div>

              <div className="account-option">
                <div className="account-option-info">
                  <h3>Build PC</h3>
                  <p>Create a new custom PC build</p>
                </div>
                <button
                  className="account-option-btn"
                  onClick={() => navigate('/build')}
                >
                  Start Building →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

