import { useEffect } from 'react';

function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page">
      <div className="policy-container">
        <div className="policy-header">
          <h1>🔒 Privacy Policy</h1>
          <p className="policy-subtitle">Custom PC Builder</p>
          <div className="policy-meta">
            <span>Effective Date: January 22, 2026</span>
            <span>Last Updated: January 22, 2026</span>
          </div>
        </div>

        <div className="policy-content">
          <section className="policy-section">
            <h2>Overview</h2>
            <p>
              At Custom PC Builder, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, store, and protect your data when you use our website and services.
            </p>
          </section>

          <section className="policy-section">
            <h2>Information We Collect</h2>
            
            <div className="info-collection-grid">
              <div className="info-card">
                <h3>👤 Personal Information</h3>
                <ul>
                  <li><strong>Account Information:</strong> Name, email address, phone number, date of birth</li>
                  <li><strong>Billing Information:</strong> Billing address, payment method details</li>
                  <li><strong>Shipping Information:</strong> Delivery address, contact preferences</li>
                  <li><strong>Identity Verification:</strong> Government ID for high-value purchases</li>
                </ul>
              </div>

              <div className="info-card">
                <h3>💻 Technical Information</h3>
                <ul>
                  <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                  <li><strong>Usage Data:</strong> Pages visited, time spent, click patterns</li>
                  <li><strong>Cookies:</strong> Session cookies, preference cookies, analytics cookies</li>
                  <li><strong>Location Data:</strong> General location based on IP address</li>
                </ul>
              </div>

              <div className="info-card">
                <h3>💳 Transaction Information</h3>
                <ul>
                  <li><strong>Purchase History:</strong> Orders, payments, returns, refunds</li>
                  <li><strong>Build Configurations:</strong> Custom PC builds and component selections</li>
                  <li><strong>Support Interactions:</strong> Customer service communications</li>
                  <li><strong>Reviews and Ratings:</strong> Product reviews and feedback</li>
                </ul>
              </div>

              <div className="info-card">
                <h3>📞 Communication Data</h3>
                <ul>
                  <li><strong>Email Communications:</strong> Marketing emails, order confirmations</li>
                  <li><strong>SMS Messages:</strong> Order updates, delivery notifications</li>
                  <li><strong>Chat Logs:</strong> Customer support chat conversations</li>
                  <li><strong>Phone Calls:</strong> Customer service call recordings (with consent)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>How We Use Your Information</h2>
            
            <div className="usage-categories">
              <div className="usage-card">
                <h3>🛠️ Service Provision</h3>
                <ul>
                  <li><strong>Order Processing:</strong> Fulfill orders and process payments</li>
                  <li><strong>Account Management:</strong> Maintain your account and preferences</li>
                  <li><strong>Customer Support:</strong> Provide technical and customer support</li>
                  <li><strong>Product Recommendations:</strong> Suggest relevant products and builds</li>
                </ul>
              </div>

              <div className="usage-card">
                <h3>📢 Communication</h3>
                <ul>
                  <li><strong>Order Updates:</strong> Shipping notifications and delivery confirmations</li>
                  <li><strong>Marketing Communications:</strong> Promotional offers and product updates</li>
                  <li><strong>Important Notices:</strong> Policy changes and security alerts</li>
                  <li><strong>Customer Surveys:</strong> Feedback requests and satisfaction surveys</li>
                </ul>
              </div>

              <div className="usage-card">
                <h3>📊 Business Operations</h3>
                <ul>
                  <li><strong>Analytics:</strong> Understand user behavior and improve services</li>
                  <li><strong>Security:</strong> Detect and prevent fraud and unauthorized access</li>
                  <li><strong>Legal Compliance:</strong> Meet regulatory and legal requirements</li>
                  <li><strong>Business Intelligence:</strong> Market research and trend analysis</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Information Sharing</h2>
            
            <div className="sharing-section">
              <div className="sharing-card share">
                <h3>🤝 We Share Information With:</h3>
                
                <div className="sharing-category">
                  <h4>Service Providers</h4>
                  <ul>
                    <li><strong>Payment Processors:</strong> Razorpay, Stripe, PayU for payment processing</li>
                    <li><strong>Shipping Partners:</strong> Courier services for order delivery</li>
                    <li><strong>Cloud Services:</strong> AWS, Google Cloud for data storage</li>
                    <li><strong>Analytics Providers:</strong> Google Analytics for website analytics</li>
                  </ul>
                </div>

                <div className="sharing-category">
                  <h4>Business Partners</h4>
                  <ul>
                    <li><strong>Component Manufacturers:</strong> For warranty and support services</li>
                    <li><strong>Technology Partners:</strong> For enhanced service features</li>
                    <li><strong>Marketing Partners:</strong> For promotional campaigns (with consent)</li>
                  </ul>
                </div>

                <div className="sharing-category">
                  <h4>Legal Requirements</h4>
                  <ul>
                    <li><strong>Government Authorities:</strong> When required by law or court order</li>
                    <li><strong>Law Enforcement:</strong> For investigation of illegal activities</li>
                    <li><strong>Regulatory Bodies:</strong> For compliance with industry regulations</li>
                  </ul>
                </div>
              </div>

              <div className="sharing-card no-share">
                <h3>🚫 We Do NOT Share:</h3>
                <ul>
                  <li><strong>Personal Information:</strong> Never sold to third parties for marketing</li>
                  <li><strong>Payment Details:</strong> Credit card information not shared with partners</li>
                  <li><strong>Private Communications:</strong> Personal messages or support conversations</li>
                  <li><strong>Browsing History:</strong> Detailed browsing patterns not shared</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Data Security</h2>
            
            <div className="security-measures">
              <div className="security-card">
                <h3>🛡️ Security Measures</h3>
                <ul>
                  <li><strong>Encryption:</strong> SSL/TLS encryption for all data transmission</li>
                  <li><strong>Secure Storage:</strong> Encrypted databases with access controls</li>
                  <li><strong>Regular Audits:</strong> Security assessments and vulnerability testing</li>
                  <li><strong>Staff Training:</strong> Regular security training for all employees</li>
                </ul>
              </div>

              <div className="security-card">
                <h3>💳 Payment Security</h3>
                <ul>
                  <li><strong>PCI DSS Compliance:</strong> Highest standards for payment data security</li>
                  <li><strong>Tokenization:</strong> Credit card numbers replaced with secure tokens</li>
                  <li><strong>Fraud Detection:</strong> Advanced algorithms to detect suspicious activity</li>
                  <li><strong>Secure Gateways:</strong> Only certified payment processors used</li>
                </ul>
              </div>

              <div className="security-card">
                <h3>🔐 Access Controls</h3>
                <ul>
                  <li><strong>Role-Based Access:</strong> Employees access only necessary information</li>
                  <li><strong>Multi-Factor Authentication:</strong> Additional security for admin accounts</li>
                  <li><strong>Regular Reviews:</strong> Periodic access reviews and updates</li>
                  <li><strong>Audit Logs:</strong> Complete logs of data access and modifications</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Your Rights and Choices</h2>
            
            <div className="rights-grid">
              <div className="rights-card">
                <h3>👁️ Data Access Rights</h3>
                <ul>
                  <li><strong>View Your Data:</strong> Request copy of personal information we hold</li>
                  <li><strong>Data Portability:</strong> Receive your data in machine-readable format</li>
                  <li><strong>Account Dashboard:</strong> Access and view your information online</li>
                  <li><strong>Regular Reports:</strong> Annual data usage reports available</li>
                </ul>
              </div>

              <div className="rights-card">
                <h3>⚙️ Data Control Rights</h3>
                <ul>
                  <li><strong>Update Information:</strong> Modify personal and account information</li>
                  <li><strong>Delete Account:</strong> Request complete account deletion</li>
                  <li><strong>Data Correction:</strong> Fix inaccurate or incomplete information</li>
                  <li><strong>Restrict Processing:</strong> Limit how we use your information</li>
                </ul>
              </div>

              <div className="rights-card">
                <h3>📧 Communication Preferences</h3>
                <ul>
                  <li><strong>Email Unsubscribe:</strong> Opt out of marketing emails anytime</li>
                  <li><strong>SMS Opt-out:</strong> Stop promotional text messages</li>
                  <li><strong>Notification Settings:</strong> Control order and account notifications</li>
                  <li><strong>Marketing Preferences:</strong> Choose types of communications you receive</li>
                </ul>
              </div>

              <div className="rights-card">
                <h3>🍪 Cookie Controls</h3>
                <ul>
                  <li><strong>Browser Settings:</strong> Control cookies through browser preferences</li>
                  <li><strong>Opt-out Tools:</strong> Use our cookie preference center</li>
                  <li><strong>Third-party Cookies:</strong> Manage analytics and advertising cookies</li>
                  <li><strong>Essential Cookies:</strong> Some cookies required for site functionality</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Cookies and Tracking</h2>
            
            <div className="cookies-section">
              <h3>Types of Cookies We Use</h3>
              
              <div className="cookie-types">
                <div className="cookie-card essential">
                  <h4>🔧 Essential Cookies</h4>
                  <ul>
                    <li><strong>Session Management:</strong> Keep you logged in during your visit</li>
                    <li><strong>Shopping Cart:</strong> Remember items in your cart</li>
                    <li><strong>Security:</strong> Protect against fraud and unauthorized access</li>
                    <li><strong>Preferences:</strong> Remember your language and currency settings</li>
                  </ul>
                </div>

                <div className="cookie-card analytics">
                  <h4>📊 Analytics Cookies</h4>
                  <ul>
                    <li><strong>Google Analytics:</strong> Understand how visitors use our website</li>
                    <li><strong>Performance Monitoring:</strong> Track website speed and functionality</li>
                    <li><strong>User Behavior:</strong> Analyze navigation patterns and popular content</li>
                    <li><strong>Conversion Tracking:</strong> Measure effectiveness of marketing campaigns</li>
                  </ul>
                </div>

                <div className="cookie-card marketing">
                  <h4>📢 Marketing Cookies</h4>
                  <ul>
                    <li><strong>Advertising:</strong> Show relevant ads on other websites</li>
                    <li><strong>Social Media:</strong> Enable sharing on social platforms</li>
                    <li><strong>Personalization:</strong> Customize content based on interests</li>
                    <li><strong>Retargeting:</strong> Show ads for products you've viewed</li>
                  </ul>
                </div>
              </div>

              <div className="cookie-management">
                <h3>Managing Cookies</h3>
                <div className="management-options">
                  <div className="management-option">
                    <strong>Browser Controls:</strong> Disable cookies in browser settings
                  </div>
                  <div className="management-option">
                    <strong>Preference Center:</strong> Use our cookie management tool
                  </div>
                  <div className="management-option">
                    <strong>Opt-out Links:</strong> Third-party opt-out options available
                  </div>
                  <div className="management-option">
                    <strong>Mobile Settings:</strong> Control mobile app tracking preferences
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Contact Information</h2>
            
            <div className="contact-grid">
              <div className="contact-card">
                <h3>👨‍💼 Privacy Officer</h3>
                <ul>
                  <li><strong>Email:</strong> privacy@custompcbuilder.com</li>
                  <li><strong>Phone:</strong> +91 1800-123-4569</li>
                  <li><strong>Address:</strong> Privacy Officer, Custom PC Builder, Tech Park, Noida</li>
                  <li><strong>Response Time:</strong> 30 days for privacy-related requests</li>
                </ul>
              </div>

              <div className="contact-card">
                <h3>🛡️ Data Protection Queries</h3>
                <ul>
                  <li><strong>General Questions:</strong> privacy@custompcbuilder.com</li>
                  <li><strong>Data Requests:</strong> datarequests@custompcbuilder.com</li>
                  <li><strong>Security Concerns:</strong> security@custompcbuilder.com</li>
                  <li><strong>Complaints:</strong> complaints@custompcbuilder.com</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="policy-section highlight">
            <h2>Compliance and Certifications</h2>
            
            <div className="compliance-grid">
              <div className="compliance-card">
                <h3>📋 Regulatory Compliance</h3>
                <ul>
                  <li><strong>GDPR:</strong> European General Data Protection Regulation compliance</li>
                  <li><strong>CCPA:</strong> California Consumer Privacy Act compliance</li>
                  <li><strong>Indian IT Act:</strong> Information Technology Act 2000 compliance</li>
                  <li><strong>Industry Standards:</strong> ISO 27001 and SOC 2 Type II certified</li>
                </ul>
              </div>

              <div className="compliance-card">
                <h3>🔍 Regular Audits</h3>
                <ul>
                  <li><strong>Internal Audits:</strong> Quarterly privacy compliance reviews</li>
                  <li><strong>External Audits:</strong> Annual third-party privacy assessments</li>
                  <li><strong>Penetration Testing:</strong> Regular security testing and vulnerability assessments</li>
                  <li><strong>Compliance Monitoring:</strong> Continuous monitoring of privacy practices</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div className="policy-footer">
          <div className="help-section">
            <h3>Questions about Privacy?</h3>
            <p>Contact our Privacy Officer for any privacy-related questions or concerns.</p>
            <div className="help-contacts">
              <a href="mailto:privacy@custompcbuilder.com" className="help-link">
                📧 privacy@custompcbuilder.com
              </a>
              <a href="tel:+911800123456" className="help-link">
                📞 +91 1800-123-4569
              </a>
            </div>
            <p className="response-time">Response Time: Within 30 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;