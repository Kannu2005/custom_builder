import { useEffect, useState } from 'react';

function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>📞 Contact Us</h1>
          <p className="contact-subtitle">Get in Touch with Custom PC Builder</p>
          <p className="contact-description">
            We're here to help you with all your custom PC building needs! Whether you have questions about products, 
            need technical support, or want to discuss a custom build, our team is ready to assist you.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-main">
            <div className="contact-form-section">
              <h2>📝 Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category *</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="sales">Sales & Pricing</option>
                      <option value="orders">Order Support</option>
                      <option value="returns">Returns & Refunds</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="complaint">Complaint</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder="Please provide detailed information about your inquiry..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading-spinner"></span>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      📤 Send Message
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="form-message success">
                    ✅ Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="form-message error">
                    ❌ Sorry, there was an error sending your message. Please try again or contact us directly.
                  </div>
                )}
              </form>
            </div>

            <div className="contact-info-section">
              <h2>📍 Contact Information</h2>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">📞</div>
                  <div className="method-details">
                    <h3>Phone Support</h3>
                    <div className="method-info">
                      <p><strong>Customer Support (24/7):</strong></p>
                      <p>📞 +91 1800-123-4567 (Toll-free)</p>
                      <p>📞 +91 120-456-7890 (Direct)</p>
                      <p>📱 +91 98765-43210 (WhatsApp)</p>
                    </div>
                    <div className="method-info">
                      <p><strong>Technical Support:</strong></p>
                      <p>📞 +91 1800-123-4568</p>
                      <p>🕒 Monday-Sunday, 8:00 AM - 10:00 PM IST</p>
                    </div>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">📧</div>
                  <div className="method-details">
                    <h3>Email Support</h3>
                    <div className="method-info">
                      <p><strong>General:</strong> info@custompcbuilder.com</p>
                      <p><strong>Support:</strong> support@custompcbuilder.com</p>
                      <p><strong>Sales:</strong> sales@custompcbuilder.com</p>
                      <p><strong>Technical:</strong> tech@custompcbuilder.com</p>
                      <p><strong>Returns:</strong> returns@custompcbuilder.com</p>
                    </div>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">💬</div>
                  <div className="method-details">
                    <h3>Live Chat</h3>
                    <div className="method-info">
                      <p><strong>Website Chat:</strong> Available 24/7</p>
                      <p><strong>Response Time:</strong> Under 2 minutes</p>
                      <p><strong>Languages:</strong> English, Hindi, Tamil, Telugu, Bengali</p>
                      <p><strong>Features:</strong> Screen sharing, file transfer, video chat</p>
                    </div>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">🏢</div>
                  <div className="method-details">
                    <h3>Corporate Headquarters</h3>
                    <address>
                      Custom PC Builder Pvt. Ltd.<br/>
                      Building No. 123, Tech Park<br/>
                      Sector 62, Noida, Uttar Pradesh 201301<br/>
                      India
                    </address>
                    <p><strong>Landmark:</strong> Near Metro Station, opposite Tech Mall</p>
                    <p><strong>GST Number:</strong> 09ABCDE1234F1Z5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="regional-offices">
            <h2>🏢 Regional Offices</h2>
            
            <div className="offices-grid">
              <div className="office-card">
                <h3>🌆 Mumbai Office</h3>
                <address>
                  Custom PC Builder - Mumbai<br/>
                  Office No. 456, Business Center<br/>
                  Andheri East, Mumbai, Maharashtra 400069
                </address>
                <div className="office-contact">
                  <p>📞 +91 22-2345-6789</p>
                  <p>📧 mumbai@custompcbuilder.com</p>
                  <p>🕒 Monday-Saturday, 10:00 AM - 7:00 PM</p>
                </div>
              </div>

              <div className="office-card">
                <h3>🏙️ Bangalore Office</h3>
                <address>
                  Custom PC Builder - Bangalore<br/>
                  Floor 3, Tech Hub<br/>
                  Electronic City, Bangalore, Karnataka 560100
                </address>
                <div className="office-contact">
                  <p>📞 +91 80-1234-5678</p>
                  <p>📧 bangalore@custompcbuilder.com</p>
                  <p>🕒 Monday-Saturday, 10:00 AM - 7:00 PM</p>
                </div>
              </div>

              <div className="office-card">
                <h3>🌃 Hyderabad Office</h3>
                <address>
                  Custom PC Builder - Hyderabad<br/>
                  Suite 789, IT Tower<br/>
                  HITEC City, Hyderabad, Telangana 500081
                </address>
                <div className="office-contact">
                  <p>📞 +91 40-9876-5432</p>
                  <p>📧 hyderabad@custompcbuilder.com</p>
                  <p>🕒 Monday-Saturday, 10:00 AM - 7:00 PM</p>
                </div>
              </div>

              <div className="office-card">
                <h3>🏘️ Pune Office</h3>
                <address>
                  Custom PC Builder - Pune<br/>
                  Office 321, Business Park<br/>
                  Hinjewadi, Pune, Maharashtra 411057
                </address>
                <div className="office-contact">
                  <p>📞 +91 20-8765-4321</p>
                  <p>📧 pune@custompcbuilder.com</p>
                  <p>🕒 Monday-Saturday, 10:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
          </section>

          <section className="service-centers">
            <h2>🛠️ Service Centers</h2>
            
            <div className="service-regions">
              <div className="service-region">
                <h3>Delhi NCR Region</h3>
                <div className="service-list">
                  <div className="service-item">
                    <strong>Gurgaon:</strong> Sector 29, Gurgaon - +91 124-123-4567
                  </div>
                  <div className="service-item">
                    <strong>Faridabad:</strong> Sector 16, Faridabad - +91 129-234-5678
                  </div>
                  <div className="service-item">
                    <strong>Ghaziabad:</strong> Raj Nagar, Ghaziabad - +91 120-345-6789
                  </div>
                </div>
              </div>

              <div className="service-region">
                <h3>Western Region</h3>
                <div className="service-list">
                  <div className="service-item">
                    <strong>Mumbai:</strong> Andheri West - +91 22-3456-7890
                  </div>
                  <div className="service-item">
                    <strong>Pune:</strong> Kothrud - +91 20-4567-8901
                  </div>
                  <div className="service-item">
                    <strong>Ahmedabad:</strong> Satellite - +91 79-5678-9012
                  </div>
                </div>
              </div>

              <div className="service-region">
                <h3>Southern Region</h3>
                <div className="service-list">
                  <div className="service-item">
                    <strong>Bangalore:</strong> Koramangala - +91 80-6789-0123
                  </div>
                  <div className="service-item">
                    <strong>Chennai:</strong> T. Nagar - +91 44-7890-1234
                  </div>
                  <div className="service-item">
                    <strong>Hyderabad:</strong> Banjara Hills - +91 40-8901-2345
                  </div>
                </div>
              </div>

              <div className="service-region">
                <h3>Eastern Region</h3>
                <div className="service-list">
                  <div className="service-item">
                    <strong>Kolkata:</strong> Salt Lake - +91 33-9012-3456
                  </div>
                  <div className="service-item">
                    <strong>Bhubaneswar:</strong> Patia - +91 674-012-3456
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="response-times">
            <h2>⏱️ Response Times</h2>
            
            <div className="response-grid">
              <div className="response-card">
                <h3>📞 Phone Support</h3>
                <ul>
                  <li><strong>Immediate:</strong> Live agent pickup within 30 seconds</li>
                  <li><strong>Queue Time:</strong> Maximum 2-minute wait during peak hours</li>
                  <li><strong>Callback:</strong> Option to request callback if lines are busy</li>
                </ul>
              </div>

              <div className="response-card">
                <h3>📧 Email Support</h3>
                <ul>
                  <li><strong>Standard:</strong> 4-6 hours during business hours</li>
                  <li><strong>Priority:</strong> 1-2 hours for urgent issues</li>
                  <li><strong>Complex Issues:</strong> 24-48 hours for technical problems</li>
                  <li><strong>Acknowledgment:</strong> Immediate auto-reply confirmation</li>
                </ul>
              </div>

              <div className="response-card">
                <h3>💬 Live Chat</h3>
                <ul>
                  <li><strong>Instant:</strong> Immediate connection during business hours</li>
                  <li><strong>Off-hours:</strong> Automated responses with callback options</li>
                  <li><strong>Queue:</strong> Real-time queue position display</li>
                  <li><strong>Transfer:</strong> Seamless transfer to specialists when needed</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="social-media">
            <h2>📱 Social Media</h2>
            
            <div className="social-grid">
              <div className="social-card">
                <h3>🔗 Follow Us</h3>
                <div className="social-links">
                  <a href="https://facebook.com/CustomPCBuilderIndia" className="social-link facebook">
                    📘 Facebook - @CustomPCBuilderIndia
                  </a>
                  <a href="https://instagram.com/custompcbuilder" className="social-link instagram">
                    📷 Instagram - @custompcbuilder
                  </a>
                  <a href="https://twitter.com/CustomPCIndia" className="social-link twitter">
                    🐦 Twitter - @CustomPCIndia
                  </a>
                  <a href="https://youtube.com/CustomPCBuilderIndia" className="social-link youtube">
                    📺 YouTube - Custom PC Builder India
                  </a>
                  <a href="https://linkedin.com/company/custompcbuilder" className="social-link linkedin">
                    💼 LinkedIn - Custom PC Builder
                  </a>
                </div>
              </div>

              <div className="social-card">
                <h3>📢 Social Media Support</h3>
                <ul>
                  <li><strong>Response Time:</strong> Within 2 hours during business hours</li>
                  <li><strong>Public Queries:</strong> Answered publicly for community benefit</li>
                  <li><strong>Private Issues:</strong> Moved to direct messages for privacy</li>
                  <li><strong>Community:</strong> Active community engagement and support</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="specialized-support">
            <h2>🎯 Specialized Support</h2>
            
            <div className="specialized-grid">
              <div className="specialized-card">
                <h3>🎮 Gaming Support</h3>
                <ul>
                  <li><strong>Gaming Builds:</strong> Specialized support for gaming PCs</li>
                  <li><strong>Performance Tuning:</strong> Game-specific optimization</li>
                  <li><strong>Esports:</strong> Support for professional gaming setups</li>
                  <li><strong>VR Systems:</strong> Virtual reality system support</li>
                </ul>
              </div>

              <div className="specialized-card">
                <h3>💼 Business Support</h3>
                <ul>
                  <li><strong>Enterprise Solutions:</strong> Business and enterprise support</li>
                  <li><strong>Bulk Orders:</strong> Special support for bulk purchases</li>
                  <li><strong>Custom Configurations:</strong> Tailored business solutions</li>
                  <li><strong>Account Management:</strong> Dedicated account managers</li>
                </ul>
              </div>

              <div className="specialized-card">
                <h3>🎓 Educational Support</h3>
                <ul>
                  <li><strong>Student Discounts:</strong> Special pricing for students</li>
                  <li><strong>Educational Institutions:</strong> Support for schools and colleges</li>
                  <li><strong>Research Projects:</strong> Assistance with research computing needs</li>
                  <li><strong>Training Programs:</strong> Educational workshops and training</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div className="contact-footer">
          <div className="quick-contact">
            <h2>🚀 Quick Contact Summary</h2>
            <div className="quick-contact-grid">
              <div className="quick-contact-card immediate">
                <h3>Need immediate help?</h3>
                <ul>
                  <li>📞 +91 1800-123-4567 (24/7 Toll-free)</li>
                  <li>📱 +91 98765-43210 (WhatsApp)</li>
                  <li>📧 support@custompcbuilder.com</li>
                  <li>💬 Live Chat: Available 24/7 on our website</li>
                </ul>
              </div>

              <div className="quick-contact-card specific">
                <h3>For specific needs:</h3>
                <ul>
                  <li>🔧 Technical Issues: tech@custompcbuilder.com</li>
                  <li>📦 Orders & Shipping: orders@custompcbuilder.com</li>
                  <li>🔄 Returns & Refunds: returns@custompcbuilder.com</li>
                  <li>💼 Business Inquiries: sales@custompcbuilder.com</li>
                </ul>
              </div>
            </div>
            
            <div className="footer-message">
              <p><strong>We're here to help you build the perfect PC!</strong> 🖥️✨</p>
              <p><em>Your satisfaction is our priority. Contact us anytime, anywhere.</em></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;