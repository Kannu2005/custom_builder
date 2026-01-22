import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import apiClient from '../services/api';
import AutocompleteInput from '../components/AutocompleteInput';
import { indianStates, indianCities, stateWiseCities, countries, internationalCities, countryCodes } from '../data/indianStates';
import PhoneInput from '../components/PhoneInput';
import GooglePayLogo from '../assets/google-pay-logo.svg';
import PhonePeLogo from '../assets/phonepe-logo.svg';
import PaytmLogo from '../assets/paytm-logo.svg';
import UpiLogo from '../assets/upi-logo.svg';

const PAYMENT_METHODS = [
  { value: 'cash_on_delivery', label: 'Cash on Delivery', icon: '💵', description: 'Pay when your order arrives' },
  { value: 'upi', label: 'UPI', icon: '📱', logo: UpiLogo, description: 'Pay using UPI apps', subMethods: ['google_pay', 'phonepe', 'paytm', 'upi_id'] },
  { value: 'google_pay', label: 'Google Pay', icon: '🟢', logo: GooglePayLogo, parent: 'upi', description: 'Quick & secure payments' },
  { value: 'phonepe', label: 'PhonePe', icon: '🔵', logo: PhonePeLogo, parent: 'upi', description: 'Instant UPI payments' },
  { value: 'paytm', label: 'Paytm', icon: '🔷', logo: PaytmLogo, parent: 'upi', description: 'Digital wallet payments' },
  { value: 'upi_id', label: 'Enter UPI ID', icon: '💳', parent: 'upi', description: 'Pay with any UPI ID' },
  { value: 'bank_transfer', label: 'Bank Transfer', icon: '🏦', description: 'Direct bank account transfer' },
  { value: 'card', label: 'Credit/Debit Card', icon: '💳', description: 'Visa, Mastercard, RuPay accepted' },
  { value: 'emi', label: 'EMI (Easy Monthly Installments)', icon: '📅', description: 'Pay in easy monthly installments' },
];

const EMI_BANKS = [
  { name: 'HDFC Bank', tenures: [3, 6, 9, 12, 18, 24], interest: 12 },
  { name: 'ICICI Bank', tenures: [3, 6, 9, 12, 18, 24], interest: 13 },
  { name: 'Axis Bank', tenures: [3, 6, 9, 12, 18], interest: 12.5 },
  { name: 'SBI Bank', tenures: [6, 9, 12, 18, 24], interest: 11.5 },
  { name: 'Kotak Bank', tenures: [3, 6, 9, 12], interest: 13.5 },
];

