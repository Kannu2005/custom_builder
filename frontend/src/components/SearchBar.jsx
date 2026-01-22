import { useState } from 'react';

const SearchBar = ({ placeholder = 'Search...', onSearch, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`search-bar-container ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        className="search-bar-input"
      />
      <span className="search-icon">🔍</span>
    </div>
  );
};

export default SearchBar;
