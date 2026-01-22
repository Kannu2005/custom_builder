import { useEffect } from 'react';

function AboutUsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1>🏢 About Us</h1>
          <p className="about-subtitle">Custom PC Builder</p>
          <p className="about-tagline">"Building Dreams, One PC at a Time"</p>
        </div>

        <div className="about-content">
          <section className="about-section hero">
            <div className="hero-content">
              <h2>Our Story</h2>
              <p>
                Welcome to <strong>Custom PC Builder</strong> - India's premier destination for custom PC building and 
                high-performance computing solutions. Founded in 2024, we started with a simple mission: to make custom PC 
                building accessible, affordable, and enjoyable for everyone, from gaming enthusiasts to professional creators.
              </p>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">50,000+</span>
                <span className="stat-label">Custom PCs Built</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100,000+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">99.5%</span>
                <span className="stat-label">Satisfaction Rating</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Customer Support</span>
              </div>
            </div>
          </section>

          <section className="about-section mission">
            <div className="mission-content">
              <h2>Our Mission</h2>
              <div className="mission-statement">
                <blockquote>
                  "Empowering every user to build their perfect PC"
                </blockquote>
              </div>
              <p>
                We believe that everyone deserves a computer that perfectly matches their needs, budget, and dreams. 
                Whether you're a casual gamer, content creator, professional developer, or enterprise user, 
                we're here to help you build the perfect system.
              </p>
            </div>
          </section>

          <section className="about-section services">
            <h2>What We Do</h2>
            
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">🖥️</div>
                <h3>Custom PC Building</h3>
                <ul>
                  <li><strong>Personalized Configurations:</strong> Tailored PC builds for every need and budget</li>
                  <li><strong>Expert Assembly:</strong> Professional assembly by certified technicians</li>
                  <li><strong>Quality Assurance:</strong> Rigorous testing before delivery</li>
                  <li><strong>Warranty Support:</strong> Comprehensive warranty and after-sales support</li>
                </ul>
              </div>

              <div className="service-card">
                <div className="service-icon">🛒</div>
                <h3>Component Retail</h3>
                <ul>
                  <li><strong>Wide Selection:</strong> Thousands of components from top brands</li>
                  <li><strong>Competitive Pricing:</strong> Best prices in the market</li>
                  <li><strong>Authentic Products:</strong> 100% genuine products with manufacturer warranty</li>
                  <li><strong>Fast Delivery:</strong> Quick and secure delivery across India</li>
                </ul>
              </div>

              <div className="service-card">
                <div className="service-icon">🔧</div>
                <h3>Professional Services</h3>
                <ul>
                  <li><strong>PC Assembly:</strong> Professional assembly services</li>
                  <li><strong>Upgrades:</strong> System upgrade and enhancement services</li>
                  <li><strong>Repairs:</strong> Expert repair and maintenance services</li>
                  <li><strong>Consultation:</strong> Free technical consultation and advice</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="about-section values">
            <h2>Our Values</h2>
            
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">🎯</div>
                <h3>Customer First</h3>
                <p>Every decision we make is centered around our customers. Your satisfaction, success, and experience are our top priorities.</p>
              </div>

              <div className="value-card">
                <div className="value-icon">🔍</div>
                <h3>Quality Excellence</h3>
                <p>We never compromise on quality. From component selection to assembly, every step meets the highest standards.</p>
              </div>

              <div className="value-card">
                <div className="value-icon">💡</div>
                <h3>Innovation</h3>
                <p>We stay ahead of technology trends to offer the latest and greatest in PC building.</p>
              </div>

              <div className="value-card">
                <div className="value-icon">🤝</div>
                <h3>Transparency</h3>
                <p>Honest pricing, clear communication, and transparent processes in everything we do.</p>
              </div>

              <div className="value-card">
                <div className="value-icon">🌱</div>
                <h3>Sustainability</h3>
                <p>Committed to environmentally responsible practices and promoting sustainable technology use.</p>
              </div>
            </div>
          </section>

          <section className="about-section team">
            <h2>Our Team</h2>
            
            <div className="leadership-section">
              <h3>Leadership Team</h3>
              <div className="leadership-grid">
                <div className="leader-card">
                  <div className="leader-avatar">👨‍💼</div>
                  <div className="leader-info">
                    <h4>Rajesh Kumar</h4>
                    <span className="leader-title">Founder & CEO</span>
                    <p className="leader-experience">15+ years in technology and e-commerce</p>
                    <ul className="leader-details">
                      <li>Former Senior Engineer at Intel India</li>
                      <li>Passionate about democratizing custom PC building</li>
                      <li>Expert in system architecture and performance optimization</li>
                    </ul>
                  </div>
                </div>

                <div className="leader-card">
                  <div className="leader-avatar">👩‍💻</div>
                  <div className="leader-info">
                    <h4>Priya Sharma</h4>
                    <span className="leader-title">CTO</span>
                    <p className="leader-experience">12+ years in software development and system design</p>
                    <ul className="leader-details">
                      <li>Former Lead Developer at Flipkart</li>
                      <li>Specialist in e-commerce platforms and user experience</li>
                      <li>Advocate for accessible technology solutions</li>
                    </ul>
                  </div>
                </div>

                <div className="leader-card">
                  <div className="leader-avatar">👨‍🔧</div>
                  <div className="leader-info">
                    <h4>Amit Patel</h4>
                    <span className="leader-title">Head of Operations</span>
                    <p className="leader-experience">10+ years in supply chain and logistics</p>
                    <ul className="leader-details">
                      <li>Former Operations Manager at Amazon India</li>
                      <li>Expert in inventory management and delivery optimization</li>
                      <li>Focused on customer satisfaction and operational excellence</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="team-stats">
              <h3>Our Extended Team</h3>
              <div className="team-stats-grid">
                <div className="team-stat">
                  <span className="team-number">25+</span>
                  <span className="team-label">Certified Technicians</span>
                </div>
                <div className="team-stat">
                  <span className="team-number">15+</span>
                  <span className="team-label">Quality Assurance Specialists</span>
                </div>
                <div className="team-stat">
                  <span className="team-number">20+</span>
                  <span className="team-label">Customer Support Experts</span>
                </div>
                <div className="team-stat">
                  <span className="team-number">10+</span>
                  <span className="team-label">R&D Engineers</span>
                </div>
              </div>
            </div>
          </section>

          <section className="about-section achievements">
            <h2>Our Achievements</h2>
            
            <div className="achievements-grid">
              <div className="achievement-card milestones">
                <h3>🏆 Milestones</h3>
                <div className="milestone-list">
                  <div className="milestone-item">
                    <span className="milestone-number">50,000+</span>
                    <span className="milestone-desc">Custom PCs built and delivered</span>
                  </div>
                  <div className="milestone-item">
                    <span className="milestone-number">100,000+</span>
                    <span className="milestone-desc">Happy customers across India</span>
                  </div>
                  <div className="milestone-item">
                    <span className="milestone-number">99.5%</span>
                    <span className="milestone-desc">Customer satisfaction rating</span>
                  </div>
                  <div className="milestone-item">
                    <span className="milestone-number">24/7</span>
                    <span className="milestone-desc">Customer support availability</span>
                  </div>
                </div>
              </div>

              <div className="achievement-card recognition">
                <h3>🥇 Recognition</h3>
                <ul className="recognition-list">
                  <li><strong>"Best Custom PC Builder 2025"</strong> - Tech India Awards</li>
                  <li><strong>"Customer Choice Award"</strong> - E-commerce Excellence Awards</li>
                  <li><strong>"Innovation in Technology"</strong> - Startup India Recognition</li>
                  <li><strong>ISO 9001:2015</strong> Quality Management Certification</li>
                </ul>
              </div>

              <div className="achievement-card growth">
                <h3>📈 Growth</h3>
                <ul className="growth-list">
                  <li><strong>500%</strong> Year-over-year growth</li>
                  <li><strong>50+ Cities</strong> Delivery coverage across India</li>
                  <li><strong>200+ Brands</strong> Partnership with leading component manufacturers</li>
                  <li><strong>15+ States</strong> Physical presence and service centers</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="about-section facilities">
            <h2>Our Facilities</h2>
            
            <div className="facilities-grid">
              <div className="facility-card">
                <h3>🏭 Assembly Centers</h3>
                <div className="facility-list">
                  <div className="facility-item">
                    <strong>Mumbai Facility:</strong> 10,000 sq ft state-of-the-art assembly center
                  </div>
                  <div className="facility-item">
                    <strong>Delhi NCR Facility:</strong> 8,000 sq ft assembly and testing facility
                  </div>
                  <div className="facility-item">
                    <strong>Bangalore Facility:</strong> 6,000 sq ft South India operations center
                  </div>
                  <div className="facility-item">
                    <strong>Pune Facility:</strong> 5,000 sq ft Western India assembly center
                  </div>
                </div>
              </div>

              <div className="facility-card">
                <h3>🔬 Testing Labs</h3>
                <ul className="facility-features">
                  <li><strong>Performance Testing:</strong> Advanced benchmarking and stress testing</li>
                  <li><strong>Quality Control:</strong> Multi-stage quality assurance processes</li>
                  <li><strong>Burn-in Testing:</strong> 24-hour stability testing for all builds</li>
                  <li><strong>Certification:</strong> Compliance testing for safety and performance standards</li>
                </ul>
              </div>

              <div className="facility-card">
                <h3>📦 Logistics Network</h3>
                <ul className="facility-features">
                  <li><strong>Warehouses:</strong> 5 strategically located warehouses</li>
                  <li><strong>Inventory:</strong> ₹50+ Crore inventory across all locations</li>
                  <li><strong>Delivery Partners:</strong> Partnerships with leading courier services</li>
                  <li><strong>Same-day Delivery:</strong> Available in major metro cities</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="about-section partners">
            <h2>Our Partners</h2>
            
            <div className="partners-section">
              <div className="partner-category">
                <h3>🤝 Component Partners</h3>
                <div className="partner-grid">
                  <div className="partner-item">
                    <strong>Intel</strong> - Processors and chipsets
                  </div>
                  <div className="partner-item">
                    <strong>AMD</strong> - Processors and graphics cards
                  </div>
                  <div className="partner-item">
                    <strong>NVIDIA</strong> - Graphics cards and AI solutions
                  </div>
                  <div className="partner-item">
                    <strong>ASUS</strong> - Motherboards and peripherals
                  </div>
                  <div className="partner-item">
                    <strong>MSI</strong> - Gaming components and systems
                  </div>
                  <div className="partner-item">
                    <strong>Corsair</strong> - Memory, storage, and cooling
                  </div>
                  <div className="partner-item">
                    <strong>Cooler Master</strong> - Cases and cooling solutions
                  </div>
                  <div className="partner-item">
                    <strong>Seasonic</strong> - Power supplies
                  </div>
                </div>
              </div>

              <div className="partner-category">
                <h3>🚚 Logistics Partners</h3>
                <div className="partner-grid">
                  <div className="partner-item">
                    <strong>Blue Dart</strong> - Express delivery services
                  </div>
                  <div className="partner-item">
                    <strong>DTDC</strong> - Nationwide delivery network
                  </div>
                  <div className="partner-item">
                    <strong>Delhivery</strong> - E-commerce logistics
                  </div>
                  <div className="partner-item">
                    <strong>FedEx</strong> - International shipping
                  </div>
                </div>
              </div>

              <div className="partner-category">
                <h3>💳 Payment Partners</h3>
                <div className="partner-grid">
                  <div className="partner-item">
                    <strong>Razorpay</strong> - Payment gateway services
                  </div>
                  <div className="partner-item">
                    <strong>PayU</strong> - Digital payment solutions
                  </div>
                  <div className="partner-item">
                    <strong>Paytm</strong> - Digital wallet integration
                  </div>
                  <div className="partner-item">
                    <strong>PhonePe</strong> - UPI payment services
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="about-section community">
            <h2>Community Engagement</h2>
            
            <div className="community-grid">
              <div className="community-card">
                <h3>🎮 Gaming Community</h3>
                <ul>
                  <li><strong>Gaming Tournaments:</strong> Sponsor local and national gaming events</li>
                  <li><strong>Esports Support:</strong> Support for professional esports teams</li>
                  <li><strong>Gaming Cafes:</strong> Partnership with gaming cafe networks</li>
                  <li><strong>Student Programs:</strong> Special pricing for students and educational institutions</li>
                </ul>
              </div>

              <div className="community-card">
                <h3>🎓 Educational Initiatives</h3>
                <ul>
                  <li><strong>STEM Programs:</strong> Support for science and technology education</li>
                  <li><strong>Workshops:</strong> Free PC building workshops in schools and colleges</li>
                  <li><strong>Internships:</strong> Internship programs for engineering students</li>
                  <li><strong>Scholarships:</strong> Technology scholarships for deserving students</li>
                </ul>
              </div>

              <div className="community-card">
                <h3>🌍 Social Responsibility</h3>
                <ul>
                  <li><strong>E-waste Management:</strong> Responsible e-waste disposal programs</li>
                  <li><strong>Digital Literacy:</strong> Programs to promote digital literacy</li>
                  <li><strong>Rural Technology:</strong> Bringing technology to rural areas</li>
                  <li><strong>Environmental Initiatives:</strong> Carbon-neutral delivery options</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="about-section contact">
            <h2>Contact Information</h2>
            
            <div className="contact-info-grid">
              <div className="contact-info-card">
                <h3>🏢 Corporate Headquarters</h3>
                <address>
                  Custom PC Builder Pvt. Ltd.<br/>
                  Building No. 123, Tech Park<br/>
                  Sector 62, Noida, Uttar Pradesh 201301<br/>
                  India
                </address>
              </div>

              <div className="contact-info-card">
                <h3>📞 Contact Details</h3>
                <ul>
                  <li><strong>Phone:</strong> +91 1800-123-4567 (Toll-free)</li>
                  <li><strong>Email:</strong> info@custompcbuilder.com</li>
                  <li><strong>Website:</strong> www.custompcbuilder.com</li>
                  <li><strong>Support:</strong> support@custompcbuilder.com</li>
                </ul>
              </div>

              <div className="contact-info-card">
                <h3>🌐 Social Media</h3>
                <ul>
                  <li><strong>Facebook:</strong> /CustomPCBuilderIndia</li>
                  <li><strong>Instagram:</strong> @custompcbuilder</li>
                  <li><strong>Twitter:</strong> @CustomPCIndia</li>
                  <li><strong>YouTube:</strong> Custom PC Builder India</li>
                  <li><strong>LinkedIn:</strong> Custom PC Builder</li>
                </ul>
              </div>

              <div className="contact-info-card">
                <h3>🕒 Business Hours</h3>
                <ul>
                  <li><strong>Customer Support:</strong> 24/7 (365 days)</li>
                  <li><strong>Sales Team:</strong> Monday-Saturday, 9:00 AM - 8:00 PM IST</li>
                  <li><strong>Technical Support:</strong> Monday-Sunday, 8:00 AM - 10:00 PM IST</li>
                  <li><strong>Corporate Office:</strong> Monday-Friday, 9:00 AM - 6:00 PM IST</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="about-section join">
            <h2>Join Our Journey</h2>
            
            <div className="join-grid">
              <div className="join-card">
                <h3>💼 Careers</h3>
                <p>We're always looking for passionate individuals to join our team. Check out our careers page for current openings in:</p>
                <ul>
                  <li>Engineering & Development</li>
                  <li>Customer Support</li>
                  <li>Sales & Marketing</li>
                  <li>Operations & Logistics</li>
                  <li>Quality Assurance</li>
                </ul>
              </div>

              <div className="join-card">
                <h3>🤝 Partnerships</h3>
                <p>Interested in partnering with us? We welcome:</p>
                <ul>
                  <li>Component Manufacturers</li>
                  <li>Technology Partners</li>
                  <li>Logistics Partners</li>
                  <li>Educational Institutions</li>
                  <li>Gaming Communities</li>
                </ul>
              </div>

              <div className="join-card">
                <h3>📧 Stay Connected</h3>
                <p>Subscribe to our newsletter for:</p>
                <ul>
                  <li>Latest Product Updates</li>
                  <li>Exclusive Offers</li>
                  <li>Tech News & Trends</li>
                  <li>Building Tips & Guides</li>
                  <li>Community Events</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div className="about-footer">
          <div className="footer-message">
            <h3>Thank you for choosing Custom PC Builder!</h3>
            <p>
              We're excited to be part of your PC building journey and look forward to helping you create the perfect system for your needs.
            </p>
            <div className="footer-tagline">
              <em>Building Dreams, One PC at a Time</em> 🚀
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;