function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const buildId = location.state?.buildId || new URLSearchParams(location.search).get('buildId');

  const [build, setBuild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    paymentMethod: 'cash_on_delivery',
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India',
      phone: '',
    },
    cardDetails: {
      cardNumber: '',
      cardName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
    },
    emiDetails: {
      bank: '',
      tenure: '',
    },
    upiDetails: {
      upiId: '',
      upiApp: '',
    },
  });

  useEffect(() => {
    if (buildId) {
      loadBuild();
    } else {
      navigate('/dashboard');
    }
  }, [buildId]);

  const loadBuild = async () => {
    try {
      const res = await apiClient.get(`/builds/${buildId}`);
      setBuild(res.data);
    } catch (err) {
      alert('Failed to load build');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('shipping.')) {
      const field = name.split('.')[1];
      
      // Handle country change logic
      if (field === 'country') {
        setFormData((prev) => ({
          ...prev,
          shippingAddress: {
            ...prev.shippingAddress,
            [field]: value,
            // Clear state and city when country changes from India to another country
            ...(value !== 'India' && prev.shippingAddress.country === 'India' ? {
              state: '',
              city: ''
            } : {})
          },
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          shippingAddress: {
            ...prev.shippingAddress,
            [field]: value,
          },
        }));
      }
    } else if (name.startsWith('card.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        cardDetails: {
          ...prev.cardDetails,
          [field]: value,
        },
      }));
    } else if (name.startsWith('emi.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        emiDetails: {
          ...prev.emiDetails,
          [field]: value,
        },
      }));
    } else if (name.startsWith('upi.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        upiDetails: {
          ...prev.upiDetails,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData((prev) => ({
      ...prev,
      cardDetails: {
        ...prev.cardDetails,
        cardNumber: formatted,
      },
    }));
  };

  const calculateEMI = () => {
    if (!build || !formData.emiDetails.bank || !formData.emiDetails.tenure) return null;
    
    const bank = EMI_BANKS.find((b) => b.name === formData.emiDetails.bank);
    if (!bank) return null;

    const principal = build.totalPrice;
    const rate = bank.interest / 100 / 12;
    const months = parseInt(formData.emiDetails.tenure);

    if (months === 0) return null;

    const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;

    return {
      monthlyEMI: emi,
      totalAmount,
      totalInterest,
      tenure: months,
    };
  };

  const validateCardDetails = () => {
    const { cardNumber, cardName, expiryMonth, expiryYear, cvv } = formData.cardDetails;
    
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
      return 'Please enter a valid 16-digit card number';
    }
    if (!cardName || cardName.length < 3) {
      return 'Please enter cardholder name';
    }
    if (!expiryMonth || !expiryYear) {
      return 'Please select expiry date';
    }
    if (!cvv || cvv.length !== 3) {
      return 'Please enter a valid 3-digit CVV';
    }

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const expYear = parseInt(expiryYear);
    const expMonth = parseInt(expiryMonth);

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return 'Card has expired';
    }

    return null;
  };

  const validateShippingAddress = () => {
    const { shippingAddress } = formData;
    const errors = [];
    
    if (!shippingAddress.street) errors.push('Street address is required');
    if (!shippingAddress.city) errors.push('City is required');
    if (!shippingAddress.state) errors.push('State is required');
    if (!shippingAddress.zipCode) errors.push('ZIP code is required');
    if (!shippingAddress.country) errors.push('Country is required');
    if (!shippingAddress.phone) errors.push('Phone number is required');
    
    return errors;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      const errors = validateShippingAddress();
      if (errors.length > 0) {
        alert('Please fill all required fields:\n' + errors.join('\n'));
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const addressErrors = validateShippingAddress();
    if (addressErrors.length > 0) {
      alert('Please fill all shipping address fields');
      return;
    }

    if (formData.paymentMethod === 'card') {
      const cardError = validateCardDetails();
      if (cardError) {
        alert(cardError);
        return;
      }
    }

    if (formData.paymentMethod === 'emi') {
      if (!formData.emiDetails.bank || !formData.emiDetails.tenure) {
        alert('Please select bank and tenure for EMI');
        return;
      }
    }

    if (formData.paymentMethod === 'upi_id') {
      if (!formData.upiDetails.upiId || !formData.upiDetails.upiId.includes('@')) {
        alert('Please enter a valid UPI ID (e.g., yourname@paytm)');
        return;
      }
    }

    setSubmitting(true);
    try {
      const orderData = {
        buildId,
        shippingAddress: formData.shippingAddress,
        paymentMethod: formData.paymentMethod,
      };

      if (formData.paymentMethod === 'card') {
        orderData.cardDetails = {
          last4: formData.cardDetails.cardNumber.slice(-4),
        };
      }

      if (formData.paymentMethod === 'emi') {
        const emiInfo = calculateEMI();
        orderData.emiDetails = {
          ...formData.emiDetails,
          monthlyEMI: emiInfo?.monthlyEMI,
          totalAmount: emiInfo?.totalAmount,
          totalInterest: emiInfo?.totalInterest,
        };
      }

      if (formData.paymentMethod === 'upi_id') {
        orderData.upiDetails = {
          upiId: formData.upiDetails.upiId,
          method: 'upi_id',
        };
      }

      if (['google_pay', 'phonepe', 'paytm'].includes(formData.paymentMethod)) {
        orderData.upiDetails = {
          method: formData.paymentMethod,
        };
      }

      await apiClient.post('/orders', orderData);
      alert('Order placed successfully!');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      cpu: '🧠',
      gpu: '🎮',
      ram: '⚡',
      storage: '💾',
      motherboard: '🔌',
      psu: '🔋',
      case: '📦',
      cooling: '❄️'
    };
    return icons[category.toLowerCase()] || '🔧';
  };

  const selectedBank = EMI_BANKS.find((b) => b.name === formData.emiDetails.bank);
  const emiInfo = calculateEMI();

  if (loading) {
    return (
      <div className="checkout-loading">
        <div className="loading-spinner"></div>
        <h2>Loading Checkout...</h2>
        <p>Preparing your order details</p>
      </div>
    );
  }

  if (!build) {
    return (
      <div className="checkout-error">
        <div className="error-icon">❌</div>
        <h2>Build Not Found</h2>
        <p>The requested build could not be found</p>
        <button onClick={() => navigate('/dashboard')} className="primary-btn-modern">
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page-modern">
      {/* Checkout Header */}
      <div className="checkout-header">
        <button 
          className="back-button-modern"
          onClick={() => navigate('/dashboard')}
          title="Go back to Dashboard"
        >
          <span>←</span>
          <span>Back to Cart</span>
        </button>
        
        <div className="checkout-title-section">
          <h1 className="checkout-title">
            <span className="title-icon">🛒</span>
            Secure Checkout
          </h1>
          <p className="checkout-subtitle">Complete your PC build order</p>
        </div>
        
        <div className="checkout-security">
          <span className="security-badge">
            <span>🔒</span>
            <span>SSL Secured</span>
          </span>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="checkout-progress">
        <div className="progress-container">
          <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
            <div className="step-circle">
              {currentStep > 1 ? '✓' : '1'}
            </div>
            <span className="step-label">Shipping</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
            <div className="step-circle">
              {currentStep > 2 ? '✓' : '2'}
            </div>
            <span className="step-label">Payment</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="step-circle">3</div>
            <span className="step-label">Review</span>
          </div>
        </div>
      </div>

      <div className="checkout-container-modern">
        <div className="checkout-main-modern">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Shipping Address */}
            {currentStep === 1 && (
              <div className="checkout-step">
                <div className="step-header">
                  <h2>
                    <span className="step-icon">📦</span>
                    Shipping Address
                  </h2>
                  <p>Where should we deliver your PC components?</p>
                </div>
                
                <div className="form-section">
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label className="form-label">
                        <span>Street Address</span>
                        <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="shipping.street"
                        value={formData.shippingAddress.street}
                        onChange={handleInputChange}
                        placeholder="House/Flat No., Building Name, Street"
                        className="form-input"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">
                        <span>City</span>
                        <span className="required">*</span>
                      </label>
                      <AutocompleteInput
                        name="shipping.city"
                        value={formData.shippingAddress.city}
                        onChange={handleInputChange}
                        suggestions={
                          formData.shippingAddress.country === 'India' 
                            ? (formData.shippingAddress.state ? 
                                (stateWiseCities[formData.shippingAddress.state] || indianCities) : 
                                indianCities)
                            : internationalCities // Show international cities for other countries
                        }
                        placeholder="Enter city"
                        className="form-input"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">
                        <span>State</span>
                        <span className="required">*</span>
                      </label>
                      <AutocompleteInput
                        name="shipping.state"
                        value={formData.shippingAddress.state}
                        onChange={handleInputChange}
                        suggestions={
                          formData.shippingAddress.country === 'India' 
                            ? indianStates 
                            : [] // For international countries, no state suggestions
                        }
                        placeholder={
                          formData.shippingAddress.country === 'India' 
                            ? "Enter state" 
                            : "Enter state/province"
                        }
                        className="form-input"
                        required
                        onSelect={(selectedState) => {
                          // Clear city when state changes
                          if (formData.shippingAddress.city && 
                              stateWiseCities[selectedState] && 
                              !stateWiseCities[selectedState].includes(formData.shippingAddress.city)) {
                            setFormData(prev => ({
                              ...prev,
                              shippingAddress: {
                                ...prev.shippingAddress,
                                city: ''
                              }
                            }));
                          }
                        }}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">
                        <span>ZIP Code</span>
                        <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="shipping.zipCode"
                        value={formData.shippingAddress.zipCode}
                        onChange={handleInputChange}
                        placeholder="123456"
                        className="form-input"
                        pattern="[0-9]{5,6}"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">
                        <span>Country</span>
                        <span className="required">*</span>
                      </label>
                      <select
                        name="shipping.country"
                        value={formData.shippingAddress.country}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        <option value="">Select Country</option>
                        {countries.map(country => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">
                        <span>Phone Number</span>
                        <span className="required">*</span>
                      </label>
                      <PhoneInput
                        name="shipping.phone"
                        value={formData.shippingAddress.phone}
                        onChange={handleInputChange}
                        countryCodes={countryCodes}
                        placeholder="Enter phone number"
                        className="form-input"
                        required
                        defaultCountryCode={
                          // Auto-select country code based on selected country
                          countryCodes.find(cc => cc.country === formData.shippingAddress.country)?.code || '+1'
                        }
                      />
                    </div>
                  </div>
                </div>
                
                <div className="step-actions">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="next-btn-modern"
                  >
                    <span>Continue to Payment</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <div className="checkout-step">
                <div className="step-header">
                  <h2>
                    <span className="step-icon">💳</span>
                    Payment Method
                  </h2>
                  <p>Choose your preferred payment option</p>
                </div>
                
                <div className="payment-methods-modern">
                  {PAYMENT_METHODS.filter(m => !m.parent).map((method) => (
                    <div key={method.value} className="payment-method-group">
                      <label 
                        className={`payment-option-modern ${
                          formData.paymentMethod === method.value || 
                          (method.subMethods && method.subMethods.some(m => formData.paymentMethod === m)) ? 'selected' : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.value}
                          checked={formData.paymentMethod === method.value || 
                            (method.subMethods && method.subMethods.some(m => formData.paymentMethod === m))}
                          onChange={(e) => {
                            if (method.subMethods) {
                              setFormData(prev => ({ ...prev, paymentMethod: 'google_pay' }));
                            } else {
                              handleInputChange(e);
                            }
                          }}
                        />
                        <div className="payment-option-content">
                          <div className="payment-option-header">
                            <div className="payment-icon-container">
                              {method.logo ? (
                                <img src={method.logo} alt={method.label} className="payment-logo-modern" />
                              ) : (
                                <span className="payment-icon-modern">{method.icon}</span>
                              )}
                            </div>
                            <div className="payment-info">
                              <span className="payment-label-modern">{method.label}</span>
                              <span className="payment-description">{method.description}</span>
                            </div>
                          </div>
                        </div>
                      </label>
                      
                      {method.subMethods && (formData.paymentMethod === method.value || 
                        method.subMethods.some(m => formData.paymentMethod === m)) && (
                        <div className="upi-sub-methods-modern">
                          {PAYMENT_METHODS.filter(m => m.parent === method.value).map((subMethod) => (
                            <label 
                              key={subMethod.value}
                              className={`payment-sub-option ${formData.paymentMethod === subMethod.value ? 'selected' : ''}`}
                            >
                              <input
                                type="radio"
                                name="paymentMethod"
                                value={subMethod.value}
                                checked={formData.paymentMethod === subMethod.value}
                                onChange={handleInputChange}
                              />
                              <div className="sub-option-content">
                                <div className="sub-option-icon">
                                  {subMethod.logo ? (
                                    <img src={subMethod.logo} alt={subMethod.label} className="sub-payment-logo" />
                                  ) : (
                                    <span className="sub-payment-icon">{subMethod.icon}</span>
                                  )}
                                </div>
                                <div className="sub-option-info">
                                  <span className="sub-option-label">{subMethod.label}</span>
                                  <span className="sub-option-description">{subMethod.description}</span>
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Payment Details Forms */}
                {formData.paymentMethod === 'card' && (
                  <div className="payment-details-modern">
                    <h3>Card Details</h3>
                    <div className="card-form">
                      <div className="form-group full-width">
                        <label className="form-label">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardDetails.cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          className="form-input card-input"
                          maxLength="19"
                          required
                        />
                      </div>
                      
                      <div className="form-group full-width">
                        <label className="form-label">Cardholder Name</label>
                        <input
                          type="text"
                          name="card.cardName"
                          value={formData.cardDetails.cardName}
                          onChange={handleInputChange}
                          placeholder="Name as on card"
                          className="form-input"
                          required
                        />
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Expiry Month</label>
                          <select
                            name="card.expiryMonth"
                            value={formData.cardDetails.expiryMonth}
                            onChange={handleInputChange}
                            className="form-select"
                            required
                          >
                            <option value="">Month</option>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                              <option key={month} value={String(month).padStart(2, '0')}>
                                {String(month).padStart(2, '0')}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Expiry Year</label>
                          <select
                            name="card.expiryYear"
                            value={formData.cardDetails.expiryYear}
                            onChange={handleInputChange}
                            className="form-select"
                            required
                          >
                            <option value="">Year</option>
                            {Array.from({ length: 10 }, (_, i) => {
                              const year = new Date().getFullYear() % 100 + i;
                              return (
                                <option key={year} value={String(year).padStart(2, '0')}>
                                  20{String(year).padStart(2, '0')}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">CVV</label>
                          <input
                            type="text"
                            name="card.cvv"
                            value={formData.cardDetails.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="form-input"
                            maxLength="3"
                            pattern="[0-9]{3}"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="security-note">
                        <span className="security-icon">🔒</span>
                        <span>Your card details are secure and encrypted</span>
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'emi' && (
                  <div className="payment-details-modern">
                    <h3>EMI Details</h3>
                    <div className="emi-form">
                      <div className="form-group">
                        <label className="form-label">Select Bank</label>
                        <select
                          name="emi.bank"
                          value={formData.emiDetails.bank}
                          onChange={handleInputChange}
                          className="form-select"
                          required
                        >
                          <option value="">Choose Bank</option>
                          {EMI_BANKS.map((bank) => (
                            <option key={bank.name} value={bank.name}>
                              {bank.name} (Interest: {bank.interest}% p.a.)
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {selectedBank && (
                        <div className="form-group">
                          <label className="form-label">Select Tenure</label>
                          <select
                            name="emi.tenure"
                            value={formData.emiDetails.tenure}
                            onChange={handleInputChange}
                            className="form-select"
                            required
                          >
                            <option value="">Choose Tenure</option>
                            {selectedBank.tenures.map((tenure) => (
                              <option key={tenure} value={tenure}>
                                {tenure} Months
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      
                      {emiInfo && (
                        <div className="emi-summary-modern">
                          <h4>EMI Breakdown</h4>
                          <div className="emi-details-modern">
                            <div className="emi-row-modern">
                              <span>Principal Amount:</span>
                              <span>${build.totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="emi-row-modern">
                              <span>Interest Rate:</span>
                              <span>{selectedBank.interest}% p.a.</span>
                            </div>
                            <div className="emi-row-modern">
                              <span>Tenure:</span>
                              <span>{emiInfo.tenure} Months</span>
                            </div>
                            <div className="emi-row-modern highlight">
                              <span>Monthly EMI:</span>
                              <span>${emiInfo.monthlyEMI.toFixed(2)}</span>
                            </div>
                            <div className="emi-row-modern">
                              <span>Total Interest:</span>
                              <span>${emiInfo.totalInterest.toFixed(2)}</span>
                            </div>
                            <div className="emi-row-modern total">
                              <span>Total Amount:</span>
                              <span>${emiInfo.totalAmount.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'upi_id' && (
                  <div className="payment-details-modern">
                    <h3>Enter UPI ID</h3>
                    <div className="upi-form">
                      <div className="form-group">
                        <label className="form-label">UPI ID</label>
                        <input
                          type="text"
                          name="upi.upiId"
                          value={formData.upiDetails.upiId}
                          onChange={handleInputChange}
                          placeholder="yourname@paytm / yourname@ybl / yourname@okaxis"
                          className="form-input"
                          required
                          pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9]+"
                        />
                        <small className="input-hint">Format: yourname@paytm, yourname@ybl, yourname@okaxis</small>
                      </div>
                      <div className="upi-info-modern">
                        <span className="info-icon">💡</span>
                        <span>After placing order, you'll receive a payment request on your UPI app.</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="step-actions">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="prev-btn-modern"
                  >
                    <span>←</span>
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="next-btn-modern"
                  >
                    <span>Review Order</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Place Order */}
            {currentStep === 3 && (
              <div className="checkout-step">
                <div className="step-header">
                  <h2>
                    <span className="step-icon">✅</span>
                    Review Your Order
                  </h2>
                  <p>Please review your order details before placing</p>
                </div>
                
                <div className="review-sections">
                  <div className="review-section">
                    <h3>Shipping Address</h3>
                    <div className="address-display">
                      <p>{formData.shippingAddress.street}</p>
                      <p>{formData.shippingAddress.city}, {formData.shippingAddress.state} {formData.shippingAddress.zipCode}</p>
                      <p>{formData.shippingAddress.country}</p>
                      <p>Phone: {formData.shippingAddress.phone}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="edit-btn-small"
                    >
                      Edit
                    </button>
                  </div>
                  
                  <div className="review-section">
                    <h3>Payment Method</h3>
                    <div className="payment-display">
                      <div className="selected-payment">
                        {(() => {
                          const method = PAYMENT_METHODS.find(m => m.value === formData.paymentMethod);
                          return (
                            <div className="payment-method-display">
                              {method?.logo ? (
                                <img src={method.logo} alt={method.label} className="payment-logo-small" />
                              ) : (
                                <span className="payment-icon-small">{method?.icon}</span>
                              )}
                              <span>{method?.label}</span>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="edit-btn-small"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                
                <div className="step-actions">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="prev-btn-modern"
                  >
                    <span>←</span>
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="place-order-btn"
                  >
                    {submitting ? (
                      <>
                        <span className="loading-spinner-small"></span>
                        <span>Placing Order...</span>
                      </>
                    ) : (
                      <>
                        <span>🛒</span>
                        <span>Place Order</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="checkout-sidebar-modern">
          <div className="order-summary-modern">
            <div className="summary-header-checkout">
              <h2>Order Summary</h2>
              <div className="build-name-display">{build.name}</div>
            </div>
            
            <div className="summary-components-modern">
              {Object.entries(build.components || {}).map(([key, comp]) => {
                if (!comp || !comp._id) return null;
                return (
                  <div key={key} className="summary-component-modern">
                    <div className="component-info-summary">
                      <span className="component-icon-summary">{getCategoryIcon(key)}</span>
                      <div className="component-details-summary">
                        <span className="component-category-summary">{key.toUpperCase()}</span>
                        <span className="component-name-summary">{comp.name}</span>
                      </div>
                    </div>
                    <span className="component-price-summary">${comp.price || 0}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="summary-calculations-modern">
              <div className="calc-row-modern">
                <span>Subtotal:</span>
                <span>${build.totalPrice}</span>
              </div>
              <div className="calc-row-modern">
                <span>Shipping:</span>
                <span className="free-shipping-text">FREE</span>
              </div>
              <div className="calc-row-modern">
                <span>Tax (10%):</span>
                <span>${(build.totalPrice * 0.1).toFixed(2)}</span>
              </div>
              {emiInfo && (
                <>
                  <div className="calc-row-modern">
                    <span>EMI Interest:</span>
                    <span>${emiInfo.totalInterest.toFixed(2)}</span>
                  </div>
                  <div className="calc-row-modern highlight">
                    <span>Monthly EMI:</span>
                    <span>${emiInfo.monthlyEMI.toFixed(2)}</span>
                  </div>
                </>
              )}
              <div className="calc-divider-modern"></div>
              <div className="calc-row-modern total">
                <span>Total:</span>
                <span>${emiInfo ? emiInfo.totalAmount.toFixed(2) : (build.totalPrice * 1.1).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="delivery-info">
              <div className="delivery-item">
                <span className="delivery-icon">🚚</span>
                <div className="delivery-details">
                  <span className="delivery-title">Free Delivery</span>
                  <span className="delivery-subtitle">5-7 business days</span>
                </div>
              </div>
              <div className="delivery-item">
                <span className="delivery-icon">🔒</span>
                <div className="delivery-details">
                  <span className="delivery-title">Secure Payment</span>
                  <span className="delivery-subtitle">SSL encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
