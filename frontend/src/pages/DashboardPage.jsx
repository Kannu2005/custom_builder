import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import SearchBar from '../components/SearchBar';

function DashboardPage() {
  const [builds, setBuilds] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBuilds, setSelectedBuilds] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('newest');
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const buildsRes = await apiClient.get('/builds/my-builds');
      setBuilds(buildsRes.data);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBuild = async (buildId) => {
    if (!confirm('Are you sure you want to delete this build?')) return;
    try {
      await apiClient.delete(`/builds/${buildId}`);
      setBuilds(builds.filter((b) => b._id !== buildId));
      setSelectedBuilds(prev => prev.filter(id => id !== buildId));
    } catch (err) {
      alert('Failed to delete build');
    }
  };

  const handleCreateOrder = (buildId) => {
    navigate(`/checkout?buildId=${buildId}`, { state: { buildId } });
  };

  const handleMultipleOrders = () => {
    if (selectedBuilds.length === 0) {
      alert('Please select at least one build to order');
      return;
    }
    // For now, navigate to checkout with first build, but can be extended for multiple
    navigate(`/checkout?buildId=${selectedBuilds[0]}`, { state: { buildId: selectedBuilds[0] } });
  };

  const handleBuildSelect = (buildId) => {
    setSelectedBuilds(prev => 
      prev.includes(buildId) 
        ? prev.filter(id => id !== buildId)
        : [...prev, buildId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBuilds.length === filteredBuilds.length) {
      setSelectedBuilds([]);
    } else {
      setSelectedBuilds(filteredBuilds.map(b => b._id));
    }
  };

  const handleCardClick = (buildId, e) => {
    // Don't navigate if clicking on checkbox or buttons
    if (e.target.type === 'checkbox' || e.target.closest('.build-actions') || e.target.closest('input')) {
      return;
    }
    navigate(`/build?edit=${buildId}`);
  };

  const filteredBuilds = builds.filter((build) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      build.name.toLowerCase().includes(term) ||
      Object.values(build.components || {}).some((comp) =>
        comp && comp.name && comp.name.toLowerCase().includes(term)
      )
    );
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.totalPrice || 0) - (b.totalPrice || 0);
      case 'price-high':
        return (b.totalPrice || 0) - (a.totalPrice || 0);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'newest':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const getCategoryIcon = (category) => {
    const icons = {
      cpu: '🧠',
      gpu: '🎮',
      ram: '⚡',
      storage: '💾',
      motherboard: '🔌',
      psu: '🔋',
      case: '📦',
      cooling: '❄️'
    };
    return icons[category.toLowerCase()] || '🔧';
  };

  const getBuildTypeIcon = (build) => {
    const components = Object.keys(build.components || {});
    if (components.includes('gpu')) return '🎮'; // Gaming
    if (components.length >= 6) return '💼'; // Workstation
    return '💡'; // Budget/Basic
  };

  const getBuildTypeLabel = (build) => {
    const components = Object.keys(build.components || {});
    const price = build.totalPrice || 0;
    
    if (price > 100000) return 'High-End';
    if (price > 60000) return 'Gaming';
    if (price > 30000) return 'Mid-Range';
    return 'Budget';
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <h2>Loading Your Builds...</h2>
        <p>Preparing your PC configurations</p>
      </div>
    );
  }

  const calculateSubtotal = () => {
    return filteredBuilds
      .filter(build => selectedBuilds.includes(build._id))
      .reduce((sum, build) => sum + (build.totalPrice || 0), 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="dashboard-page-modern">
      {/* Dashboard Header */}
      <div className="dashboard-header-modern">
        <div className="header-content">
          <div className="header-title-section">
            <h1 className="dashboard-title">
              <span className="title-icon">🛒</span>
              My PC Builds
            </h1>
            <p className="dashboard-subtitle">
              Manage your custom PC configurations and place orders
            </p>
          </div>
          
          {filteredBuilds.length > 0 && (
            <div className="header-stats">
              <div className="stat-item">
                <span className="stat-number">{filteredBuilds.length}</span>
                <span className="stat-label">Builds</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{selectedBuilds.length}</span>
                <span className="stat-label">Selected</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">₹{subtotal.toFixed(0)}</span>
                <span className="stat-label">Total Value</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {filteredBuilds.length === 0 ? (
        <div className="empty-cart-modern">
          <div className="empty-animation">
            <div className="empty-icon">🛒</div>
            <div className="empty-particles">
              <span>✨</span>
              <span>💫</span>
              <span>⭐</span>
            </div>
          </div>
          <h2>Your Build Collection is Empty</h2>
          <p>Start creating amazing PC configurations tailored to your needs</p>
          <div className="empty-actions">
            <button
              className="primary-btn-modern"
              onClick={() => navigate('/build')}
            >
              <span>🔧</span>
              Start Building Your PC
            </button>
            <button
              className="secondary-btn-modern"
              onClick={() => navigate('/')}
            >
              <span>📖</span>
              Browse Components
            </button>
          </div>
          <div className="empty-features">
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Real-time Pricing</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔧</span>
              <span>Compatibility Check</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💎</span>
              <span>Premium Components</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="dashboard-content">
          {/* Controls Bar */}
          <div className="dashboard-controls">
            <div className="controls-left">
              <div className="search-section">
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  placeholder="Search your builds..."
                />
              </div>
              
              <div className="filter-section">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select-modern"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
            
            <div className="controls-right">
              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  ⊞
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  ☰
                </button>
              </div>
              
              <div className="bulk-actions">
                <label className="select-all-modern">
                  <input
                    type="checkbox"
                    checked={selectedBuilds.length === filteredBuilds.length && filteredBuilds.length > 0}
                    onChange={handleSelectAll}
                  />
                  <span>Select All</span>
                </label>
                
                {selectedBuilds.length > 0 && (
                  <button
                    className="bulk-order-btn-modern"
                    onClick={handleMultipleOrders}
                  >
                    <span>🛒</span>
                    Order Selected ({selectedBuilds.length})
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="dashboard-main">
            {/* Builds Section */}
            <div className="builds-section">
              <div className={`builds-container ${viewMode}`}>
                {filteredBuilds.map((build) => (
                  <div 
                    key={build._id} 
                    className={`build-card-modern ${selectedBuilds.includes(build._id) ? 'selected' : ''}`}
                    onClick={(e) => handleCardClick(build._id, e)}
                  >
                    <div className="build-card-header">
                      <div className="build-select">
                        <input
                          type="checkbox"
                          checked={selectedBuilds.includes(build._id)}
                          onChange={() => handleBuildSelect(build._id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      
                      <div className="build-type-badge">
                        <span className="build-type-icon">{getBuildTypeIcon(build)}</span>
                        <span className="build-type-label">{getBuildTypeLabel(build)}</span>
                      </div>
                      
                      <div className="build-menu">
                        <button className="menu-btn">⋮</button>
                      </div>
                    </div>
                    
                    <div className="build-card-content">
                      <h3 className="build-name">{build.name}</h3>
                      
                      <div className="build-components-preview">
                        {Object.entries(build.components || {}).slice(0, 4).map(([key, comp]) => {
                          if (!comp || !comp._id) return null;
                          return (
                            <div key={key} className="component-preview">
                              <span className="component-icon">{getCategoryIcon(key)}</span>
                              <div className="component-info">
                                <span className="component-category">{key.toUpperCase()}</span>
                                <span className="component-name">{comp.name || 'N/A'}</span>
                              </div>
                            </div>
                          );
                        })}
                        {Object.keys(build.components || {}).length > 4 && (
                          <div className="component-preview more">
                            <span className="component-icon">+</span>
                            <div className="component-info">
                              <span className="component-category">MORE</span>
                              <span className="component-name">
                                {Object.keys(build.components || {}).length - 4} more components
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="build-stats">
                        <div className="stat">
                          <span className="stat-label">Components:</span>
                          <span className="stat-value">{Object.keys(build.components || {}).length}</span>
                        </div>
                        <div className="stat">
                          <span className="stat-label">Created:</span>
                          <span className="stat-value">
                            {new Date(build.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="build-card-footer">
                      <div className="build-price-section">
                        <div className="price-main">₹{build.totalPrice?.toFixed(2) || '0.00'}</div>
                        <div className="price-label">Total Price</div>
                      </div>
                      
                      <div className="build-actions-modern">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/build?edit=${build._id}`);
                          }}
                          className="action-btn edit-btn-modern"
                          title="Edit Build"
                        >
                          <span>✏️</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCreateOrder(build._id);
                          }}
                          className="action-btn order-btn-modern"
                          title="Order Now"
                        >
                          <span>🛒</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBuild(build._id);
                          }}
                          className="action-btn delete-btn-modern"
                          title="Delete Build"
                        >
                          <span>🗑️</span>
                        </button>
                      </div>
                    </div>
                    
                    {selectedBuilds.includes(build._id) && (
                      <div className="selected-overlay">
                        <div className="selected-checkmark">✓</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            {selectedBuilds.length > 0 && (
              <div className="order-summary-sidebar">
                <div className="summary-card-modern">
                  <div className="summary-header-modern">
                    <h3>Order Summary</h3>
                    <div className="summary-badge">
                      {selectedBuilds.length} {selectedBuilds.length === 1 ? 'build' : 'builds'}
                    </div>
                  </div>
                  
                  <div className="summary-content-modern">
                    <div className="selected-builds-list">
                      {filteredBuilds
                        .filter(build => selectedBuilds.includes(build._id))
                        .map(build => (
                          <div key={build._id} className="summary-build-item">
                            <div className="build-summary-info">
                              <span className="build-summary-name">{build.name}</span>
                              <span className="build-summary-components">
                                {Object.keys(build.components || {}).length} components
                              </span>
                            </div>
                            <div className="build-summary-price">
                              ₹{build.totalPrice?.toFixed(2) || '0.00'}
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    
                    <div className="summary-calculations">
                      <div className="calc-row">
                        <span>Subtotal:</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="calc-row">
                        <span>Shipping:</span>
                        <span className="free-text">FREE</span>
                      </div>
                      <div className="calc-row">
                        <span>Tax (10%):</span>
                        <span>₹{tax.toFixed(2)}</span>
                      </div>
                      <div className="calc-divider"></div>
                      <div className="calc-row total">
                        <span>Total:</span>
                        <span>₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="summary-actions">
                      <button
                        className="checkout-btn-modern"
                        onClick={handleMultipleOrders}
                      >
                        <span>💳</span>
                        Proceed to Checkout
                      </button>
                      <button
                        className="continue-btn-modern"
                        onClick={() => navigate('/build')}
                      >
                        <span>🔧</span>
                        Continue Building
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;

