import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import SearchSuggestions from '../components/SearchSuggestions';
import ComponentDetails from '../components/ComponentDetails';
import ComponentCustomizer from '../components/ComponentCustomizer';
import QuantitySelector from '../components/QuantitySelector';

const CATEGORIES = [
  { name: 'CPU', icon: '🧠', color: '#6366f1' },
  { name: 'GPU', icon: '🎮', color: '#ec4899' },
  { name: 'RAM', icon: '⚡', color: '#10b981' },
  { name: 'Storage', icon: '💾', color: '#f59e0b' },
  { name: 'Motherboard', icon: '🔌', color: '#8b5cf6' },
  { name: 'PSU', icon: '🔋', color: '#ef4444' },
  { name: 'Case', icon: '📦', color: '#06b6d4' },
  { name: 'Cooling', icon: '❄️', color: '#84cc16' }
];

function BuildPage() {
  const [components, setComponents] = useState([]);
  const [selectedComponents, setSelectedComponents] = useState({}); // { category: { id, quantity } }
  const [filterCategory, setFilterCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedComponentDetails, setSelectedComponentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [buildName, setBuildName] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '', combined: '' });
  const [sortBy, setSortBy] = useState('name');
  
  // Enhanced Customization Features
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableCapacities, setAvailableCapacities] = useState([]);
  const [customizationMode, setCustomizationMode] = useState('basic'); // 'basic' or 'advanced'
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [componentToCustomize, setComponentToCustomize] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadComponents();
  }, []);

  // Extract unique brands and capacities when components load
  useEffect(() => {
    if (components.length > 0) {
      // Extract unique brands
      const brands = [...new Set(components.map(comp => comp.brand))].filter(Boolean).sort();
      setAvailableBrands(brands);

      // Extract capacities from RAM and Storage components
      const capacities = new Set();
      components.forEach(comp => {
        if (comp.category === 'RAM' || comp.category === 'Storage') {
          // Extract GB/TB from component name or specs
          const name = comp.name.toLowerCase();
          const specs = comp.specs || {};
          
          // Look for capacity patterns like "8GB", "16GB", "1TB", etc.
          const capacityMatch = name.match(/(\d+)(gb|tb)/i);
          if (capacityMatch) {
            capacities.add(capacityMatch[0].toUpperCase());
          }
          
          // Also check specs for capacity
          if (specs.capacity) {
            capacities.add(specs.capacity);
          }
        }
      });
      
      setAvailableCapacities([...capacities].sort((a, b) => {
        // Sort by numeric value
        const aNum = parseInt(a);
        const bNum = parseInt(b);
        return aNum - bNum;
      }));
    }
  }, [components]);

  const loadComponents = async () => {
    try {
      const res = await apiClient.get('/components');
      console.log('Components loaded:', res.data.length);
      setComponents(res.data || []);
      
      if (!res.data || res.data.length === 0) {
        console.warn('No components found in database. Please seed components.');
      }
    } catch (err) {
      console.error('Failed to load components:', err);
      setComponents([]);
      
      let errorMsg = 'Unknown error';
      let troubleshooting = '';
      
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error' || !err.response) {
        errorMsg = 'Network Error - Cannot connect to backend server';
        troubleshooting = '\n\n🔧 Troubleshooting Steps:\n1. Make sure backend server is running\n   → Open terminal in backend folder\n   → Run: npm run dev\n2. Check if backend is on http://localhost:5000\n3. Verify backend console shows "Server running on port 5000"';
      } else if (err.response?.status === 404) {
        errorMsg = 'API endpoint not found';
        troubleshooting = '\n\nCheck backend routes configuration';
      } else if (err.response?.status === 500) {
        errorMsg = 'Backend server error';
        troubleshooting = '\n\nCheck backend console for error details';
      } else {
        errorMsg = err.response?.data?.message || err.message || 'Unknown error';
        troubleshooting = '\n\nPlease check:\n1. Backend is running (http://localhost:5000)\n2. MongoDB is connected\n3. Components are seeded (run: npm run seed in backend folder)';
      }
      
      alert(`❌ Failed to load components: ${errorMsg}${troubleshooting}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredComponents = components.filter((comp) => {
    // Category filter
    if (filterCategory && comp.category !== filterCategory) return false;
    
    // Brand filter (Enhanced Feature)
    if (selectedBrand && comp.brand !== selectedBrand) return false;
    
    // Capacity filter for RAM/Storage (Enhanced Feature)
    if (selectedCapacity && (comp.category === 'RAM' || comp.category === 'Storage')) {
      const name = comp.name.toLowerCase();
      const specs = comp.specs || {};
      const hasCapacity = name.includes(selectedCapacity.toLowerCase()) || 
                         specs.capacity === selectedCapacity;
      if (!hasCapacity) return false;
    }
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchesSearch = (
        comp.name.toLowerCase().includes(term) ||
        comp.brand.toLowerCase().includes(term) ||
        comp.model.toLowerCase().includes(term)
      );
      if (!matchesSearch) return false;
    }
    
    // Price range filter
    if (priceRange.min && comp.price < parseFloat(priceRange.min)) return false;
    if (priceRange.max && comp.price > parseFloat(priceRange.max)) return false;
    
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'brand':
        return a.brand.localeCompare(b.brand);
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionSelect = (component) => {
    setSelectedComponentDetails(component);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const handleAddToBuild = (component, quantity = 1) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [component.category.toLowerCase()]: {
        id: component._id,
        quantity: quantity,
      },
    }));
    // Show success message
    setTimeout(() => {
      setSelectedComponentDetails(null);
    }, 500);
  };

  const handleQuantityChange = (category, newQuantity) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [category.toLowerCase()]: {
        ...prev[category.toLowerCase()],
        quantity: newQuantity,
      },
    }));
  };

  const selectComponent = (component) => {
    setSelectedComponentDetails(component);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilterCategory('');
    setSelectedBrand('');
    setSelectedCapacity('');
    setPriceRange({ min: '', max: '', combined: '' });
    setSortBy('name');
  };

  const handleCustomizeComponent = (component) => {
    setComponentToCustomize(component);
    setShowCustomizer(true);
  };

  const handleCustomizationComplete = (customizedComponent) => {
    // Add the customized component to the build
    handleAddToBuild(customizedComponent, 1);
    setShowCustomizer(false);
    setComponentToCustomize(null);
  };

  const handleCloseCustomizer = () => {
    setShowCustomizer(false);
    setComponentToCustomize(null);
  };

  const removeComponent = (category) => {
    setSelectedComponents((prev) => {
      const updated = { ...prev };
      delete updated[category.toLowerCase()];
      return updated;
    });
    // Clear details if removed component was selected
    if (selectedComponentDetails && 
        selectedComponentDetails.category.toLowerCase() === category.toLowerCase()) {
      setSelectedComponentDetails(null);
    }
  };

  const calculateTotal = () => {
    return Object.entries(selectedComponents).reduce((sum, [category, data]) => {
      if (!data || !data.id) return sum;
      const component = components.find((c) => c._id === data.id);
      if (!component) return sum;
      const quantity = data.quantity || 1;
      return sum + (component.price || 0) * quantity;
    }, 0);
  };

  const handleSaveBuild = async () => {
    if (Object.keys(selectedComponents).length === 0) {
      alert('Please select at least one component');
      return;
    }

    const finalBuildName = buildName.trim() || 'My Custom Build';

    setSaving(true);
    try {
      const componentsObj = {};
      Object.entries(selectedComponents).forEach(([key, data]) => {
        if (data && typeof data === 'object' && data.id) {
          componentsObj[key] = data.id;
        } else if (typeof data === 'string') {
          componentsObj[key] = data;
        }
      });

      const response = await apiClient.post('/builds', {
        name: finalBuildName,
        components: componentsObj,
      });

      if (response.data) {
        alert('Build saved successfully!');
        // Small delay for better UX
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save build');
    } finally {
      setSaving(false);
    }
  };

  const isComponentSelected = (componentId) => {
    return Object.values(selectedComponents).some(
      (data) => data && (typeof data === 'string' ? data === componentId : data.id === componentId)
    );
  };

  const getComponentQuantity = (category) => {
    const data = selectedComponents[category.toLowerCase()];
    if (!data) return 0;
    return typeof data === 'string' ? 1 : (data.quantity || 1);
  };

  const getComponentId = (category) => {
    const data = selectedComponents[category.toLowerCase()];
    if (!data) return null;
    return typeof data === 'string' ? data : data.id;
  };

  const getBuildProgress = () => {
    const totalCategories = CATEGORIES.length;
    const selectedCount = Object.keys(selectedComponents).length;
    return Math.round((selectedCount / totalCategories) * 100);
  };

  const getCategoryInfo = (categoryName) => {
    return CATEGORIES.find(cat => cat.name === categoryName) || { name: categoryName, icon: '🔧', color: '#6b7280' };
  };

  if (loading) {
    return (
      <div className="build-loading">
        <div className="loading-spinner"></div>
        <h2>Loading Components...</h2>
        <p>Preparing your PC building experience</p>
      </div>
    );
  }

  return (
    <div className="build-page-modern">
      {/* Build Header */}
      <div className="build-header">
        <div className="build-header-content">
          <h1 className="build-title">
            <span className="build-icon">🔧</span>
            Build Your Custom PC
          </h1>
          <p className="build-subtitle">
            Configure your perfect system with real-time compatibility checking
          </p>
          
          {/* Build Progress */}
          <div className="build-progress-section">
            <div className="progress-info">
              <span className="progress-label">Build Progress</span>
              <span className="progress-percentage">{getBuildProgress()}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${getBuildProgress()}%` }}
              ></div>
            </div>
            <div className="progress-text">
              {Object.keys(selectedComponents).length} of {CATEGORIES.length} components selected
            </div>
          </div>
        </div>
      </div>

      <div className="build-container-modern">
        <div className="build-main-modern">
          {/* Build Controls - Exact Layout Match */}
          <div className="build-controls-modern">
            <div className="control-row">
              {/* Build Name - Full Width */}
              <div className="build-name-section">
                <label className="control-label">Build Name</label>
                <input
                  type="text"
                  placeholder="e.g., Gaming Beast, Workstation Pro..."
                  value={buildName}
                  onChange={(e) => setBuildName(e.target.value)}
                  className="build-name-input-modern"
                />
              </div>
              
              {/* Category and Search - Side by Side */}
              <div className="category-search-row">
                <div className="filter-section">
                  <label className="control-label">Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="category-filter-modern"
                  >
                    <option value="">All Categories</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="search-section">
                  <label className="control-label">Search</label>
                  <div className="search-container-modern">
                    <input
                      type="text"
                      placeholder="Search components..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      onFocus={() => setShowSuggestions(searchTerm.length > 0)}
                      className="search-input-modern"
                    />
                    <div className="search-icon">🔍</div>
                    <SearchSuggestions
                      searchTerm={searchTerm}
                      components={components}
                      onSelect={handleSuggestionSelect}
                      onClose={() => setShowSuggestions(false)}
                      showSuggestions={showSuggestions}
                    />
                  </div>
                </div>
              </div>

              {/* Enhanced Brand and Capacity Filters */}
              <div className="enhanced-filters-row">
                <div className="brand-filter-section">
                  <label className="control-label">
                    <span className="filter-icon">🏷️</span>
                    Brand Selection
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="brand-filter-select"
                  >
                    <option value="">All Brands</option>
                    {availableBrands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="capacity-filter-section">
                  <label className="control-label">
                    <span className="filter-icon">💾</span>
                    Capacity (RAM/Storage)
                  </label>
                  <select
                    value={selectedCapacity}
                    onChange={(e) => setSelectedCapacity(e.target.value)}
                    className="capacity-filter-select"
                  >
                    <option value="">All Capacities</option>
                    {availableCapacities.map((capacity) => (
                      <option key={capacity} value={capacity}>
                        {capacity}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="customization-mode-section">
                  <label className="control-label">
                    <span className="filter-icon">⚙️</span>
                    Customization Mode
                  </label>
                  <div className="mode-toggle">
                    <button
                      className={`mode-btn ${customizationMode === 'basic' ? 'active' : ''}`}
                      onClick={() => setCustomizationMode('basic')}
                    >
                      Basic
                    </button>
                    <button
                      className={`mode-btn ${customizationMode === 'advanced' ? 'active' : ''}`}
                      onClick={() => setCustomizationMode('advanced')}
                    >
                      Advanced
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Price Range and Sort By - Side by Side */}
              <div className="price-sort-row">
                <div className="price-section">
                  <label className="control-label">Price Range</label>
                  <input
                    type="text"
                    placeholder="e.g., 100-500 or max 1000"
                    value={priceRange.combined || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPriceRange(prev => ({ ...prev, combined: value }));
                      
                      // Parse the combined input
                      if (value.includes('-')) {
                        const [min, max] = value.split('-').map(v => v.trim());
                        setPriceRange(prev => ({ ...prev, min: min || '', max: max || '' }));
                      } else if (value.toLowerCase().includes('max')) {
                        const max = value.replace(/max/i, '').trim();
                        setPriceRange(prev => ({ ...prev, min: '', max: max || '' }));
                      } else if (value.toLowerCase().includes('min')) {
                        const min = value.replace(/min/i, '').trim();
                        setPriceRange(prev => ({ ...prev, min: min || '', max: '' }));
                      } else if (value && !isNaN(value)) {
                        setPriceRange(prev => ({ ...prev, min: '', max: value }));
                      }
                    }}
                    className="price-range-input"
                  />
                </div>
                
                <div className="sort-section">
                  <label className="control-label">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="name">Name A-Z</option>
                    <option value="brand">Brand A-Z</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Components Grid */}
          <div className="components-section">
            <div className="components-header">
              <h2>Available Components</h2>
              <div className="components-count">
                {filteredComponents.length} components found
              </div>
            </div>
            
            <div className="components-grid-modern">
              {components.length === 0 ? (
                <div className="no-components-modern">
                  <div className="no-components-icon">📦</div>
                  <h3>No Components Found</h3>
                  <p>No components are available in the database.</p>
                  <div className="no-components-help">
                    <p><strong>To fix this:</strong></p>
                    <ol>
                      <li>Make sure backend is running: <code>cd backend && npm run dev</code></li>
                      <li>Seed sample components: <code>cd backend && npm run seed</code></li>
                      <li>Or add components manually from Admin Dashboard</li>
                    </ol>
                    <button 
                      onClick={loadComponents}
                      className="retry-btn-modern"
                    >
                      🔄 Retry Loading Components
                    </button>
                  </div>
                </div>
              ) : filteredComponents.length === 0 ? (
                <div className="no-components-modern">
                  <div className="no-components-icon">🔍</div>
                  <h3>No Matches Found</h3>
                  <p>No components match your search/filter criteria.</p>
                  <button 
                    onClick={clearAllFilters}
                    className="retry-btn-modern"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                filteredComponents.map((component) => {
                  const isSelected = isComponentSelected(component._id);
                  const quantity = isSelected ? getComponentQuantity(component.category) : 1;
                  const categoryInfo = getCategoryInfo(component.category);
                  
                  return (
                    <div
                      key={component._id}
                      className={`component-card-modern ${isSelected ? 'selected' : ''}`}
                      onClick={() => selectComponent(component)}
                    >
                      <div className="component-header">
                        <div 
                          className="component-category-badge"
                          style={{ backgroundColor: `${categoryInfo.color}20`, color: categoryInfo.color }}
                        >
                          <span className="category-icon">{categoryInfo.icon}</span>
                          <span>{component.category}</span>
                        </div>
                        {isSelected && (
                          <div className="selected-badge">
                            <span>✓</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="component-content">
                        <div className="component-image-section">
                          {component.imageUrl ? (
                            <img 
                              src={component.imageUrl} 
                              alt={component.name}
                              className="component-image"
                              onError={(e) => {
                                // Try multiple fallback images
                                const fallbacks = [
                                  `https://dummyimage.com/400x300/${categoryInfo.color.replace('#', '')}/ffffff&text=${encodeURIComponent(categoryInfo.name)}`,
                                  `https://placehold.co/400x300/${categoryInfo.color.replace('#', '')}/ffffff?text=${encodeURIComponent(categoryInfo.name)}`,
                                  'https://dummyimage.com/400x300/374151/9ca3af&text=No+Image'
                                ];
                                
                                const currentSrc = e.target.src;
                                const currentIndex = fallbacks.findIndex(url => currentSrc.includes(url.split('?')[0].split('&')[0]));
                                
                                if (currentIndex < fallbacks.length - 1) {
                                  e.target.src = fallbacks[currentIndex + 1];
                                } else {
                                  // Final fallback - hide image and show icon
                                  e.target.style.display = 'none';
                                  const parent = e.target.parentElement;
                                  if (parent && !parent.querySelector('.component-no-image')) {
                                    const fallbackDiv = document.createElement('div');
                                    fallbackDiv.className = 'component-no-image';
                                    fallbackDiv.innerHTML = `<span class="no-image-icon">${categoryInfo.icon}</span><span class="no-image-text">No Image</span>`;
                                    parent.appendChild(fallbackDiv);
                                  }
                                }
                              }}
                            />
                          ) : (
                            <div className="component-no-image">
                              <span className="no-image-icon">{categoryInfo.icon}</span>
                              <span className="no-image-text">No Image</span>
                            </div>
                          )}
                        </div>
                        
                        <h3 className="component-name">{component.name}</h3>
                        
                        {/* Key Info Section - Always Visible */}
                        <div className="component-key-info">
                          {/* GPU specific fields */}
                          {component.category === 'GPU' && (
                            <>
                              {component.specs?.['Name'] && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Name:</span>
                                  <span className="key-info-value">{component.specs['Name']}</span>
                                </div>
                              )}
                              {component.specs?.['Socket'] && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Socket:</span>
                                  <span className="key-info-value">{component.specs['Socket']}</span>
                                </div>
                              )}
                              {component.specs?.['Stream Processors'] && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Cores:</span>
                                  <span className="key-info-value">{component.specs['Stream Processors']}</span>
                                </div>
                              )}
                            </>
                          )}
                          
                          {/* CPU specific fields */}
                          {component.category === 'CPU' && (
                            <>
                              {component.specs?.['Name'] && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Name:</span>
                                  <span className="key-info-value">{component.specs['Name']}</span>
                                </div>
                              )}
                              {(component.specs?.['Socket'] || component.specs?.['CPU Socket']) && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Socket:</span>
                                  <span className="key-info-value">{component.specs['Socket'] || component.specs['CPU Socket']}</span>
                                </div>
                              )}
                              {component.specs?.['CPU Cores'] && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Cores:</span>
                                  <span className="key-info-value">{component.specs['CPU Cores']}</span>
                                </div>
                              )}
                            </>
                          )}
                          
                          {/* Motherboard specific fields */}
                          {component.category === 'Motherboard' && (
                            <>
                              {component.specs?.['Name'] && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Name:</span>
                                  <span className="key-info-value">{component.specs['Name']}</span>
                                </div>
                              )}
                              {component.specs?.['Cores'] && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Cores:</span>
                                  <span className="key-info-value">{component.specs['Cores']}</span>
                                </div>
                              )}
                              {(component.specs?.['Socket'] || component.specs?.['CPU Socket']) && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Socket:</span>
                                  <span className="key-info-value">{component.specs['Socket'] || component.specs['CPU Socket']}</span>
                                </div>
                              )}
                            </>
                          )}
                          
                          {/* RAM specific fields */}
                          {component.category === 'RAM' && (
                            <>
                              {component.specs?.['Name'] && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Name:</span>
                                  <span className="key-info-value">{component.specs['Name']}</span>
                                </div>
                              )}
                              {(component.specs?.['Socket'] || component.specs?.['Memory Pin'] || component.specs?.['Memory Format'] || component.specs?.['Form Factor']) && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Socket:</span>
                                  <span className="key-info-value">
                                    {component.specs['Socket'] || 
                                     component.specs['Memory Pin'] || 
                                     component.specs['Memory Format'] || 
                                     component.specs['Form Factor'] || 'DIMM'}
                                  </span>
                                </div>
                              )}
                              {(component.specs?.['Memory Size'] || component.specs?.['Capacity'] || component.specs?.['Configuration']) && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Cores:</span>
                                  <span className="key-info-value">
                                    {component.specs['Memory Size'] || 
                                     component.specs['Capacity'] || 
                                     component.specs['Configuration'] || 'N/A'}
                                  </span>
                                </div>
                              )}
                            </>
                          )}
                          
                          {/* Storage specific fields */}
                          {component.category === 'Storage' && (
                            <>
                              {component.specs?.['Name'] && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Name:</span>
                                  <span className="key-info-value">{component.specs['Name']}</span>
                                </div>
                              )}
                              {component.specs?.['Storage Type'] && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Type:</span>
                                  <span className="key-info-value">{component.specs['Storage Type']}</span>
                                </div>
                              )}
                              {component.specs?.['Capacity'] && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Capacity:</span>
                                  <span className="key-info-value">{component.specs['Capacity']}</span>
                                </div>
                              )}
                            </>
                          )}
                          
                          {/* PSU specific fields */}
                          {component.category === 'PSU' && (
                            <>
                              {component.specs?.['Name'] && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Name:</span>
                                  <span className="key-info-value">{component.specs['Name']}</span>
                                </div>
                              )}
                              {(component.specs?.['PCIe Connector'] || component.specs?.['Connectors']) && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Cores:</span>
                                  <span className="key-info-value">{component.specs['PCIe Connector'] || component.specs['Connectors'] || 'N/A'}</span>
                                </div>
                              )}
                              {(component.specs?.['PSU Compatibility'] || component.specs?.['Form Factor'] || component.specs?.['ATX Connector']) && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Socket:</span>
                                  <span className="key-info-value">
                                    {component.specs['PSU Compatibility'] || 
                                     component.specs['Form Factor'] || 
                                     `ATX: ${component.specs['ATX Connector'] || '1'}`}
                                  </span>
                                </div>
                              )}
                            </>
                          )}
                          
                          {/* Case specific fields */}
                          {component.category === 'Case' && (
                            <>
                              {component.specs?.['Name'] && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Name:</span>
                                  <span className="key-info-value">{component.specs['Name']}</span>
                                </div>
                              )}
                              {(component.specs?.['Form Factor'] || component.specs?.['Supported Motherboard'] || component.specs?.['Case Type']) && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Socket:</span>
                                  <span className="key-info-value">
                                    {component.specs['Form Factor'] || 
                                     component.specs['Supported Motherboard'] || 
                                     component.specs['Case Type'] || 'ATX'}
                                  </span>
                                </div>
                              )}
                              {(component.specs?.['Expansion Slots'] || component.specs?.['Drive Bays'] || component.specs?.['Number of Fans']) && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Cores:</span>
                                  <span className="key-info-value">
                                    {component.specs['Expansion Slots'] || 
                                     component.specs['Drive Bays'] || 
                                     component.specs['Number of Fans'] || 'N/A'}
                                  </span>
                                </div>
                              )}
                            </>
                          )}
                          
                          {/* Cooling specific fields */}
                          {component.category === 'Cooling' && (
                            <>
                              {component.specs?.['Name'] && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Name:</span>
                                  <span className="key-info-value">{component.specs['Name']}</span>
                                </div>
                              )}
                              {component.specs?.['Number of Fans'] && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Cores:</span>
                                  <span className="key-info-value">{component.specs['Number of Fans']}</span>
                                </div>
                              )}
                              {(component.specs?.['Socket Support Intel'] || component.specs?.['Socket Support AMD'] || component.specs?.['Socket']) && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Socket:</span>
                                  <span className="key-info-value">
                                    {component.specs['Socket'] || 
                                     `Intel: ${component.specs['Socket Support Intel'] || 'N/A'}, AMD: ${component.specs['Socket Support AMD'] || 'N/A'}`}
                                  </span>
                                </div>
                              )}
                            </>
                          )}
                          
                          {/* Default fallback for other categories */}
                          {!['GPU', 'CPU', 'Motherboard', 'RAM', 'Storage', 'PSU', 'Case', 'Cooling'].includes(component.category) && (
                            <>
                              {component.specs?.['Name'] && (
                                <div className="key-info-item">
                                  <span className="key-info-label">Name:</span>
                                  <span className="key-info-value">{component.specs['Name']}</span>
                                </div>
                              )}
                              {Object.entries(component.specs || {}).slice(1, 4).map(([key, value]) => (
                                <div key={key} className="key-info-item">
                                  <span className="key-info-label">{key}:</span>
                                  <span className="key-info-value">{String(value)}</span>
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                        
                        <div className="component-footer">
                          <div className="component-price-modern">₹{component.price}</div>
                          <div className={`component-stock-modern ${component.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                            {component.stock > 0 ? `${component.stock} in stock` : 'Out of Stock'}
                          </div>
                        </div>

                        {/* Enhanced Customization Buttons */}
                        <div className="component-actions">
                          <button
                            className="quick-add-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToBuild(component, 1);
                            }}
                            disabled={component.stock === 0}
                          >
                            <span className="btn-icon">⚡</span>
                            Quick Add
                          </button>
                          
                          <button
                            className="customize-btn-card"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCustomizeComponent(component);
                            }}
                          >
                            <span className="btn-icon">🎛️</span>
                            Customize
                          </button>
                        </div>
                        
                        {/* Expandable Details Section */}
                        <div className="component-details-toggle">
                          <button 
                            className="details-toggle-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              const detailsSection = e.target.closest('.component-card-modern').querySelector('.component-specs-detailed');
                              const isExpanded = detailsSection.style.display === 'block';
                              detailsSection.style.display = isExpanded ? 'none' : 'block';
                              e.target.textContent = isExpanded ? 'Show Details' : 'Hide Details';
                              e.target.classList.toggle('expanded', !isExpanded);
                            }}
                          >
                            Show Details
                          </button>
                        </div>
                        
                        {/* Detailed Specifications - Hidden by Default */}
                        <div className="component-specs-detailed" style={{ display: 'none' }}>
                          <h4 className="specs-title">Detailed Specifications</h4>
                          <div className="component-specs-modern">
                            {Object.entries(component.specs || {}).map(([key, value]) => (
                              <div key={key} className="spec-item-modern">
                                <span className="spec-key">{key}:</span>
                                <span className="spec-value">{String(value)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {isSelected && (
                          <div className="component-quantity-section-modern">
                            <span className="quantity-label-modern">Quantity:</span>
                            <QuantitySelector
                              quantity={quantity}
                              onQuantityChange={(newQty) => handleQuantityChange(component.category, newQty)}
                              maxStock={component.stock}
                              disabled={component.stock === 0}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Modern Sidebar */}
        <div className="build-sidebar-modern">
          {selectedComponentDetails ? (
            <ComponentDetails
              component={selectedComponentDetails}
              onAddToBuild={handleAddToBuild}
              onClose={() => setSelectedComponentDetails(null)}
              isSelected={isComponentSelected(selectedComponentDetails._id)}
              quantity={getComponentQuantity(selectedComponentDetails.category)}
              onQuantityChange={(newQty) => handleQuantityChange(selectedComponentDetails.category, newQty)}
            />
          ) : (
            <div className="build-summary">
              <div className="summary-header">
                <h2>Build Summary</h2>
                <div className="summary-badge">
                  {Object.keys(selectedComponents).length} components
                </div>
              </div>
              
              {/* Category Checklist */}
              <div className="category-checklist">
                <h3>Component Categories</h3>
                <div className="category-list">
                  {CATEGORIES.map((cat) => {
                    const compId = getComponentId(cat.name);
                    const component = components.find((c) => c._id === compId);
                    const isSelected = !!component;
                    
                    return (
                      <div key={cat.name} className={`category-item ${isSelected ? 'selected' : ''}`}>
                        <div className="category-info">
                          <span className="category-icon" style={{ color: cat.color }}>
                            {cat.icon}
                          </span>
                          <span className="category-name">{cat.name}</span>
                        </div>
                        <div className="category-status">
                          {isSelected ? (
                            <span className="status-selected">✓</span>
                          ) : (
                            <span className="status-pending">○</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Selected Components */}
              <div className="selected-components">
                <h3>Selected Components</h3>
                <div className="selected-list-modern">
                  {CATEGORIES.map((cat) => {
                    const compId = getComponentId(cat.name);
                    const component = components.find((c) => c._id === compId);
                    if (!component) return null;
                    const quantity = getComponentQuantity(cat.name);
                    const itemTotal = (component.price || 0) * quantity;
                    
                    return (
                      <div key={cat.name} className="selected-item-modern">
                        <div 
                          onClick={() => selectComponent(component)} 
                          className="selected-item-content-modern"
                        >
                          <div className="selected-item-header">
                            <span className="selected-category" style={{ color: cat.color }}>
                              {cat.icon} {cat.name}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeComponent(cat.name);
                              }}
                              className="remove-btn-modern"
                            >
                              ×
                            </button>
                          </div>
                          <div className="selected-item-details">
                            <div className="component-name-small">{component.name}</div>
                            <div className="component-price-small">
                              ₹{component.price} × {quantity} = ₹{itemTotal.toFixed(2)}
                            </div>
                          </div>
                          <div className="selected-item-quantity">
                            <QuantitySelector
                              quantity={quantity}
                              onQuantityChange={(newQty) => handleQuantityChange(cat.name, newQty)}
                              maxStock={component.stock}
                              disabled={component.stock === 0}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {Object.keys(selectedComponents).length === 0 && (
                    <div className="empty-selected-modern">
                      <div className="empty-icon">🛒</div>
                      <p>No components selected yet</p>
                      <p className="empty-hint">Click on components to add them to your build</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Build Total */}
              <div className="build-total-section">
                <div className="total-breakdown">
                  <div className="total-row">
                    <span>Subtotal:</span>
                    <span>₹{calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="total-row">
                    <span>Tax (estimated):</span>
                    <span>₹{(calculateTotal() * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="total-divider"></div>
                  <div className="total-row final">
                    <span>Total:</span>
                    <span>₹{(calculateTotal() * 1.1).toFixed(2)}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleSaveBuild}
                  disabled={saving || Object.keys(selectedComponents).length === 0}
                  className="save-build-btn-modern"
                >
                  {saving ? (
                    <>
                      <span className="loading-spinner-small"></span>
                      Saving Build...
                    </>
                  ) : (
                    <>
                      <span>💾</span>
                      Save Build
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Component Customizer Modal */}
      {showCustomizer && componentToCustomize && (
        <ComponentCustomizer
          component={componentToCustomize}
          onCustomize={handleCustomizationComplete}
          onClose={handleCloseCustomizer}
        />
      )}
    </div>
  );
}

export default BuildPage;

