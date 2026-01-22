import { useState, useEffect } from 'react';
import api from '../services/api';
import SearchBar from '../components/SearchBar';

function AdminDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [components, setComponents] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showComponentForm, setShowComponentForm] = useState(false);
  const [editingComponent, setEditingComponent] = useState(null);
  const [componentForm, setComponentForm] = useState({
    category: 'CPU',
    name: '',
    brand: '',
    model: '',
    price: '',
    stock: '',
    tags: '',
    description: '',
    specs: {},
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [ordersRes, componentsRes] = await Promise.all([
        apiClient.get('/orders/admin/all'),
        apiClient.get('/components'),
      ]);
      setOrders(ordersRes.data);
      setComponents(componentsRes.data);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await apiClient.put(`/orders/${orderId}/status`, { status: newStatus });
      loadData();
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  const handleSaveComponent = async (e) => {
    e.preventDefault();
    try {
      const componentData = {
        ...componentForm,
        price: Number(componentForm.price),
        stock: Number(componentForm.stock),
        tags: componentForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
      };

      if (editingComponent) {
        await apiClient.put(`/components/${editingComponent._id}`, componentData);
      } else {
        await apiClient.post('/components', componentData);
      }

      setShowComponentForm(false);
      setEditingComponent(null);
      setComponentForm({
        category: 'CPU',
        name: '',
        brand: '',
        model: '',
        price: '',
        stock: '',
        tags: '',
        description: '',
        specs: {},
      });
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save component');
    }
  };

  const handleEditComponent = (component) => {
    setEditingComponent(component);
    setComponentForm({
      category: component.category,
      name: component.name,
      brand: component.brand,
      model: component.model,
      price: component.price,
      stock: component.stock,
      tags: component.tags.join(', '),
      description: component.description || '',
      specs: component.specs || {},
    });
    setShowComponentForm(true);
  };

  const handleDeleteComponent = async (componentId) => {
    if (!confirm('Are you sure you want to deactivate this component?')) return;
    try {
      await apiClient.delete(`/components/${componentId}`);
      loadData();
    } catch (err) {
      alert('Failed to delete component');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const filteredOrders = orders.filter((order) => {
    if (filterStatus && order.status !== filterStatus) return false;
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      order._id.toLowerCase().includes(term) ||
      order.userId?.name?.toLowerCase().includes(term) ||
      order.userId?.email?.toLowerCase().includes(term) ||
      order.status.toLowerCase().includes(term)
    );
  });

  const filteredComponents = components.filter((component) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      component.name.toLowerCase().includes(term) ||
      component.brand.toLowerCase().includes(term) ||
      component.model.toLowerCase().includes(term) ||
      component.category.toLowerCase().includes(term)
    );
  });

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === 'pending').length,
    totalRevenue: orders
      .filter((o) => o.status === 'completed')
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0),
    totalComponents: components.length,
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Orders</h3>
          <p>{stats.pendingOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>${stats.totalRevenue}</p>
        </div>
        <div className="stat-card">
          <h3>Components</h3>
          <p>{stats.totalComponents}</p>
        </div>
      </div>

      <div className="admin-header">
        <div className="admin-tabs">
          <button
            className={activeTab === 'orders' ? 'active' : ''}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button
            className={activeTab === 'components' ? 'active' : ''}
            onClick={() => setActiveTab('components')}
          >
            Components
          </button>
        </div>
        <div className="admin-filters">
          <SearchBar
            placeholder={`Search ${activeTab}...`}
            onSearch={setSearchTerm}
            className="admin-search"
          />
          {activeTab === 'orders' && (
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="status-filter"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_review">In Review</option>
              <option value="approved">Approved</option>
              <option value="in_progress">In Progress</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          )}
        </div>
      </div>

      {activeTab === 'orders' && (
        <div className="admin-orders">
          {filteredOrders.length === 0 ? (
            <p>{searchTerm || filterStatus ? 'No orders found matching your filters.' : 'No orders yet.'}</p>
          ) : (
            <div className="orders-list">
              {filteredOrders.map((order) => (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <h3>Order #{order._id.slice(-8)}</h3>
                    <span className={`status-badge status-${order.status}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="order-details">
                    <p><strong>User:</strong> {order.userId?.name || 'N/A'} ({order.userId?.email || 'N/A'})</p>
                    <p><strong>Total:</strong> ${order.totalAmount}</p>
                    <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="order-actions">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                      className="status-select"
                    >
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
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'components' && (
        <div className="admin-components">
          <button
            className="primary-btn"
            onClick={() => {
              setEditingComponent(null);
              setComponentForm({
                category: 'CPU',
                name: '',
                brand: '',
                model: '',
                price: '',
                stock: '',
                tags: '',
                description: '',
                specs: {},
              });
              setShowComponentForm(true);
            }}
            style={{ marginBottom: '20px' }}
          >
            Add New Component
          </button>

          {showComponentForm && (
            <form className="component-form" onSubmit={handleSaveComponent}>
              <h3>{editingComponent ? 'Edit Component' : 'Add Component'}</h3>
              <select
                value={componentForm.category}
                onChange={(e) => setComponentForm({ ...componentForm, category: e.target.value })}
                required
              >
                <option value="CPU">CPU</option>
                <option value="GPU">GPU</option>
                <option value="RAM">RAM</option>
                <option value="Storage">Storage</option>
                <option value="Motherboard">Motherboard</option>
                <option value="PSU">PSU</option>
                <option value="Case">Case</option>
                <option value="Cooling">Cooling</option>
                <option value="Extras">Extras</option>
              </select>
              <input
                type="text"
                placeholder="Name"
                value={componentForm.name}
                onChange={(e) => setComponentForm({ ...componentForm, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Brand"
                value={componentForm.brand}
                onChange={(e) => setComponentForm({ ...componentForm, brand: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Model"
                value={componentForm.model}
                onChange={(e) => setComponentForm({ ...componentForm, model: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={componentForm.price}
                onChange={(e) => setComponentForm({ ...componentForm, price: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Stock"
                value={componentForm.stock}
                onChange={(e) => setComponentForm({ ...componentForm, stock: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={componentForm.tags}
                onChange={(e) => setComponentForm({ ...componentForm, tags: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={componentForm.description}
                onChange={(e) => setComponentForm({ ...componentForm, description: e.target.value })}
              />
              <div className="form-actions">
                <button type="submit" className="primary-btn">
                  {editingComponent ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowComponentForm(false);
                    setEditingComponent(null);
                  }}
                  className="secondary-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="components-grid">
            {filteredComponents.length === 0 ? (
              <p>{searchTerm ? 'No components found matching your search.' : 'No components yet.'}</p>
            ) : (
              filteredComponents.map((component) => (
              <div key={component._id} className="component-card">
                <div className="component-category">{component.category}</div>
                <h3>{component.name}</h3>
                <p>{component.brand} {component.model}</p>
                <p><strong>Price:</strong> ${component.price}</p>
                <p><strong>Stock:</strong> {component.stock}</p>
                <div className="component-actions">
                  <button
                    onClick={() => handleEditComponent(component)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteComponent(component._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboardPage;

