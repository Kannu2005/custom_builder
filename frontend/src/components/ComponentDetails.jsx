import QuantitySelector from './QuantitySelector';
import { useState } from 'react';

const ComponentDetails = ({ component, onAddToBuild, onClose, isSelected, quantity: initialQuantity, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity || 1);
  if (!component) {
    return (
      <div className="component-details-empty">
        <p>Select a component to view details</p>
      </div>
    );
  }

  return (
    <div className="component-details">
      <div className="details-header">
        <h3>{component.name}</h3>
        <button onClick={onClose} className="close-details-btn">×</button>
      </div>
      
      {component.imageUrl && (
        <div className="details-image-section">
          <img 
            src={component.imageUrl} 
            alt={component.name}
            className="details-image"
            onError={(e) => {
              // Try fallback images
              const fallbacks = [
                `https://dummyimage.com/400x300/6366f1/ffffff&text=${encodeURIComponent(component.category)}`,
                `https://placehold.co/400x300/6366f1/ffffff?text=${encodeURIComponent(component.category)}`,
                'https://dummyimage.com/400x300/374151/9ca3af&text=No+Image'
              ];
              
              const currentSrc = e.target.src;
              const currentIndex = fallbacks.findIndex(url => currentSrc.includes(url.split('?')[0].split('&')[0]));
              
              if (currentIndex < fallbacks.length - 1) {
                e.target.src = fallbacks[currentIndex + 1];
              } else {
                e.target.style.display = 'none';
              }
            }}
          />
        </div>
      )}
      
      <div className="details-category">{component.category}</div>
      
      <div className="details-brand">
        <strong>Brand:</strong> {component.brand} {component.model}
      </div>

      <div className="details-price-large">₹{component.price}</div>

      <div className="details-stock">
        <span className={component.stock > 0 ? 'in-stock' : 'out-of-stock'}>
          {component.stock > 0 ? `✓ In Stock (${component.stock} available)` : '✗ Out of Stock'}
        </span>
      </div>

      {component.description && (
        <div className="details-description">
          <strong>Description:</strong>
          <p>{component.description}</p>
        </div>
      )}

      {component.specs && Object.keys(component.specs).length > 0 && (
        <div className="details-specs">
          <strong>Specifications:</strong>
          <div className="specs-grid">
            {Object.entries(component.specs).map(([key, value]) => (
              <div key={key} className="spec-row">
                <span className="spec-key">{key}:</span>
                <span className="spec-value">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {component.tags && component.tags.length > 0 && (
        <div className="details-tags">
          {component.tags.map((tag, idx) => (
            <span key={idx} className="tag-badge">{tag}</span>
          ))}
        </div>
      )}

      <div className="details-actions">
        {!isSelected && (
          <div className="quantity-selector-section">
            <label>Quantity:</label>
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
              maxStock={component.stock}
              disabled={component.stock === 0}
            />
          </div>
        )}
        {isSelected && onQuantityChange && (
          <div className="quantity-selector-section">
            <label>Quantity:</label>
            <QuantitySelector
              quantity={initialQuantity || 1}
              onQuantityChange={onQuantityChange}
              maxStock={component.stock}
              disabled={component.stock === 0}
            />
          </div>
        )}
        <button
          onClick={() => onAddToBuild(component, quantity)}
          disabled={component.stock === 0 || (isSelected && !onQuantityChange)}
          className={`add-to-build-btn ${isSelected ? 'added' : ''}`}
        >
          {isSelected ? '✓ Already Added' : component.stock > 0 ? 'Add to Build' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ComponentDetails;
