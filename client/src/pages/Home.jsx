import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { user, products, fetchProducts, loading } = useApp();

  useEffect(() => {
    fetchProducts();
  }, []);

  const featuredProducts = products.filter(product => product.featured).slice(0, 3);
  const recentProducts = products.slice(0, 6);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to MERN Store</h1>
          <p className="hero-subtitle">
            Discover amazing products built with the MERN stack
          </p>
          {user ? (
            <p className="welcome-message">Welcome back, {user.name}! Happy shopping! 🎉</p>
          ) : (
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/products" className="btn btn-secondary">
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="featured-section">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/products" className="btn btn-outline">
              View All Products
            </Link>
          </div>
        </section>
      )}

      {/* Recent Products */}
      {recentProducts.length > 0 && (
        <section className="recent-products">
          <h2>Latest Products</h2>
          <div className="products-grid">
            {recentProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Loading State */}
      {loading && products.length === 0 && (
        <div className="loading">
          <p>Loading products...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className="no-products">
          <h3>No products available</h3>
          <p>Check back later for new products!</p>
        </div>
      )}

      {/* Tech Stack Info */}
      <section className="tech-section">
        <h2>Built with Modern MERN Stack</h2>
        <div className="tech-stack">
          <div className="tech-item">
            <h3>MongoDB</h3>
            <p>NoSQL database for flexible data storage</p>
          </div>
          <div className="tech-item">
            <h3>Express.js</h3>
            <p>Backend framework for robust APIs</p>
          </div>
          <div className="tech-item">
            <h3>React</h3>
            <p>Frontend library for interactive UIs</p>
          </div>
          <div className="tech-item">
            <h3>Node.js</h3>
            <p>JavaScript runtime for server-side execution</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;