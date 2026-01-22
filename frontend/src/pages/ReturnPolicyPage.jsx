import { useEffect } from 'react';

function ReturnPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page">
      <div className="policy-container">
        <div className="policy-header">
          <h1>🔄 Return Policy</h1>
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
              At Custom PC Builder, we want you to be completely satisfied with your purchase. 
              This Return Policy outlines the terms and conditions for returning products purchased from our platform.
            </p>
          </section>

          <section className="policy-section">
            <h2>Return Eligibility</h2>
            
            <div className="policy-subsection">
              <h3>✅ Eligible for Return</h3>
              <ul>
                <li><strong>Timeframe:</strong> Items can be returned within <strong>30 days</strong> of delivery</li>
                <li><strong>Condition:</strong> Products must be in original, unused condition</li>
                <li><strong>Packaging:</strong> All original packaging, accessories, and documentation must be included</li>
                <li><strong>Components:</strong> Individual PC components and complete builds are eligible</li>
              </ul>
            </div>

            <div className="policy-subsection">
              <h3>❌ Not Eligible for Return</h3>
              <ul>
                <li><strong>Used Products:</strong> Items showing signs of use or wear</li>
                <li><strong>Damaged Packaging:</strong> Products with damaged or missing original packaging</li>
                <li><strong>Custom Builds:</strong> Fully assembled custom PCs (unless defective)</li>
                <li><strong>Software:</strong> Downloaded software or digital products</li>
                <li><strong>Gift Cards:</strong> Non-refundable digital gift cards</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>Return Process</h2>
            
            <div className="process-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Initiate Return Request</h3>
                  <ul>
                    <li>Log into your account on our website</li>
                    <li>Go to "My Orders" section</li>
                    <li>Select the order containing items to return</li>
                    <li>Click "Request Return" and select items</li>
                    <li>Choose return reason from dropdown menu</li>
                    <li>Submit return request</li>
                  </ul>
                </div>
              </div>

              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Return Authorization</h3>
                  <ul>
                    <li>You'll receive a <strong>Return Authorization Number (RAN)</strong> via email within 24 hours</li>
                    <li>Return authorization is valid for <strong>7 days</strong> from issue date</li>
                    <li>Print the prepaid return shipping label provided</li>
                  </ul>
                </div>
              </div>

              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Package and Ship</h3>
                  <ul>
                    <li>Pack items securely in original packaging</li>
                    <li>Include all accessories, manuals, and components</li>
                    <li>Attach the return shipping label to the package</li>
                    <li>Drop off at any authorized shipping location</li>
                  </ul>
                </div>
              </div>

              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Processing</h3>
                  <ul>
                    <li>Returns are processed within <strong>3-5 business days</strong> of receipt</li>
                    <li>Inspection ensures items meet return criteria</li>
                    <li>Refund or replacement processed upon approval</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Return Shipping</h2>
            
            <div className="shipping-info">
              <div className="shipping-card free">
                <h3>🆓 Free Return Shipping</h3>
                <ul>
                  <li><strong>Defective Products:</strong> Free return shipping provided</li>
                  <li><strong>Wrong Item Sent:</strong> We cover all return shipping costs</li>
                  <li><strong>Our Error:</strong> Any mistake on our part includes free returns</li>
                </ul>
              </div>

              <div className="shipping-card paid">
                <h3>💰 Customer Responsibility</h3>
                <ul>
                  <li><strong>Change of Mind:</strong> Customer pays return shipping costs</li>
                  <li><strong>Compatibility Issues:</strong> Return shipping at customer expense</li>
                  <li><strong>Buyer's Remorse:</strong> Customer responsible for return costs</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Refund Process</h2>
            
            <div className="refund-timeline">
              <h3>Refund Timeline</h3>
              <div className="timeline-grid">
                <div className="timeline-item">
                  <strong>Credit/Debit Cards</strong>
                  <span>5-7 business days after processing</span>
                </div>
                <div className="timeline-item">
                  <strong>UPI/Digital Wallets</strong>
                  <span>3-5 business days after processing</span>
                </div>
                <div className="timeline-item">
                  <strong>Net Banking</strong>
                  <span>5-10 business days after processing</span>
                </div>
                <div className="timeline-item">
                  <strong>Cash on Delivery</strong>
                  <span>Bank transfer within 7-10 business days</span>
                </div>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Contact Information</h2>
            
            <div className="contact-grid">
              <div className="contact-card">
                <h3>📞 Return Support</h3>
                <ul>
                  <li><strong>Email:</strong> returns@custompcbuilder.com</li>
                  <li><strong>Phone:</strong> +91 1800-123-4567 (Toll-free)</li>
                  <li><strong>Hours:</strong> Monday-Saturday, 9:00 AM - 8:00 PM IST</li>
                  <li><strong>Live Chat:</strong> Available on website during business hours</li>
                </ul>
              </div>

              <div className="contact-card">
                <h3>📍 Return Address</h3>
                <address>
                  Custom PC Builder - Returns Department<br/>
                  Building No. 123, Tech Park<br/>
                  Sector 62, Noida, Uttar Pradesh 201301<br/>
                  India
                </address>
              </div>
            </div>
          </section>

          <section className="policy-section highlight">
            <h2>Important Notes</h2>
            <div className="important-notes">
              <div className="note-item">
                <h4>Quality Assurance</h4>
                <p>All returned items undergo thorough inspection. Items not meeting return criteria will be returned to customer.</p>
              </div>
              <div className="note-item">
                <h4>Account Standing</h4>
                <p>Excessive returns may result in account review. Fraudulent return attempts will result in account suspension.</p>
              </div>
              <div className="note-item">
                <h4>Policy Updates</h4>
                <p>Return policy may be updated periodically. Customers notified of significant changes via email.</p>
              </div>
            </div>
          </section>
        </div>

        <div className="policy-footer">
          <div className="help-section">
            <h3>Need Help?</h3>
            <p>Contact our customer support team for assistance with returns or any questions about this policy.</p>
            <div className="help-contacts">
              <a href="mailto:support@custompcbuilder.com" className="help-link">
                📧 support@custompcbuilder.com
              </a>
              <a href="tel:+911800123456" className="help-link">
                📞 +91 1800-123-4567
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReturnPolicyPage;