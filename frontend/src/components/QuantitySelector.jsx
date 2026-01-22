const QuantitySelector = ({ quantity, onQuantityChange, maxStock, disabled }) => {
  const handleDecrease = (e) => {
    e.stopPropagation();
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    if (quantity < maxStock) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e) => {
    e.stopPropagation();
    const value = parseInt(e.target.value) || 1;
    if (value >= 1 && value <= maxStock) {
      onQuantityChange(value);
    }
  };

  return (
    <div className="quantity-selector" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={handleDecrease}
        disabled={quantity <= 1 || disabled}
        className="quantity-btn"
      >
        −
      </button>
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min="1"
        max={maxStock}
        disabled={disabled}
        className="quantity-input"
      />
      <button
        type="button"
        onClick={handleIncrease}
        disabled={quantity >= maxStock || disabled}
        className="quantity-btn"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
