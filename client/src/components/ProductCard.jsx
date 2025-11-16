import React from 'react';
import { useApp } from '../context/AppContext';

// Receives product data as props
const ProductCard = ({ product }) => {
  const { addToCart } = useApp();

  const handleAddToCart = () => {
    addToCart(product); // Uses global addToCart function (context usage)
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image || '/default-product.jpg'} 
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = '/default-product.jpg';
          }}
        />
        {product.featured && <span className="featured-badge">Featured</span>}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">
          {product.description.substring(0, 100)}...
        </p>
        
        <div className="product-meta">
          <div className="product-details">
            <span className="product-price">${product.price}</span>
            <span className={`product-stock ${product.stock === 0 ? 'out-of-stock' : 'in-stock'}`}>
              {product.stock === 0 ? 'Out of Stock' : `${product.stock} left`}
            </span>
          </div>
          
          <div className="product-category">
            <span className="category-badge">{product.category}</span>
          </div>
        </div>
        
        <button
          className={`add-to-cart-btn ${product.stock === 0 ? 'disabled' : ''}`}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;