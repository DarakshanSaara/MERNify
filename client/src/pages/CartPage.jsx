import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const CartPage = () => {
  const { 
    cart, 
    cartTotal, 
    cartItemsCount, 
    updateCartQuantity, 
    removeFromCart,
    clearCart,
    user
  } = useApp();
  
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // In a real app, this would redirect to checkout page
    alert('Checkout functionality would be implemented here!');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <h2>Your Shopping Cart is Empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>{cartItemsCount} {cartItemsCount === 1 ? 'item' : 'items'} in your cart</p>
      </div>

      <div className="cart-content">
        <div className="cart-items-section">
          <div className="cart-items-header">
            <h2>Cart Items</h2>
            <button onClick={clearCart} className="btn btn-secondary btn-sm">
              Clear Cart
            </button>
          </div>
          
          <div className="cart-items">
            {cart.map(item => (
              <div key={item._id} className="cart-item">
                <img 
                  src={item.image || '/default-product.jpg'} 
                  alt={item.name}
                  className="cart-item-image"
                />
                
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-category">{item.category}</p>
                  <p className="cart-item-price">${item.price}</p>
                </div>

                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateCartQuantity(item._id, item.quantity - 1)}
                      className="quantity-btn"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item._id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                </div>

                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Items ({cartItemsCount}):</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping:</span>
              <span>$5.99</span>
            </div>
            
            <div className="summary-row">
              <span>Tax:</span>
              <span>${(cartTotal * 0.1).toFixed(2)}</span>
            </div>
            
            <div className="summary-row total">
              <span>Total:</span>
              <span>${(cartTotal * 1.1 + 5.99).toFixed(2)}</span>
            </div>

            <button 
              onClick={handleCheckout}
              className="btn btn-primary btn-block checkout-btn"
            >
              {user ? 'Proceed to Checkout' : 'Login to Checkout'}
            </button>

            <Link to="/products" className="btn btn-outline btn-block">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;