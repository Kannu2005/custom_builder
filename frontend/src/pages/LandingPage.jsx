import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LandingPage() {
  const { user } = useAuth();
  
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span>🚀 Professional PC Builder</span>
          </div>
          <h1 className="hero-title">
            Build Your <span className="gradient-text">Dream PC</span>
          </h1>
          <p className="hero-subtitle">
            Professional-grade custom computer configuration for your company and personal needs.
            Get real-time pricing and expert recommendations.
          </p>
          <div className="hero-features">
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Real-time Pricing</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔧</span>
              <span>Expert Configuration</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💎</span>
              <span>Premium Components</span>
            </div>
          </div>
          <div className="hero-actions">
            {user ? (
              <Link to="/build" className="primary-btn hero-btn">
                <span>Start Building</span>
                <span className="btn-icon">→</span>
              </Link>
            ) : (
              <Link to="/register" className="primary-btn hero-btn">
                <span>Get Started</span>
                <span className="btn-icon">→</span>
              </Link>
            )}
            <Link to="/build" className="secondary-btn-outline">
              <span>View Components</span>
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="pc-showcase">
            <div className="pc-component cpu">
              <div className="component-glow"></div>
              <span>CPU</span>
            </div>
            <div className="pc-component gpu">
              <div className="component-glow"></div>
              <span>GPU</span>
            </div>
            <div className="pc-component ram">
              <div className="component-glow"></div>
              <span>RAM</span>
            </div>
            <div className="pc-component storage">
              <div className="component-glow"></div>
              <span>SSD</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose Our PC Builder?</h2>
          <p>Everything you need to build the perfect computer</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-large">🎯</div>
            <h3>Smart Compatibility</h3>
            <p>Our system automatically checks component compatibility to ensure your build works perfectly together.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-large">💰</div>
            <h3>Best Prices</h3>
            <p>Real-time pricing from multiple vendors to get you the best deals on premium components.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-large">🛠️</div>
            <h3>Expert Support</h3>
            <p>Get professional guidance and support throughout your PC building journey.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-large">⚡</div>
            <h3>Fast Delivery</h3>
            <p>Quick processing and delivery to get your dream PC components to you as soon as possible.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Build your PC in 3 simple steps</p>
        </div>
        <div className="steps-container">
          <div className="step-item">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Choose Components</h3>
              <p>Browse our extensive catalog of CPUs, GPUs, RAM, storage, and more. Filter by brand, price, and specifications.</p>
            </div>
          </div>
          <div className="step-connector"></div>
          <div className="step-item">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Configure & Optimize</h3>
              <p>Our smart system checks compatibility and suggests optimizations for the best performance and value.</p>
            </div>
          </div>
          <div className="step-connector"></div>
          <div className="step-item">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Order & Build</h3>
              <p>Review your configuration, place your order, and get ready to build your dream PC!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Builds Section */}
      <section className="popular-builds-section">
        <div className="section-header">
          <h2>Popular Build Categories</h2>
          <p>Pre-configured builds for different needs</p>
        </div>
        <div className="builds-grid">
          <div className="build-category-card gaming">
            <div className="build-icon">🎮</div>
            <h3>Gaming Beast</h3>
            <p>High-performance gaming rigs for 4K gaming and streaming</p>
            <div className="build-price">From ₹80,000</div>
            <div className="build-specs">
              <span>RTX 4070+</span>
              <span>32GB RAM</span>
              <span>1TB NVMe</span>
            </div>
          </div>
          <div className="build-category-card workstation">
            <div className="build-icon">💼</div>
            <h3>Workstation Pro</h3>
            <p>Professional workstations for content creation and development</p>
            <div className="build-price">From ₹1,20,000</div>
            <div className="build-specs">
              <span>Ryzen 9</span>
              <span>64GB RAM</span>
              <span>2TB NVMe</span>
            </div>
          </div>
          <div className="build-category-card budget">
            <div className="build-icon">💡</div>
            <h3>Budget Build</h3>
            <p>Affordable builds for everyday computing and light gaming</p>
            <div className="build-price">From ₹35,000</div>
            <div className="build-specs">
              <span>GTX 1660</span>
              <span>16GB RAM</span>
              <span>500GB SSD</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">PCs Built</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Components</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Satisfaction</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Build Your Dream PC?</h2>
          <p>Join thousands of satisfied customers who built their perfect computer with us</p>
          <div className="cta-actions">
            {user ? (
              <Link to="/build" className="primary-btn cta-btn">
                Start Building Now
              </Link>
            ) : (
              <>
                <Link to="/register" className="primary-btn cta-btn">
                  Create Account
                </Link>
                <Link to="/login" className="secondary-btn-outline">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;

