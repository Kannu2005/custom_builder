import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/api';

const CATEGORIES = ['CPU', 'GPU', 'RAM', 'Storage', 'Motherboard', 'PSU', 'Case', 'Cooling'];

function AdminComponents() {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingComponent, setEditingComponent] = useState(null);
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockComponent, setStockComponent] = useState(null);
  const [stockAction, setStockAction] = useState('in'); // 'in' or 'out'
  const [stockQuantity, setStockQuantity] = useState('');
  const [stockReason, setStockReason] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    warranty: '',
    status: 'active',
    imageUrl: '',
    useImageUrl: false,
    specs: {
      cores: '',
      clockSpeed: '',
      memory: '',
      power: ''
    }
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadComponents();
  }, []);

  // Update image preview when URL changes in URL mode
  useEffect(() => {
    if (formData.useImageUrl && formData.imageUrl) {
      setImagePreview(formData.imageUrl);
      setImageFile(null);
    } else if (!formData.useImageUrl) {
      // If switching to file mode, clear URL preview
      if (!imageFile) {
        setImagePreview('');
      }
    }
  }, [formData.useImageUrl, formData.imageUrl]);

  const loadComponents = async () => {
    try {
      const response = await apiClient.get('/admin/components');
      setComponents(response.data.components || []);
    } catch (error) {
      console.error('Failed to load components:', error);
      if (error.response?.status === 403) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('specs.')) {
      const specKey = name.replace('specs.', '');
      setFormData(prev => ({
        ...prev,
        specs: {
          ...prev.specs,
          [specKey]: value
        }
      }));
    } else {
      setFormData(prev => {
        const newFormData = {
          ...prev,
          [name]: value
        };
        
        // Update image preview when URL changes and we're in URL mode
        if (name === 'imageUrl' && (prev.useImageUrl || newFormData.useImageUrl)) {
          setImagePreview(value);
          setImageFile(null); // Clear file when using URL
        }
        
        return newFormData;
      });
    }
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Clear URL when using file
      setFormData(prev => ({ ...prev, imageUrl: '' }));
    }
  };

  // Handle tab switching for image upload
  const handleImageTabSwitch = (useUrl) => {
    setFormData(prev => ({ ...prev, useImageUrl: useUrl }));
    
    if (useUrl) {
      // Switching to URL tab - clear file and set preview to current URL
      setImageFile(null);
      if (formData.imageUrl) {
        setImagePreview(formData.imageUrl);
      }
    } else {
      // Switching to file tab - clear URL and preview if no file
      setFormData(prev => ({ ...prev, imageUrl: '' }));
      if (!imageFile) {
        setImagePreview('');
      }
    }
  };

  // Upload image to a simple service (using placeholder for now)
  const uploadImage = async (file) => {
    // For now, we'll use a placeholder image service
    // In production, you'd use AWS S3, Cloudinary, or similar
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      // Placeholder - in real implementation, upload to image service
      // For now, we'll use a mock URL
      const mockImageUrl = `https://via.placeholder.com/300x200/6366f1/ffffff?text=${encodeURIComponent(file.name.substring(0, 10))}`;
      return mockImageUrl;
    } catch (error) {
      console.error('Image upload failed:', error);
      return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.imageUrl;
      
      // Upload image if a new file is selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const componentData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        imageUrl: imageUrl
      };

      if (editingComponent) {
        await apiClient.put(`/admin/components/${editingComponent._id}`, componentData);
      } else {
        await apiClient.post('/admin/components', componentData);
      }

      resetForm();
      loadComponents();
      alert(editingComponent ? 'Product updated successfully!' : 'Product added successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save product');
    }
  };

  const handleEdit = (component) => {
    setEditingComponent(component);
    setFormData({
      name: component.name,
      brand: component.brand,
      model: component.model,
      category: component.category,
      price: component.price.toString(),
      stock: component.stock.toString(),
      description: component.description || '',
      warranty: component.warranty?.toString() || '',
      status: component.status || 'active',
      imageUrl: component.imageUrl || '',
      useImageUrl: !!(component.imageUrl && !component.imageUrl.startsWith('blob:')),
      specs: {
        cores: component.specs?.cores || '',
        clockSpeed: component.specs?.clockSpeed || '',
        memory: component.specs?.memory || '',
        power: component.specs?.power || ''
      }
    });
    setImagePreview(component.imageUrl || '');
    setImageFile(null);
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await apiClient.delete(`/admin/components/${id}`);
        loadComponents();
        alert('Product deleted successfully!');
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  // Quick Stock Management
  const handleStockAction = (component, action) => {
    setStockComponent(component);
    setStockAction(action);
    setStockQuantity('');
    setStockReason('');
    setShowStockModal(true);
  };

  const handleStockUpdate = async () => {
    if (!stockQuantity || parseInt(stockQuantity) <= 0) {
      alert('Please enter a valid quantity');
      return;
    }

    try {
      const quantity = parseInt(stockQuantity);
      const newStock = stockAction === 'in' 
        ? stockComponent.stock + quantity 
        : Math.max(0, stockComponent.stock - quantity);

      await apiClient.put(`/admin/components/${stockComponent._id}`, {
        ...stockComponent,
        stock: newStock
      });

      // Log the stock movement (you can enhance this with a proper logging system)
      console.log(`Stock ${stockAction}: ${stockComponent.name} - ${quantity} units. Reason: ${stockReason}`);
      
      setShowStockModal(false);
      loadComponents();
      alert(`Stock ${stockAction === 'in' ? 'added' : 'removed'} successfully!`);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update stock');
    }
  };

  // Quick Status Toggle
  const toggleStatus = async (component) => {
    const newStatus = component.status === 'active' ? 'inactive' : 'active';
    try {
      await apiClient.put(`/admin/components/${component._id}`, {
        ...component,
        status: newStatus
      });
      loadComponents();
      alert(`Product ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update status');
    }
  };

  // Quick Price Update
  const handleQuickPriceUpdate = async (component) => {
    const newPrice = prompt(`Update price for ${component.name}:`, component.price);
    if (newPrice && !isNaN(newPrice) && parseFloat(newPrice) > 0) {
      try {
        await apiClient.put(`/admin/components/${component._id}`, {
          ...component,
          price: parseFloat(newPrice)
        });
        loadComponents();
        alert('Price updated successfully!');
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to update price');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      model: '',
      category: '',
      price: '',
      stock: '',
      description: '',
      warranty: '',
      status: 'active',
      imageUrl: '',
      useImageUrl: false,
      specs: {
        cores: '',
        clockSpeed: '',
        memory: '',
        power: ''
      }
    });
    setEditingComponent(null);
    setShowAddForm(false);
    setImageFile(null);
    setImagePreview('');
  };

  // Filter components
  const filteredComponents = components.filter(component => {
    const matchesCategory = !filterCategory || component.category === filterCategory;
    const matchesStatus = !filterStatus || component.status === filterStatus;
    const matchesSearch = !searchTerm || 
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <h2>Loading Products...</h2>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* Admin Header */}
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
              <span className="admin-icon">🔧</span>
              Product Management
            </h1>
            <p className="admin-subtitle">Manage inventory, stock, and product details</p>
          </div>
          
          <button 
            onClick={() => setShowAddForm(true)}
            className="admin-primary-btn"
          >
            <span>➕</span>
            Add New Product
          </button>
        </div>
      </div>

      <div className="admin-content">
        {/* Enhanced Filters and Search */}
        <div className="admin-filters-enhanced">
          <div className="search-section">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search products by name, brand, or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          
          <div className="filter-section">
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="discontinued">Discontinued</option>
            </select>
            
            <div className="results-count">
              Showing {filteredComponents.length} of {components.length} products
            </div>
          </div>
        </div>

        {/* Stock Management Modal */}
        {showStockModal && (
          <div className="admin-modal-overlay">
            <div className="admin-modal stock-modal">
              <div className="admin-modal-header">
                <h2>
                  {stockAction === 'in' ? '📦 Stock In' : '📤 Stock Out'} - {stockComponent?.name}
                </h2>
                <button onClick={() => setShowStockModal(false)} className="modal-close-btn">×</button>
              </div>
              
              <div className="stock-modal-content">
                <div className="current-stock">
                  <span>Current Stock: </span>
                  <strong>{stockComponent?.stock} units</strong>
                </div>
                
                <div className="form-group">
                  <label>Quantity to {stockAction === 'in' ? 'Add' : 'Remove'} *</label>
                  <input
                    type="number"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    placeholder="Enter quantity"
                    min="1"
                    className="admin-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Reason</label>
                  <select
                    value={stockReason}
                    onChange={(e) => setStockReason(e.target.value)}
                    className="admin-select"
                  >
                    <option value="">Select reason</option>
                    {stockAction === 'in' ? (
                      <>
                        <option value="new_purchase">New Purchase</option>
                        <option value="return">Customer Return</option>
                        <option value="adjustment">Stock Adjustment</option>
                        <option value="transfer">Transfer In</option>
                      </>
                    ) : (
                      <>
                        <option value="sale">Sale</option>
                        <option value="damage">Damaged</option>
                        <option value="return_supplier">Return to Supplier</option>
                        <option value="adjustment">Stock Adjustment</option>
                        <option value="transfer">Transfer Out</option>
                      </>
                    )}
                  </select>
                </div>
                
                <div className="new-stock-preview">
                  New Stock: <strong>
                    {stockQuantity ? 
                      (stockAction === 'in' 
                        ? stockComponent?.stock + parseInt(stockQuantity)
                        : Math.max(0, stockComponent?.stock - parseInt(stockQuantity))
                      ) : stockComponent?.stock
                    } units
                  </strong>
                </div>
                
                <div className="form-actions">
                  <button 
                    onClick={() => setShowStockModal(false)} 
                    className="admin-secondary-btn"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleStockUpdate} 
                    className="admin-primary-btn"
                  >
                    {stockAction === 'in' ? 'Add Stock' : 'Remove Stock'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {showAddForm && (
          <div className="admin-modal-overlay">
            <div className="admin-modal large-modal">
              <div className="admin-modal-header">
                <h2>{editingComponent ? '✏️ Edit Product' : '➕ Add New Product'}</h2>
                <button onClick={resetForm} className="modal-close-btn">×</button>
              </div>
              
              <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Product Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Intel Core i7-13700K"
                      required
                      className="admin-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Brand *</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      placeholder="e.g., Intel, AMD, NVIDIA"
                      required
                      className="admin-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Model *</label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      placeholder="e.g., RTX 4080, Ryzen 7"
                      required
                      className="admin-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="admin-select"
                    >
                      <option value="">Select Category</option>
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Price ($) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="299.99"
                      required
                      min="0"
                      step="0.01"
                      className="admin-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Initial Stock Quantity *</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      placeholder="50"
                      required
                      min="0"
                      className="admin-input"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Product Description</label>
                    <textarea
                      name="description"
                      value={formData.description || ''}
                      onChange={handleInputChange}
                      placeholder="Detailed product description, key features, and specifications..."
                      className="admin-textarea"
                      rows="4"
                    />
                  </div>

                  <div className="form-group">
                    <label>Warranty (months)</label>
                    <input
                      type="number"
                      name="warranty"
                      value={formData.warranty || ''}
                      onChange={handleInputChange}
                      placeholder="24"
                      min="0"
                      className="admin-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Product Status</label>
                    <select
                      name="status"
                      value={formData.status || 'active'}
                      onChange={handleInputChange}
                      className="admin-select"
                    >
                      <option value="active">Active (Available for sale)</option>
                      <option value="inactive">Inactive (Hidden from customers)</option>
                      <option value="discontinued">Discontinued</option>
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label>Product Image</label>
                    <div className="image-upload-section">
                      {/* Image Upload Options */}
                      <div className="image-options">
                        <div className="image-option-tabs">
                          <button
                            type="button"
                            className={`tab-btn ${!formData.useImageUrl ? 'active' : ''}`}
                            onClick={() => handleImageTabSwitch(false)}
                          >
                            📁 Upload File
                          </button>
                          <button
                            type="button"
                            className={`tab-btn ${formData.useImageUrl ? 'active' : ''}`}
                            onClick={() => handleImageTabSwitch(true)}
                          >
                            🔗 Image URL
                          </button>
                        </div>

                        {/* File Upload Option */}
                        {!formData.useImageUrl && (
                          <div className="file-upload-option">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="image-input"
                              id="product-image"
                            />
                            <label htmlFor="product-image" className="image-upload-btn">
                              📷 Choose Image File
                            </label>
                            <div className="upload-note">
                              <small>Recommended: 300x200px, JPG/PNG format, max 2MB</small>
                            </div>
                          </div>
                        )}

                        {/* URL Input Option */}
                        {formData.useImageUrl && (
                          <div className="url-input-option">
                            <input
                              type="url"
                              name="imageUrl"
                              value={formData.imageUrl || ''}
                              onChange={handleInputChange}
                              placeholder="https://example.com/image.jpg"
                              className="admin-input"
                            />
                            <div className="url-note">
                              <small>Enter a direct link to the product image</small>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Image Preview */}
                      {(imagePreview || formData.imageUrl) && (
                        <div className="image-preview">
                          <img 
                            src={imagePreview || formData.imageUrl} 
                            alt="Product preview" 
                            className="preview-img"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/300x200/374151/9ca3af?text=Invalid+Image';
                            }}
                          />
                          <button 
                            type="button" 
                            onClick={() => {
                              setImagePreview('');
                              setImageFile(null);
                              setFormData(prev => ({ ...prev, imageUrl: '' }));
                            }}
                            className="remove-image-btn"
                          >
                            ❌ Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="specs-section">
                  <h3>📋 Technical Specifications</h3>
                  <div className="specs-grid">
                    <div className="form-group">
                      <label>Core/Processing Specs</label>
                      <input
                        type="text"
                        name="specs.cores"
                        value={formData.specs?.cores || ''}
                        onChange={handleInputChange}
                        placeholder="e.g., 8 cores, 16 threads"
                        className="admin-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Clock Speed/Frequency</label>
                      <input
                        type="text"
                        name="specs.clockSpeed"
                        value={formData.specs?.clockSpeed || ''}
                        onChange={handleInputChange}
                        placeholder="e.g., 3.4 GHz base, 5.4 GHz boost"
                        className="admin-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Memory/Storage Capacity</label>
                      <input
                        type="text"
                        name="specs.memory"
                        value={formData.specs?.memory || ''}
                        onChange={handleInputChange}
                        placeholder="e.g., 16GB DDR4, 1TB NVMe SSD"
                        className="admin-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Power Requirements</label>
                      <input
                        type="text"
                        name="specs.power"
                        value={formData.specs?.power || ''}
                        onChange={handleInputChange}
                        placeholder="e.g., 125W TDP, 650W PSU recommended"
                        className="admin-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={resetForm} className="admin-secondary-btn">
                    Cancel
                  </button>
                  <button type="submit" className="admin-primary-btn">
                    {editingComponent ? '💾 Update Product' : '➕ Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Enhanced Components Table */}
        <div className="admin-table-container">
          <div className="table-header">
            <h3>📦 Product Inventory ({filteredComponents.length})</h3>
            <div className="table-actions">
              <button 
                onClick={() => window.print()} 
                className="admin-secondary-btn"
              >
                🖨️ Print Report
              </button>
            </div>
          </div>
          
          <div className="table-wrapper">
            <table className="admin-table enhanced-table">
              <thead>
                <tr>
                  <th>Product Details</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock Status</th>
                  <th>Product Status</th>
                  <th>Last Updated</th>
                  <th>Quick Actions</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {filteredComponents.map((component) => (
                  <tr key={component._id} className={component.stock === 0 ? 'out-of-stock-row' : ''}>
                    <td>
                      <div className="product-info-enhanced">
                        <div className="product-image-container">
                          {component.imageUrl ? (
                            <img 
                              src={component.imageUrl} 
                              alt={component.name}
                              className="product-table-image"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/60x40/374151/9ca3af?text=No+Image';
                              }}
                            />
                          ) : (
                            <div className="no-image-placeholder">
                              📷
                            </div>
                          )}
                        </div>
                        <div className="product-details">
                          <div className="product-name">{component.name}</div>
                          <div className="product-brand">{component.brand} {component.model}</div>
                          {component.description && (
                            <div className="product-description">{component.description.substring(0, 60)}...</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`category-badge ${component.category.toLowerCase()}`}>
                        {component.category}
                      </span>
                    </td>
                    <td className="price-cell">
                      <div className="price-display">
                        <span className="price">${component.price}</span>
                        <button 
                          onClick={() => handleQuickPriceUpdate(component)}
                          className="quick-edit-btn"
                          title="Quick price update"
                        >
                          ✏️
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="stock-info">
                        <span className={`stock-badge ${component.stock > 10 ? 'in-stock' : component.stock > 0 ? 'low-stock' : 'out-of-stock'}`}>
                          {component.stock} units
                        </span>
                        <div className="stock-actions">
                          <button
                            onClick={() => handleStockAction(component, 'in')}
                            className="stock-in-btn"
                            title="Add stock"
                          >
                            ➕
                          </button>
                          <button
                            onClick={() => handleStockAction(component, 'out')}
                            className="stock-out-btn"
                            title="Remove stock"
                            disabled={component.stock === 0}
                          >
                            ➖
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => toggleStatus(component)}
                        className={`status-toggle ${component.status || 'active'}`}
                        title={`Click to ${component.status === 'active' ? 'deactivate' : 'activate'}`}
                      >
                        {component.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
                      </button>
                    </td>
                    <td>{new Date(component.updatedAt || component.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="quick-actions">
                        <button
                          onClick={() => handleEdit(component)}
                          className="quick-action-btn edit"
                          title="Edit product"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => alert(`Product Details:\n\nName: ${component.name}\nBrand: ${component.brand}\nModel: ${component.model}\nPrice: $${component.price}\nStock: ${component.stock}\nStatus: ${component.status}\nDescription: ${component.description || 'N/A'}\nWarranty: ${component.warranty || 'N/A'} months`)}
                          className="quick-action-btn view"
                          title="View details"
                        >
                          👁️
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(component._id)}
                        className="delete-btn-enhanced"
                        title="Delete product"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredComponents.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h3>No Products Found</h3>
              <p>
                {searchTerm || filterCategory || filterStatus 
                  ? 'Try adjusting your filters or search terms'
                  : 'Start by adding your first product to the inventory'
                }
              </p>
              {!searchTerm && !filterCategory && !filterStatus && (
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="admin-primary-btn"
                >
                  ➕ Add First Product
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminComponents;