import { useState, useEffect } from 'react';

function ComponentCustomizer({ component, onCustomize, onClose }) {
  const [selectedSpecs, setSelectedSpecs] = useState({
    capacity: '',
    brand: component.brand,
    basePrice: component.price
  });
  const [customPrice, setCustomPrice] = useState(component.price);
  const [availableOptions, setAvailableOptions] = useState({
    capacities: [],
    brands: []
  });

  // Price multipliers for different capacities/specs
  const priceMultipliers = {
    // RAM Capacities
    'RAM_8GB': 1.0,
    'RAM_16GB': 1.8,
    'RAM_32GB': 3.2,
    'RAM_64GB': 6.0,
    'RAM_128GB': 12.0,
    
    // Storage Capacities
    'STORAGE_256GB': 1.0,
    'STORAGE_512GB': 1.6,
    'STORAGE_1TB': 2.8,
    'STORAGE_2TB': 4.5,
    'STORAGE_4TB': 8.0,
    'STORAGE_8TB': 15.0,
    
    // CPU Cores
    'CPU_4_Core': 1.0,
    'CPU_6_Core': 1.5,
    'CPU_8_Core': 2.2,
    'CPU_12_Core': 3.5,
    'CPU_16_Core': 5.0,
    
    // GPU VRAM
    'GPU_4GB': 1.0,
    'GPU_6GB': 1.4,
    'GPU_8GB': 1.8,
    'GPU_12GB': 2.5,
    'GPU_16GB': 3.2,
    'GPU_24GB': 4.5,
    
    // Motherboard Form Factor
    'MB_Mini-ITX': 1.0,
    'MB_Micro-ATX': 1.2,
    'MB_ATX': 1.5,
    'MB_E-ATX': 2.0,
    
    // PSU Wattage
    'PSU_450W': 1.0,
    'PSU_550W': 1.3,
    'PSU_650W': 1.6,
    'PSU_750W': 2.0,
    'PSU_850W': 2.5,
    'PSU_1000W': 3.2,
    
    // Case Size
    'CASE_Mini-ITX': 1.0,
    'CASE_Micro-ATX': 1.2,
    'CASE_Mid_Tower': 1.5,
    'CASE_Full_Tower': 2.0,
    
    // Cooling Size
    'COOLING_120mm': 1.0,
    'COOLING_140mm': 1.3,
    'COOLING_240mm': 1.8,
    'COOLING_280mm': 2.2,
    'COOLING_360mm': 2.8
  };

  // Brand price adjustments
  const brandPriceAdjustments = {
    // CPU Brands
    'Intel': 1.15,
    'AMD': 1.0,
    
    // GPU Brands
    'NVIDIA': 1.3,
    'ASUS': 1.2,
    'MSI': 1.15,
    'Gigabyte': 1.1,
    'EVGA': 1.25,
    
    // RAM Brands
    'Corsair': 1.2,
    'G.Skill': 1.15,
    'Kingston': 1.0,
    'Crucial': 1.05,
    'TeamGroup': 0.95,
    
    // Storage Brands
    'Samsung': 1.25,
    'Western Digital': 1.1,
    'Seagate': 1.0,
    
    // Motherboard Brands
    'ASRock': 1.0,
    
    // PSU Brands
    'Seasonic': 1.3,
    'Thermaltake': 1.1,
    'Cooler Master': 1.15,
    
    // Case Brands
    'NZXT': 1.2,
    'Fractal Design': 1.25,
    
    // Cooling Brands
    'be quiet!': 1.2,
    'Arctic': 0.9
  };

  useEffect(() => {
    // Generate available options based on component category
    let capacities = [];
    let brands = [];
    
    if (component.category === 'RAM') {
      capacities = ['8GB', '16GB', '32GB', '64GB', '128GB'];
      brands = ['Corsair', 'G.Skill', 'Kingston', 'Crucial', 'TeamGroup'];
    } else if (component.category === 'Storage') {
      capacities = ['256GB', '512GB', '1TB', '2TB', '4TB', '8TB'];
      brands = ['Samsung', 'Western Digital', 'Seagate', 'Crucial', 'Kingston'];
    } else if (component.category === 'CPU') {
      capacities = ['4 Core', '6 Core', '8 Core', '12 Core', '16 Core'];
      brands = ['Intel', 'AMD'];
    } else if (component.category === 'GPU') {
      capacities = ['4GB', '6GB', '8GB', '12GB', '16GB', '24GB'];
      brands = ['NVIDIA', 'AMD', 'ASUS', 'MSI', 'Gigabyte', 'EVGA'];
    } else if (component.category === 'Motherboard') {
      capacities = ['ATX', 'Micro-ATX', 'Mini-ITX', 'E-ATX'];
      brands = ['ASUS', 'MSI', 'Gigabyte', 'ASRock', 'EVGA'];
    } else if (component.category === 'PSU') {
      capacities = ['450W', '550W', '650W', '750W', '850W', '1000W'];
      brands = ['Corsair', 'EVGA', 'Seasonic', 'Thermaltake', 'Cooler Master'];
    } else if (component.category === 'Case') {
      capacities = ['Mid Tower', 'Full Tower', 'Mini-ITX', 'Micro-ATX'];
      brands = ['Corsair', 'NZXT', 'Fractal Design', 'Cooler Master', 'Thermaltake'];
    } else if (component.category === 'Cooling') {
      capacities = ['120mm', '140mm', '240mm', '280mm', '360mm'];
      brands = ['Corsair', 'NZXT', 'Cooler Master', 'be quiet!', 'Arctic'];
    }
    
    setAvailableOptions({ capacities, brands });
    
    // Set default capacity from component name
    const defaultCapacity = capacities.find(cap => 
      component.name.toLowerCase().includes(cap.toLowerCase())
    ) || capacities[0];
    
    setSelectedSpecs(prev => ({ ...prev, capacity: defaultCapacity }));
  }, [component]);

  useEffect(() => {
    // Calculate custom price based on selections
    let newPrice = selectedSpecs.basePrice;
    
    // Create the correct key for price multiplier lookup
    const getMultiplierKey = (category, capacity) => {
      const categoryPrefix = {
        'RAM': 'RAM_',
        'Storage': 'STORAGE_',
        'CPU': 'CPU_',
        'GPU': 'GPU_',
        'Motherboard': 'MB_',
        'PSU': 'PSU_',
        'Case': 'CASE_',
        'Cooling': 'COOLING_'
      };
      
      const prefix = categoryPrefix[category] || '';
      return prefix + capacity.replace(' ', '_');
    };
    
    // Apply capacity multiplier
    if (selectedSpecs.capacity) {
      const multiplierKey = getMultiplierKey(component.category, selectedSpecs.capacity);
      const multiplier = priceMultipliers[multiplierKey] || 1;
      newPrice = selectedSpecs.basePrice * multiplier;
    }
    
    // Apply brand adjustment
    if (selectedSpecs.brand && brandPriceAdjustments[selectedSpecs.brand]) {
      newPrice = newPrice * brandPriceAdjustments[selectedSpecs.brand];
    }
    
    setCustomPrice(Math.round(newPrice));
  }, [selectedSpecs, component.category]);

  const handleSpecChange = (specType, value) => {
    setSelectedSpecs(prev => ({
      ...prev,
      [specType]: value
    }));
  };

  const handleCustomize = () => {
    const customizedComponent = {
      ...component,
      customSpecs: selectedSpecs,
      customPrice: customPrice,
      displayName: `${selectedSpecs.brand} ${component.name.split(' ').slice(1).join(' ')} ${selectedSpecs.capacity}`
    };
    
    onCustomize(customizedComponent);
  };

  const priceDifference = customPrice - component.price;

  return (
    <div className="component-customizer-overlay">
      <div className="component-customizer">
        <div className="customizer-header">
          <h3>🎛️ Customize Your Component</h3>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <div className="component-preview">
          <div className="component-image">
            <img src={component.imageUrl || '/placeholder-component.png'} alt={component.name} />
          </div>
          <div className="component-info">
            <h4>{component.name}</h4>
            <p className="component-category">{component.category}</p>
            <div className="price-comparison">
              <div className="original-price">
                <span className="label">Original Price:</span>
                <span className="price">₹{component.price}</span>
              </div>
              <div className="custom-price">
                <span className="label">Custom Price:</span>
                <span className={`price ${priceDifference > 0 ? 'higher' : priceDifference < 0 ? 'lower' : ''}`}>
                  ₹{customPrice}
                </span>
              </div>
              {priceDifference !== 0 && (
                <div className={`price-difference ${priceDifference > 0 ? 'increase' : 'decrease'}`}>
                  {priceDifference > 0 ? '+' : ''}₹{priceDifference}
                  <span className="percentage">
                    ({priceDifference > 0 ? '+' : ''}{((priceDifference / component.price) * 100).toFixed(1)}%)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="customization-options">
          {availableOptions.capacities.length > 0 && (
            <div className="option-group">
              <label className="option-label">
                <span className="icon">⚙️</span>
                Select Specification
              </label>
              <div className="capacity-options">
                {availableOptions.capacities.map(capacity => (
                  <button
                    key={capacity}
                    className={`capacity-btn ${selectedSpecs.capacity === capacity ? 'selected' : ''}`}
                    onClick={() => handleSpecChange('capacity', capacity)}
                  >
                    <span className="capacity-text">{capacity}</span>
                    <span className="capacity-price">
                      ₹{(() => {
                        const getMultiplierKey = (category, capacity) => {
                          const categoryPrefix = {
                            'RAM': 'RAM_',
                            'Storage': 'STORAGE_',
                            'CPU': 'CPU_',
                            'GPU': 'GPU_',
                            'Motherboard': 'MB_',
                            'PSU': 'PSU_',
                            'Case': 'CASE_',
                            'Cooling': 'COOLING_'
                          };
                          const prefix = categoryPrefix[category] || '';
                          return prefix + capacity.replace(' ', '_');
                        };
                        
                        const multiplierKey = getMultiplierKey(component.category, capacity);
                        const multiplier = priceMultipliers[multiplierKey] || 1;
                        const brandMultiplier = brandPriceAdjustments[selectedSpecs.brand] || 1;
                        return Math.round(selectedSpecs.basePrice * multiplier * brandMultiplier);
                      })()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="option-group">
            <label className="option-label">
              <span className="icon">🏷️</span>
              Select Brand
            </label>
            <div className="brand-options">
              {availableOptions.brands.map(brand => (
                <button
                  key={brand}
                  className={`brand-btn ${selectedSpecs.brand === brand ? 'selected' : ''}`}
                  onClick={() => handleSpecChange('brand', brand)}
                >
                  <span className="brand-text">{brand}</span>
                  <span className="brand-multiplier">
                    {brandPriceAdjustments[brand] ? 
                      `${((brandPriceAdjustments[brand] - 1) * 100).toFixed(0)}%` : 
                      'Standard'
                    }
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="customizer-actions">
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button onClick={handleCustomize} className="customize-btn">
            <span className="btn-icon">✨</span>
            Customize for ₹{customPrice}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComponentCustomizer;