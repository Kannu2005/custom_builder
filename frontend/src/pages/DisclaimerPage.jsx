import { useEffect } from 'react';

function DisclaimerPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page">
      <div className="policy-container">
        <div className="policy-header">
          <h1>⚠️ Disclaimer</h1>
          <p className="policy-subtitle">Custom PC Builder</p>
          <div className="policy-meta">
            <span>Effective Date: January 22, 2026</span>
            <span>Last Updated: January 22, 2026</span>
          </div>
        </div>

        <div className="policy-content">
          <section className="policy-section">
            <h2>General Disclaimer</h2>
            <p>
              The information provided on Custom PC Builder website and services is for general informational purposes only. 
              While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, 
              express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, 
              products, services, or related graphics contained on the website.
            </p>
          </section>

          <section className="policy-section">
            <h2>Product Information Disclaimer</h2>
            
            <div className="disclaimer-grid">
              <div className="disclaimer-card">
                <h3>📋 Specifications and Compatibility</h3>
                <ul>
                  <li><strong>Product Specifications:</strong> All product specifications are provided by manufacturers and may be subject to change without notice</li>
                  <li><strong>Compatibility:</strong> While we provide compatibility guidance, we cannot guarantee compatibility in all configurations</li>
                  <li><strong>Performance Claims:</strong> Performance benchmarks and claims are based on manufacturer specifications and may vary in real-world usage</li>
                  <li><strong>Images:</strong> Product images are for illustration purposes and may not reflect exact product appearance</li>
                </ul>
              </div>

              <div className="disclaimer-card">
                <h3>💰 Pricing and Availability</h3>
                <ul>
                  <li><strong>Price Changes:</strong> Prices are subject to change without prior notice due to market fluctuations</li>
                  <li><strong>Stock Availability:</strong> Product availability is updated regularly but may not reflect real-time inventory</li>
                  <li><strong>Promotional Offers:</strong> Special offers and discounts are subject to terms and conditions and may expire without notice</li>
                  <li><strong>Currency:</strong> All prices are displayed in Indian Rupees (INR) unless otherwise specified</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Service Limitations</h2>
            
            <div className="service-limitations">
              <div className="limitation-card">
                <h3>🖥️ Custom PC Building</h3>
                <ul>
                  <li><strong>Assembly Services:</strong> PC assembly is performed by trained technicians, but we cannot guarantee against all potential issues</li>
                  <li><strong>Component Selection:</strong> Final responsibility for component compatibility lies with the customer</li>
                  <li><strong>Performance Expectations:</strong> Actual system performance may vary based on usage, software, and environmental factors</li>
                  <li><strong>Modifications:</strong> Any modifications made by customers void our assembly warranty</li>
                </ul>
              </div>

              <div className="limitation-card">
                <h3>🛠️ Technical Support</h3>
                <ul>
                  <li><strong>Best Effort:</strong> Technical support is provided on a best-effort basis</li>
                  <li><strong>Third-party Products:</strong> Support for third-party software and hardware is limited</li>
                  <li><strong>Response Time:</strong> Support response times are estimates and may vary during peak periods</li>
                  <li><strong>Resolution:</strong> We cannot guarantee resolution of all technical issues</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Warranty Limitations</h2>
            
            <div className="warranty-section">
              <div className="warranty-card">
                <h3>🛡️ Product Warranties</h3>
                <ul>
                  <li><strong>Manufacturer Warranty:</strong> Product warranties are provided by manufacturers, not Custom PC Builder</li>
                  <li><strong>Warranty Claims:</strong> Warranty claims must be processed according to manufacturer terms</li>
                  <li><strong>Exclusions:</strong> Warranties do not cover damage due to misuse, accidents, or normal wear and tear</li>
                  <li><strong>International Products:</strong> Warranty terms may vary for international products</li>
                </ul>
              </div>

              <div className="warranty-card">
                <h3>🔧 Service Warranties</h3>
                <ul>
                  <li><strong>Assembly Warranty:</strong> Limited warranty on our assembly services for 90 days</li>
                  <li><strong>Exclusions:</strong> Warranty void if system is modified or damaged by customer</li>
                  <li><strong>Replacement Parts:</strong> Warranty covers labor only; parts covered by manufacturer warranty</li>
                  <li><strong>Limitations:</strong> Warranty limited to repair or replacement at our discretion</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Liability Limitations</h2>
            
            <div className="liability-section">
              <div className="liability-card financial">
                <h3>💸 Financial Liability</h3>
                <ul>
                  <li><strong>Maximum Liability:</strong> Our total liability is limited to the purchase price of the product or service</li>
                  <li><strong>Consequential Damages:</strong> We are not liable for indirect, incidental, or consequential damages</li>
                  <li><strong>Business Losses:</strong> Not liable for loss of profits, data, or business interruption</li>
                  <li><strong>Third-party Claims:</strong> Not responsible for claims arising from third-party products or services</li>
                </ul>
              </div>

              <div className="liability-card risk">
                <h3>⚠️ Use at Your Own Risk</h3>
                <ul>
                  <li><strong>Product Use:</strong> Use of products and services is at your own risk</li>
                  <li><strong>Professional Advice:</strong> Consult professionals for critical applications</li>
                  <li><strong>Backup Data:</strong> Always backup important data before hardware changes</li>
                  <li><strong>Safety Precautions:</strong> Follow all safety guidelines when handling electronic components</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Third-party Content and Links</h2>
            
            <div className="third-party-section">
              <div className="third-party-card">
                <h3>🌐 External Websites</h3>
                <ul>
                  <li><strong>Third-party Links:</strong> Links to external websites are provided for convenience only</li>
                  <li><strong>No Endorsement:</strong> We do not endorse content on external websites</li>
                  <li><strong>External Policies:</strong> Third-party websites have their own terms and privacy policies</li>
                  <li><strong>Availability:</strong> External links may become unavailable without notice</li>
                </ul>
              </div>

              <div className="third-party-card">
                <h3>👥 User-generated Content</h3>
                <ul>
                  <li><strong>Reviews and Comments:</strong> User reviews and comments reflect individual opinions</li>
                  <li><strong>Accuracy:</strong> We do not verify accuracy of user-generated content</li>
                  <li><strong>Moderation:</strong> We reserve the right to moderate or remove inappropriate content</li>
                  <li><strong>Liability:</strong> Users are responsible for their own content and opinions</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Technical Disclaimers</h2>
            
            <div className="technical-disclaimers">
              <div className="technical-card">
                <h3>💻 Website Functionality</h3>
                <ul>
                  <li><strong>Availability:</strong> Website availability is not guaranteed 24/7</li>
                  <li><strong>Technical Issues:</strong> Temporary technical issues may affect website functionality</li>
                  <li><strong>Browser Compatibility:</strong> Website optimized for modern browsers; older browsers may have limited functionality</li>
                  <li><strong>Mobile Experience:</strong> Mobile experience may differ from desktop version</li>
                </ul>
              </div>

              <div className="technical-card">
                <h3>📊 Data Accuracy</h3>
                <ul>
                  <li><strong>Real-time Updates:</strong> Product information and pricing may not be updated in real-time</li>
                  <li><strong>System Errors:</strong> Technical errors may occasionally affect displayed information</li>
                  <li><strong>Verification:</strong> Customers should verify important information before making purchases</li>
                  <li><strong>Corrections:</strong> We reserve the right to correct errors and update information</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Professional Advice Disclaimer</h2>
            
            <div className="advice-disclaimers">
              <div className="advice-card">
                <h3>🔧 Technical Recommendations</h3>
                <ul>
                  <li><strong>General Guidance:</strong> Our recommendations are general in nature</li>
                  <li><strong>Professional Consultation:</strong> Consult qualified professionals for specific technical requirements</li>
                  <li><strong>Critical Applications:</strong> Seek expert advice for mission-critical applications</li>
                  <li><strong>Specialized Needs:</strong> Professional consultation recommended for specialized requirements</li>
                </ul>
              </div>

              <div className="advice-card">
                <h3>💰 Financial Advice</h3>
                <ul>
                  <li><strong>Not Financial Advice:</strong> Product recommendations are not financial advice</li>
                  <li><strong>Budget Considerations:</strong> Consider your budget and financial situation</li>
                  <li><strong>Professional Consultation:</strong> Consult financial advisors for major purchases</li>
                  <li><strong>Payment Options:</strong> Evaluate payment options based on your financial situation</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Environmental and Safety Disclaimers</h2>
            
            <div className="environmental-safety">
              <div className="env-safety-card">
                <h3>🌱 Environmental Impact</h3>
                <ul>
                  <li><strong>E-waste:</strong> Proper disposal of electronic waste is customer responsibility</li>
                  <li><strong>Environmental Compliance:</strong> Products may have environmental compliance requirements</li>
                  <li><strong>Recycling:</strong> Follow local recycling guidelines for electronic components</li>
                  <li><strong>Packaging:</strong> Packaging materials should be disposed of responsibly</li>
                </ul>
              </div>

              <div className="env-safety-card">
                <h3>⚡ Safety Considerations</h3>
                <ul>
                  <li><strong>Electrical Safety:</strong> Follow electrical safety guidelines when installing components</li>
                  <li><strong>Static Electricity:</strong> Use anti-static precautions when handling components</li>
                  <li><strong>Professional Installation:</strong> Consider professional installation for complex systems</li>
                  <li><strong>Safety Standards:</strong> Ensure compliance with local electrical and safety standards</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Legal Disclaimers</h2>
            
            <div className="legal-section">
              <div className="legal-card">
                <h3>⚖️ Jurisdiction</h3>
                <ul>
                  <li><strong>Governing Law:</strong> These disclaimers are governed by Indian law</li>
                  <li><strong>Dispute Resolution:</strong> Disputes subject to jurisdiction of courts in Noida, India</li>
                  <li><strong>Severability:</strong> If any provision is invalid, remaining provisions remain in effect</li>
                  <li><strong>Entire Agreement:</strong> These disclaimers form part of the complete terms of service</li>
                </ul>
              </div>

              <div className="legal-card">
                <h3>📋 Regulatory Compliance</h3>
                <ul>
                  <li><strong>Industry Standards:</strong> We strive to comply with applicable industry standards</li>
                  <li><strong>Regulatory Changes:</strong> Compliance may be affected by changes in regulations</li>
                  <li><strong>Best Practices:</strong> We follow industry best practices but cannot guarantee perfect compliance</li>
                  <li><strong>Updates:</strong> Disclaimers updated to reflect regulatory changes</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Contact Information</h2>
            
            <div className="contact-grid">
              <div className="contact-card">
                <h3>⚖️ Legal Queries</h3>
                <ul>
                  <li><strong>Email:</strong> legal@custompcbuilder.com</li>
                  <li><strong>Phone:</strong> +91 1800-123-4570</li>
                  <li><strong>Address:</strong> Legal Department, Custom PC Builder, Tech Park, Noida</li>
                  <li><strong>Response Time:</strong> 5-7 business days for legal queries</li>
                </ul>
              </div>

              <div className="contact-card">
                <h3>❓ General Disclaimers</h3>
                <ul>
                  <li><strong>Questions:</strong> Contact customer support for general questions</li>
                  <li><strong>Clarifications:</strong> Request clarification on any disclaimer provisions</li>
                  <li><strong>Feedback:</strong> Provide feedback on disclaimer clarity and completeness</li>
                  <li><strong>Suggestions:</strong> Suggest improvements to disclaimer content</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="policy-section highlight">
            <h2>Important Notice</h2>
            <div className="important-notice">
              <p>
                These disclaimers are designed to protect both Custom PC Builder and our customers. 
                Please read carefully and contact us if you have any questions or concerns.
              </p>
              <div className="notice-details">
                <div className="notice-item">
                  <strong>Last Updated:</strong> January 22, 2026
                </div>
                <div className="notice-item">
                  <strong>Next Review:</strong> July 22, 2026
                </div>
                <div className="notice-item">
                  <strong>Contact:</strong> legal@custompcbuilder.com for any legal questions or clarifications
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="policy-footer">
          <div className="help-section">
            <h3>Legal Questions or Clarifications?</h3>
            <p>Contact our legal department for any questions about these disclaimers.</p>
            <div className="help-contacts">
              <a href="mailto:legal@custompcbuilder.com" className="help-link">
                📧 legal@custompcbuilder.com
              </a>
              <a href="tel:+911800123457" className="help-link">
                📞 +91 1800-123-4570
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisclaimerPage;