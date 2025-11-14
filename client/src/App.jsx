import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import CartPage from './pages/CartPage';
import './App.css';

function App() {
  const { loading, error, clearError } = useApp();

  return (
    <Router>
      <div className="App">
        <Navbar />
        
        {/* Global Loader */}
        {loading && <Loader />}
        
        {/* Global Error Message */}
        {error && (
          <div className="error-banner">
            <span>{error}</span>
            <button onClick={clearError}>×</button>
          </div>
        )}
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;