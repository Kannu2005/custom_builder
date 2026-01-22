import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import SearchBar from '../components/SearchBar';

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [cancellingOrder, setCancellingOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await apiClient.get('/orders/my-orders');
      setOrders(res.data || []);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (orderId) => {
    try {
      const res = await apiClient.get(`/orders/${orderId}`);
      setSelectedOrder(res.data);
      setShowOrderDetails(true);
    } catch (err) {
      console.error('Failed to load order details:', err);
      alert('Failed to load order details. Please try again.');
    }
  };

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      '⚠️ Are you sure you want to cancel this order?\n\nThis action cannot be undone and you will need to place a new order if you change your mind.'
    );
    
    if (!confirmCancel) return;

    setCancellingOrder(orderId);
    try {
      const res = await apiClient.put(`/orders/${orderId}/cancel`);
      
      // Update the order in the local state with the response data
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId 
            ? { ...order, status: 'cancelled', timeline: res.data.timeline }
            : order
        )
      );
      
      // Show success message
      alert('✅ Order cancelled successfully!\n\nYour order has been cancelled and will no longer be processed.');
    } catch (err) {
      console.error('Failed to cancel order:', err);
      const errorMessage = err.response?.data?.message || 'Failed to cancel order. Please try again.';
      alert(`❌ Error: ${errorMessage}`);
    } finally {
      setCancellingOrder(null);
    }
  };

  const handleReorder = (order) => {
    // Navigate to build page with the order's build configuration
    if (order.buildId) {
      navigate(`/build?reorder=${order.buildId}`);
    } else {
      navigate('/build');
    }
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏳',
      in_review: '👀',
      approved: '✅',
      in_progress: '🔄',
      shipped: '🚚',
      completed: '🎉',
      cancelled: '❌'
    };
    return icons[status] || '📋';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#fbbf24',
      in_review: '#3b82f6',
      approved: '#10b981',
      in_progress: '#6366f1',
      shipped: '#8b5cf6',
      completed: '#059669',
      cancelled: '#ef4444'
    };
    return colors[status] || '#9ca3af';
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = !searchTerm || 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getOrderStats = () => {
    const stats = {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      completed: orders.filter(o => o.status === 'completed').length,
      in_progress: orders.filter(o => ['approved', 'in_progress', 'shipped'].includes(o.status)).length
    };
    return stats;
  };

  const stats = getOrderStats();

  if (loading) {
    return (
      <div className="orders-page-modern">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page-modern">
      <button 
        className="back-button"
        onClick={() => navigate('/dashboard')}
        title="Go back to Cart"
      >
        ← Back to Cart
      </button>
      
      <div className="orders-header-modern">
        <div className="orders-title-section">
          <h1 className="orders-title">
            <span className="title-icon">📋</span>
            My Orders
          </h1>
          <p className="orders-subtitle">Track and manage your PC build orders</p>
        </div>
        
        <div className="orders-stats-grid">
          <div className="stat-card-modern">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total Orders</span>
            </div>
          </div>
          <div className="stat-card-modern">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <span className="stat-number">{stats.pending}</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
          <div className="stat-card-modern">
            <div className="stat-icon">🔄</div>
            <div className="stat-info">
              <span className="stat-number">{stats.in_progress}</span>
              <span className="stat-label">In Progress</span>
            </div>
          </div>
          <div className="stat-card-modern">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <span className="stat-number">{stats.completed}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="orders-controls-modern">
        <div className="search-filter-section">
          <SearchBar
            placeholder="Search orders by ID, status, or payment method..."
            onSearch={setSearchTerm}
            className="orders-search"
          />
          
          <div className="filter-section">
            <label className="filter-label">Filter by Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="in_review">In Review</option>
              <option value="approved">Approved</option>
              <option value="in_progress">In Progress</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="orders-content-modern">
        {filteredOrders.length === 0 ? (
          <div className="empty-state-orders">
            <div className="empty-state-icon">📦</div>
            <h3 className="empty-state-title">
              {searchTerm || filterStatus !== 'all' ? 'No orders found' : 'No orders yet'}
            </h3>
            <p className="empty-state-description">
              {searchTerm || filterStatus !== 'all'
                ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
                : 'When you place orders for your PC builds, they\'ll appear here.'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <div className="empty-state-actions">
                <button
                  className="cta-button"
                  onClick={() => navigate('/build')}
                >
                  <span>⚙️</span>
                  Start Building PC
                </button>
                <button
                  className="secondary-button"
                  onClick={() => navigate('/dashboard')}
                >
                  View My Cart
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="orders-grid-modern">
            {filteredOrders.map((order) => (
              <div key={order._id} className="order-card-modern">
                <div className="order-card-header">
                  <div className="order-id-section">
                    <h3 className="order-id">Order #{order._id.slice(-8)}</h3>
                    <span className="order-date">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div 
                    className="status-badge-modern"
                    style={{ 
                      backgroundColor: `${getStatusColor(order.status)}20`,
                      borderColor: getStatusColor(order.status),
                      color: getStatusColor(order.status)
                    }}
                  >
                    <span className="status-icon">{getStatusIcon(order.status)}</span>
                    <span className="status-text">{order.status.replace('_', ' ')}</span>
                  </div>
                </div>
                
                <div className="order-card-body">
                  <div className="order-details-grid">
                    <div className="order-detail-item">
                      <div className="detail-icon">💰</div>
                      <div className="detail-content">
                        <span className="detail-label">Total Amount</span>
                        <span className="detail-value price">₹{order.totalAmount?.toFixed(2) || '0.00'}</span>
                      </div>
                    </div>
                    
                    <div className="order-detail-item">
                      <div className="detail-icon">💳</div>
                      <div className="detail-content">
                        <span className="detail-label">Payment Method</span>
                        <span className="detail-value">{order.paymentMethod?.replace('_', ' ') || 'N/A'}</span>
                      </div>
                    </div>
                    
                    <div className="order-detail-item">
                      <div className="detail-icon">📅</div>
                      <div className="detail-content">
                        <span className="detail-label">Order Date</span>
                        <span className="detail-value">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="order-detail-item">
                      <div className="detail-icon">🚚</div>
                      <div className="detail-content">
                        <span className="detail-label">Delivery Status</span>
                        <span className="detail-value">
                          {order.status === 'completed' ? 'Delivered' : 
                           order.status === 'shipped' ? 'In Transit' :
                           order.status === 'in_progress' ? 'Processing' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {order.timeline && order.timeline.length > 0 && (
                    <div className="order-timeline-modern">
                      <h4 className="timeline-title">
                        <span className="timeline-icon">📈</span>
                        Order Timeline
                      </h4>
                      <div className="timeline-container">
                        {order.timeline.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="timeline-item-modern">
                            <div className="timeline-dot-modern"></div>
                            <div className="timeline-content-modern">
                              <div className="timeline-status">{item.status}</div>
                              <div className="timeline-date">
                                {new Date(item.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                              {item.note && <div className="timeline-note">{item.note}</div>}
                            </div>
                          </div>
                        ))}
                        {order.timeline.length > 3 && (
                          <div className="timeline-more">
                            +{order.timeline.length - 3} more updates
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="order-card-footer">
                  <button 
                    className="order-action-btn primary"
                    onClick={() => handleViewDetails(order._id)}
                  >
                    <span>👁️</span>
                    View Details
                  </button>
                  {order.status === 'pending' && (
                    <button 
                      className="order-action-btn secondary"
                      onClick={() => handleCancelOrder(order._id)}
                      disabled={cancellingOrder === order._id}
                    >
                      {cancellingOrder === order._id ? (
                        <>
                          <span className="loading-spinner-small"></span>
                          <span>Cancelling...</span>
                        </>
                      ) : (
                        <>
                          <span>❌</span>
                          <span>Cancel Order</span>
                        </>
                      )}
                    </button>
                  )}
                  {order.status === 'completed' && (
                    <button 
                      className="order-action-btn success"
                      onClick={() => handleReorder(order)}
                    >
                      <span>🔄</span>
                      Reorder
                    </button>
                  )}
                  {order.status === 'cancelled' && (
                    <div className="cancelled-order-info">
                      <span className="cancelled-icon">❌</span>
                      <span className="cancelled-text">Order Cancelled</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowOrderDetails(false)}>
          <div className="order-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <span>📋</span>
                Order Details - #{selectedOrder._id.slice(-8)}
              </h2>
              <button 
                className="modal-close-btn"
                onClick={() => setShowOrderDetails(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-content">
              <div className="order-info-section">
                <h3>Order Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Order ID:</span>
                    <span className="info-value">{selectedOrder._id}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Status:</span>
                    <span 
                      className="info-value status-badge-small"
                      style={{ 
                        backgroundColor: `${getStatusColor(selectedOrder.status)}20`,
                        color: getStatusColor(selectedOrder.status)
                      }}
                    >
                      {getStatusIcon(selectedOrder.status)} {selectedOrder.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Total Amount:</span>
                    <span className="info-value price-large">₹{selectedOrder.totalAmount?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Payment Method:</span>
                    <span className="info-value">{selectedOrder.paymentMethod?.replace('_', ' ') || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Order Date:</span>
                    <span className="info-value">{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {selectedOrder.shippingAddress && (
                <div className="shipping-section">
                  <h3>Shipping Address</h3>
                  <div className="address-display">
                    <p>{selectedOrder.shippingAddress.street}</p>
                    <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}</p>
                    <p>{selectedOrder.shippingAddress.country}</p>
                    <p>Phone: {selectedOrder.shippingAddress.phone}</p>
                  </div>
                </div>
              )}

              {selectedOrder.timeline && selectedOrder.timeline.length > 0 && (
                <div className="timeline-section">
                  <h3>Complete Timeline</h3>
                  <div className="timeline-list">
                    {selectedOrder.timeline.map((item, idx) => (
                      <div key={idx} className="timeline-item-detailed">
                        <div className="timeline-dot-detailed"></div>
                        <div className="timeline-content-detailed">
                          <div className="timeline-status-detailed">{item.status}</div>
                          <div className="timeline-date-detailed">
                            {new Date(item.date).toLocaleString()}
                          </div>
                          {item.note && <div className="timeline-note-detailed">{item.note}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <button 
                className="modal-btn secondary"
                onClick={() => setShowOrderDetails(false)}
              >
                Close
              </button>
              {selectedOrder.status === 'pending' && (
                <button 
                  className="modal-btn danger"
                  onClick={() => {
                    setShowOrderDetails(false);
                    handleCancelOrder(selectedOrder._id);
                  }}
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyOrdersPage;

