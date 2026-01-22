import { useState, useEffect, useRef } from 'react';

const SearchSuggestions = ({ 
  searchTerm, 
  components, 
  onSelect, 
  onClose,
  showSuggestions 
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    if (searchTerm && searchTerm.length > 0) {
      const term = searchTerm.toLowerCase();
      const suggestions = components
        .filter((comp) => {
          return (
            comp.name.toLowerCase().includes(term) ||
            comp.brand.toLowerCase().includes(term) ||
            comp.model.toLowerCase().includes(term) ||
            comp.category.toLowerCase().includes(term)
          );
        })
        .slice(0, 5); // Top 5 suggestions
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchTerm, components]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSuggestions, onClose]);

  if (!showSuggestions || filteredSuggestions.length === 0) {
    return null;
  }

  return (
    <div ref={suggestionsRef} className="search-suggestions">
      {filteredSuggestions.map((component) => (
        <div
          key={component._id}
          className="suggestion-item"
          onClick={() => onSelect(component)}
        >
          <div className="suggestion-content">
            <div className="suggestion-name">{component.name}</div>
            <div className="suggestion-details">
              <span className="suggestion-category">{component.category}</span>
              <span className="suggestion-brand">{component.brand} {component.model}</span>
              <span className="suggestion-price">${component.price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchSuggestions;
