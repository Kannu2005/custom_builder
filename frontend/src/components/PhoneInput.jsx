import { useState, useRef, useEffect } from 'react';

const PhoneInput = ({ 
  value, 
  onChange, 
  countryCodes = [], 
  placeholder = "Enter phone number", 
  name, 
  className = '', 
  required = false,
  defaultCountryCode = '+1'
}) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState(defaultCountryCode);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Update country code when defaultCountryCode changes (based on selected country)
  useEffect(() => {
    if (defaultCountryCode && defaultCountryCode !== selectedCountryCode) {
      setSelectedCountryCode(defaultCountryCode);
    }
  }, [defaultCountryCode]);

  // Initialize phone number from value prop
  useEffect(() => {
    if (value) {
      // Extract country code and phone number from full value
      const matchingCode = countryCodes.find(cc => value.startsWith(cc.code));
      if (matchingCode) {
        setSelectedCountryCode(matchingCode.code);
        setPhoneNumber(value.substring(matchingCode.code.length).trim());
      } else {
        setPhoneNumber(value);
      }
    }
  }, [value, countryCodes]);

  // Handle country code selection
  const handleCountryCodeSelect = (countryData) => {
    setSelectedCountryCode(countryData.code);
    setIsDropdownOpen(false);
    
    // Update the full phone number
    const fullNumber = `${countryData.code} ${phoneNumber}`.trim();
    const syntheticEvent = {
      target: {
        name: name,
        value: fullNumber
      }
    };
    onChange(syntheticEvent);
  };

  // Handle phone number input
  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    
    // Update the full phone number
    const fullNumber = `${selectedCountryCode} ${newPhoneNumber}`.trim();
    const syntheticEvent = {
      target: {
        name: name,
        value: fullNumber
      }
    };
    onChange(syntheticEvent);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Find the selected country info
  const selectedCountry = countryCodes.find(cc => cc.code === selectedCountryCode);

  return (
    <div className="phone-input-container">
      <div className="phone-input-wrapper">
        {/* Country Code Selector */}
        <div className="country-code-selector" ref={dropdownRef}>
          <button
            type="button"
            className="country-code-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="country-flag">{selectedCountry?.flag || '🌍'}</span>
            <span className="country-display">{selectedCountry?.abbr || 'XX'} {selectedCountryCode}</span>
            <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
          </button>
          
          {isDropdownOpen && (
            <div className="country-code-dropdown">
              {countryCodes.map((countryData) => (
                <div
                  key={countryData.code}
                  className={`country-code-item ${
                    countryData.code === selectedCountryCode ? 'selected' : ''
                  }`}
                  onClick={() => handleCountryCodeSelect(countryData)}
                >
                  <span className="country-flag">{countryData.flag}</span>
                  <span className="country-name">{countryData.country}</span>
                  <span className="country-code">{countryData.code}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Phone Number Input */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder={placeholder}
          className={`phone-number-input ${className}`}
          required={required}
          autoComplete="tel"
        />
      </div>
    </div>
  );
};

export default PhoneInput;