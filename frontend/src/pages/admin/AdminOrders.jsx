import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/api';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await apiClient.get('/admin/orders');
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Failed to load orders:', error);
      if (error.response?.status === 403) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await apiClient.put(`/admin/orders/${orderId}/status`, { status: newStatus });
      loadOrders(); // Reload orders
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update order status');
    }
  };

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
    setShowOrderModal(false);
  };

  const printOrder = (order) => {
    const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Order Invoice</h2>
        <p><strong>Order ID:</strong> #${order._id.slice(-8)}</p>
        <p><strong>Customer:</strong> ${order.userId?.name || 'N/A'}</p>
        <p><strong>Email:</strong> ${order.userId?.email || 'N/A'}</p>
        <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <p><strong>Total Amount:</strong> $${order.totalAmount?.toFixed(2)}</p>
        <hr>
        <p><strong>Build:</strong> ${order.build?.name || 'Custom Build'}</p>
        <p><strong>Components:</strong> ${Object.keys(order.components || {}).length} items</p>
      </div>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const cancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await updateOrderStatus(orderId, 'cancelled');
      } catch (error) {
        alert('Failed to cancel order');
      }
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <h2>Loading Orders...</h2>
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
              <span className="admin-icon">📦</span>
              Order Management
            </h1>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="orders-summary">
          <div className="summary-cards">
            <div className="summary-card pending">
              <div className="card-icon">⏳</div>
              <div className="card-content">
                <h3>Pending Orders</h3>
                <div className="card-number">{orders.filter(o => o.status === 'pending').length}</div>
              </div>
            </div>
            <div className="summary-card processing">
              <div className="card-icon">🔄</div>
              <div className="card-content">
                <h3>Processing</h3>
                <div className="card-number">{orders.filter(o => o.status === 'processing').length}</div>
              </div>
            </div>
            <div className="summary-card shipped">
              <div className="card-icon">🚚</div>
              <div className="card-content">
                <h3>Shipped</h3>
                <div className="card-number">{orders.filter(o => o.status === 'shipped').length}</div>
              </div>
            </div>
            <div className="summary-card delivered">
              <div className="card-icon">✅</div>
              <div className="card-content">
                <h3>Delivered</h3>
                <div className="card-number">{orders.filter(o => o.status === 'delivered').length}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-table-container">
          <div className="table-header">
            <h3>All Orders ({orders.length})</h3>
            <div className="table-filters">
              <select className="filter-select">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <input 
                type="date" 
                className="filter-input"
                placeholder="Filter by date"
              />
            </div>
          </div>
          
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Build/Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <div className="order-id">#{order._id.slice(-8)}</div>
                  </td>
                  <td>
                    <div className="customer-info">
                      <div className="customer-name">{order.userId?.name || 'N/A'}</div>
                      <div className="customer-email">{order.userId?.email || 'N/A'}</div>
                    </div>
                  </td>
                  <td>
                    <div className="build-info">
                      <div className="build-name">{order.build?.name || 'Custom Build'}</div>
                      <div className="build-items">{Object.keys(order.components || {}).length} components</div>
                    </div>
                  </td>
                  <td className="amount-cell">
                    <div className="order-amount">${order.totalAmount?.toFixed(2)}</div>
                  </td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className={`status-select ${order.status}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <div className="order-date">
                      <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                      <div className="order-time">{new Date(order.createdAt).toLocaleTimeString()}</div>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => showOrderDetails(order)}
                        className="view-btn"
                        title="View Details"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => printOrder(order)}
                        className="print-btn"
                        title="Print Order"
                      >
                        🖨️
                      </button>
                      {order.status !== 'cancelled' && order.status !== 'delivered' && (
                        <button
                          onClick={() => cancelOrder(order._id)}
                          className="cancel-btn"
                          title="Cancel Order"
                        >
                          ❌
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h3>No Orders Found</h3>
              <p>Orders will appear here when customers place them</p>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {showOrderModal && selectedOrder && (
          <div className="admin-modal-overlay" onClick={closeOrderModal}>
            <div className="order-details-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Order Details</h2>
                <button onClick={closeOrderModal} className="modal-close-btn">×</button>
              </div>
              
              <div className="modal-content">
                <div className="order-info-grid">
                  <div className="info-section">
                    <h3>Order Information</h3>
                    <div className="info-item">
                      <span className="label">Order ID:</span>
                      <span className="value">#{selectedOrder._id.slice(-8)}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Status:</span>
                      <span className={`status-badge ${selectedOrder.status}`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="label">Order Date:</span>
                      <span className="value">{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Total Amount:</span>
                      <span className="value amount">${selectedOrder.totalAmount?.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="info-section">
                    <h3>Customer Information</h3>
                    <div className="info-item">
                      <span className="label">Name:</span>
                      <span className="value">{selectedOrder.userId?.name || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Email:</span>
                      <span className="value">{selectedOrder.userId?.email || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Customer ID:</span>
                      <span className="value">{selectedOrder.userId?._id?.slice(-6) || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="info-section">
                    <h3>Shipping Address</h3>
                    <div className="address-details">
                      <p>{selectedOrder.shippingAddress?.street || 'N/A'}</p>
                      <p>{selectedOrder.shippingAddress?.city || ''}, {selectedOrder.shippingAddress?.state || ''} {selectedOrder.shippingAddress?.zipCode || ''}</p>
                      <p>{selectedOrder.shippingAddress?.country || ''}</p>
                    </div>
                  </div>

                  <div className="info-section">
                    <h3>Payment Information</h3>
                    <div className="info-item">
                      <span className="label">Payment Method:</span>
                      <span className="value">{selectedOrder.paymentMethod || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Payment Status:</span>
                      <span className="status-badge delivered">Paid</span>
                    </div>
                  </div>
                </div>

                <div className="order-items-section">
                  <h3>Order Items</h3>
                  <div className="items-list">
                    {selectedOrder.build && (
                      <div className="build-item">
                        <div className="item-icon">🏗️</div>
                        <div className="item-details">
                          <div className="item-name">{selectedOrder.build.name}</div>
                          <div className="item-description">Custom PC Build</div>
                        </div>
                        <div className="item-price">${selectedOrder.totalAmount?.toFixed(2)}</div>
                      </div>
                    )}
                    
                    {selectedOrder.components && Object.keys(selectedOrder.components).length > 0 && (
                      <div className="components-list">
                        <h4>Components ({Object.keys(selectedOrder.components).length} items)</h4>
                        {Object.entries(selectedOrder.components).map(([category, componentId]) => (
                          <div key={category} className="component-item">
                            <div className="component-category">{category}</div>
                            <div className="component-id">ID: {componentId}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="order-timeline">
                  <h3>Order Timeline</h3>
                  <div className="timeline">
                    <div className="timeline-item completed">
                      <div className="timeline-icon">✅</div>
                      <div className="timeline-content">
                        <div className="timeline-title">Order Placed</div>
                        <div className="timeline-date">{new Date(selectedOrder.createdAt).toLocaleString()}</div>
                      </div>
                    </div>
                    
                    {selectedOrder.status !== 'pending' && (
                      <div className="timeline-item completed">
                        <div className="timeline-icon">🔄</div>
                        <div className="timeline-content">
                          <div className="timeline-title">Order Confirmed</div>
                          <div className="timeline-date">{new Date(selectedOrder.updatedAt).toLocaleString()}</div>
                        </div>
                      </div>
                    )}
                    
                    {(selectedOrder.status === 'shipped' || selectedOrder.status === 'delivered') && (
                      <div className="timeline-item completed">
                        <div className="timeline-icon">🚚</div>
                        <div className="timeline-content">
                          <div className="timeline-title">Order Shipped</div>
                          <div className="timeline-date">{new Date(selectedOrder.updatedAt).toLocaleString()}</div>
                        </div>
                      </div>
                    )}
                    
                    {selectedOrder.status === 'delivered' && (
                      <div className="timeline-item completed">
                        <div className="timeline-icon">📦</div>
                        <div className="timeline-content">
                          <div className="timeline-title">Order Delivered</div>
                          <div className="timeline-date">{new Date(selectedOrder.updatedAt).toLocaleString()}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="modal-actions">
                  <button 
                    onClick={() => printOrder(selectedOrder)}
                    className="print-order-btn"
                  >
                    🖨️ Print Invoice
                  </button>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      updateOrderStatus(selectedOrder._id, e.target.value);
                      setSelectedOrder({...selectedOrder, status: e.target.value});
                    }}
                    className={`status-select ${selectedOrder.status}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button onClick={closeOrderModal} className="close-modal-btn">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;