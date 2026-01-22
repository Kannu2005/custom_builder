import { useEffect } from 'react';

function RefundPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page">
      <div className="policy-container">
        <div className="policy-header">
          <h1>💰 Refund Policy</h1>
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
              This Refund Policy explains when and how refunds are processed for purchases made through Custom PC Builder. 
              We are committed to providing fair and transparent refund procedures for all our customers.
            </p>
          </section>

          <section className="policy-section">
            <h2>Refund Eligibility</h2>
            
            <div className="eligibility-grid">
              <div className="eligibility-card eligible">
                <h3>✅ Eligible for Refund</h3>
                <ul>
                  <li><strong>Product Returns:</strong> Items returned within 30 days in original condition</li>
                  <li><strong>Defective Products:</strong> Manufacturing defects or damage during shipping</li>
                  <li><strong>Wrong Items:</strong> Items that don't match your order</li>
                  <li><strong>Order Cancellation:</strong> Orders cancelled before processing/shipping</li>
                  <li><strong>Payment Issues:</strong> Duplicate charges or payment errors</li>
                </ul>
              </div>

              <div className="eligibility-card not-eligible">
                <h3>❌ Not Eligible for Refund</h3>
                <ul>
                  <li><strong>Used Products:</strong> Items that have been used or installed</li>
                  <li><strong>Damaged by Customer:</strong> Products damaged due to misuse</li>
                  <li><strong>Custom Configurations:</strong> Specially configured items (unless defective)</li>
                  <li><strong>Digital Products:</strong> Software downloads and digital licenses</li>
                  <li><strong>Service Fees:</strong> Assembly, installation, or consultation fees</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Refund Timeline</h2>
            
            <div className="timeline-section">
              <h3>Processing Time</h3>
              <div className="processing-steps">
                <div className="processing-step">
                  <span className="step-time">1-2 days</span>
                  <span className="step-desc">Refund Approval after return inspection</span>
                </div>
                <div className="processing-step">
                  <span className="step-time">3-10 days</span>
                  <span className="step-desc">Payment Processing depending on payment method</span>
                </div>
                <div className="processing-step">
                  <span className="step-time">2-5 days</span>
                  <span className="step-desc">Bank Processing additional time</span>
                </div>
              </div>
            </div>

            <div className="payment-methods-timeline">
              <h3>Payment Method Specific Timeline</h3>
              <div className="payment-grid">
                <div className="payment-method-card">
                  <h4>💳 Credit/Debit Cards</h4>
                  <div className="method-details">
                    <p><strong>Processing Time:</strong> 5-7 business days</p>
                    <p><strong>Bank Dependency:</strong> May take additional 2-3 days</p>
                    <p><strong>Refund Appears:</strong> As credit on your card statement</p>
                  </div>
                </div>

                <div className="payment-method-card">
                  <h4>📱 UPI Payments</h4>
                  <div className="method-details">
                    <p><strong>Processing Time:</strong> 3-5 business days</p>
                    <p><strong>Instant Refunds:</strong> Available for eligible transactions</p>
                    <p><strong>Notification:</strong> SMS/email confirmation sent</p>
                  </div>
                </div>

                <div className="payment-method-card">
                  <h4>🏦 Net Banking</h4>
                  <div className="method-details">
                    <p><strong>Processing Time:</strong> 5-10 business days</p>
                    <p><strong>Bank Transfer:</strong> Direct credit to your account</p>
                    <p><strong>Confirmation:</strong> Bank statement will show credit</p>
                  </div>
                </div>

                <div className="payment-method-card">
                  <h4>📱 Digital Wallets</h4>
                  <div className="method-details">
                    <p><strong>Processing Time:</strong> 3-5 business days</p>
                    <p><strong>Wallet Credit:</strong> Refund credited to original wallet</p>
                    <p><strong>Instant Notification:</strong> Real-time wallet balance update</p>
                  </div>
                </div>

                <div className="payment-method-card">
                  <h4>💵 Cash on Delivery</h4>
                  <div className="method-details">
                    <p><strong>Bank Transfer:</strong> Refund via NEFT/IMPS transfer</p>
                    <p><strong>Processing Time:</strong> 7-10 business days</p>
                    <p><strong>Account Details:</strong> Bank account information required</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Refund Amount Calculation</h2>
            
            <div className="refund-scenarios">
              <div className="scenario-card full-refund">
                <h3>💯 Full Refund Scenarios</h3>
                <ul>
                  <li><strong>Defective Products:</strong> 100% refund including shipping</li>
                  <li><strong>Wrong Item Sent:</strong> Full refund plus return shipping</li>
                  <li><strong>Order Cancellation:</strong> Complete order amount refunded</li>
                </ul>
              </div>

              <div className="scenario-card partial-refund">
                <h3>📊 Partial Refund Scenarios</h3>
                <ul>
                  <li><strong>Return Shipping:</strong> Deducted if customer responsibility</li>
                  <li><strong>Restocking Fee:</strong> Applied to certain opened items</li>
                  <li><strong>Processing Fee:</strong> May apply to special order cancellations</li>
                </ul>
              </div>
            </div>

            <div className="refund-example">
              <h3>Refund Breakdown Example</h3>
              <div className="example-calculation">
                <div className="calc-row">
                  <span>Original Order Amount:</span>
                  <span>₹50,000</span>
                </div>
                <div className="calc-row">
                  <span>Product Price:</span>
                  <span>₹48,000</span>
                </div>
                <div className="calc-row">
                  <span>Shipping Charges:</span>
                  <span>₹2,000</span>
                </div>
                <div className="calc-row deduction">
                  <span>Return Shipping (if customer pays):</span>
                  <span>-₹500</span>
                </div>
                <div className="calc-row total">
                  <span><strong>Refund Amount:</strong></span>
                  <span><strong>₹47,500</strong></span>
                </div>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Refund Process</h2>
            
            <div className="process-flow">
              <div className="flow-step">
                <div className="flow-number">1</div>
                <div className="flow-content">
                  <h4>Return Initiation</h4>
                  <p>Submit return request through your account and receive Return Authorization Number (RAN)</p>
                </div>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <div className="flow-number">2</div>
                <div className="flow-content">
                  <h4>Inspection</h4>
                  <p>Quality check and verification of item condition and completeness</p>
                </div>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <div className="flow-number">3</div>
                <div className="flow-content">
                  <h4>Processing</h4>
                  <p>Refund initiated through original payment method with confirmation</p>
                </div>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <div className="flow-number">4</div>
                <div className="flow-content">
                  <h4>Completion</h4>
                  <p>Bank processing and final confirmation when refund appears</p>
                </div>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Special Refund Cases</h2>
            
            <div className="special-cases">
              <div className="case-card">
                <h3>🚫 Order Cancellation</h3>
                <div className="case-details">
                  <h4>Before Processing</h4>
                  <ul>
                    <li>Full Refund: 100% refund within 24 hours</li>
                    <li>No Fees: No cancellation charges applied</li>
                    <li>Instant Processing: Immediate refund initiation</li>
                  </ul>
                  <h4>After Processing</h4>
                  <ul>
                    <li>Shipping Costs: May be deducted from refund</li>
                    <li>Restocking Fee: Applied if items already picked/packed</li>
                    <li>Timeline: 3-5 business days for processing</li>
                  </ul>
                </div>
              </div>

              <div className="case-card">
                <h3>🔧 Defective Products</h3>
                <div className="case-details">
                  <h4>Manufacturing Defects</h4>
                  <ul>
                    <li>Full Refund: Complete purchase amount</li>
                    <li>Shipping Coverage: Return shipping covered by us</li>
                    <li>Expedited Processing: Priority refund processing</li>
                  </ul>
                  <h4>Damage During Transit</h4>
                  <ul>
                    <li>Insurance Claim: We handle carrier insurance claims</li>
                    <li>Immediate Refund: Don't wait for insurance settlement</li>
                    <li>Full Coverage: 100% refund including all charges</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Refund Tracking</h2>
            
            <div className="tracking-info">
              <div className="tracking-method">
                <h3>💻 Online Tracking</h3>
                <ul>
                  <li><strong>Account Dashboard:</strong> Real-time refund status updates</li>
                  <li><strong>Email Notifications:</strong> Status change notifications</li>
                  <li><strong>SMS Alerts:</strong> Important milestone alerts</li>
                </ul>
              </div>

              <div className="status-definitions">
                <h3>📊 Status Definitions</h3>
                <div className="status-grid">
                  <div className="status-item initiated">
                    <span className="status-badge">Initiated</span>
                    <span>Refund request submitted</span>
                  </div>
                  <div className="status-item processing">
                    <span className="status-badge">Processing</span>
                    <span>Under review and inspection</span>
                  </div>
                  <div className="status-item approved">
                    <span className="status-badge">Approved</span>
                    <span>Refund approved and initiated</span>
                  </div>
                  <div className="status-item completed">
                    <span className="status-badge">Completed</span>
                    <span>Refund processed by payment provider</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Contact Information</h2>
            
            <div className="contact-grid">
              <div className="contact-card">
                <h3>📞 Refund Support Team</h3>
                <ul>
                  <li><strong>Email:</strong> refunds@custompcbuilder.com</li>
                  <li><strong>Phone:</strong> +91 1800-123-4567 (Toll-free)</li>
                  <li><strong>Hours:</strong> Monday-Saturday, 9:00 AM - 8:00 PM IST</li>
                  <li><strong>Live Chat:</strong> Available on website during business hours</li>
                </ul>
              </div>

              <div className="contact-card">
                <h3>📈 Escalation Contact</h3>
                <ul>
                  <li><strong>Email:</strong> escalations@custompcbuilder.com</li>
                  <li><strong>Phone:</strong> +91 1800-123-4568</li>
                  <li><strong>Response Time:</strong> 24-48 hours for escalated issues</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div className="policy-footer">
          <div className="help-section">
            <h3>Questions about Refunds?</h3>
            <p>Our dedicated refund support team is here to help!</p>
            <div className="help-contacts">
              <a href="mailto:refunds@custompcbuilder.com" className="help-link">
                📧 refunds@custompcbuilder.com
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

export default RefundPolicyPage;