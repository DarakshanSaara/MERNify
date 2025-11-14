import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// Create Context
const AppContext = createContext();

// API configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Initial state for the application
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
  products: [],
  cart: JSON.parse(localStorage.getItem('cart')) || []
};

// Action types for useReducer
export const ACTION_TYPES = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  USER_LOADED: 'USER_LOADED',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_PRODUCTS: 'SET_PRODUCTS',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_QUANTITY: 'UPDATE_CART_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
};

// Reducer function to handle state updates
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ACTION_TYPES.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case ACTION_TYPES.CLEAR_ERROR:
      return { ...state, error: null };
    
    case ACTION_TYPES.USER_LOADED:
      return { ...state, user: action.payload, loading: false };
    
    case ACTION_TYPES.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null
      };
    
    case ACTION_TYPES.LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('cart');
      return {
        ...state,
        user: null,
        token: null,
        cart: []
      };
    
    case ACTION_TYPES.SET_PRODUCTS:
      return { ...state, products: action.payload, loading: false };
    
    case ACTION_TYPES.ADD_TO_CART:
      const existingItem = state.cart.find(item => item._id === action.payload._id);
      let newCart;
      
      if (existingItem) {
        // If item exists, increase quantity
        newCart = state.cart.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new item, add to cart with quantity 1
        newCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
      
      localStorage.setItem('cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    
    case ACTION_TYPES.REMOVE_FROM_CART:
      const filteredCart = state.cart.filter(item => item._id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(filteredCart));
      return { ...state, cart: filteredCart };
    
    case ACTION_TYPES.UPDATE_CART_QUANTITY:
      const updatedCart = state.cart.map(item =>
        item._id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };
    
    case ACTION_TYPES.CLEAR_CART:
      localStorage.removeItem('cart');
      return { ...state, cart: [] };
    
    default:
      return state;
  }
};

// Context Provider Component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Set auth token globally for axios requests
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [state.token]);

  // Action creators
  const setLoading = (loading) => 
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: loading });
  
  const setError = (error) => 
    dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error });
  
  const clearError = () => 
    dispatch({ type: ACTION_TYPES.CLEAR_ERROR });

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      dispatch({
        type: ACTION_TYPES.LOGIN_SUCCESS,
        payload: response.data.data
      });
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password
      });
      
      dispatch({
        type: ACTION_TYPES.LOGIN_SUCCESS,
        payload: response.data.data
      });
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    dispatch({ type: ACTION_TYPES.LOGOUT });
  };

  const loadUser = async () => {
    try {
      if (!state.token) return;
      
      const response = await axios.get(`${API_URL}/auth/me`);
      dispatch({
        type: ACTION_TYPES.USER_LOADED,
        payload: response.data.data.user
      });
    } catch (error) {
      console.error('Error loading user:', error);
      logout();
    }
  };

  const fetchProducts = async () => {
  try {
    setLoading(true);
    
    const response = await axios.get(`${API_URL}/products`);
    
    dispatch({
      type: ACTION_TYPES.SET_PRODUCTS,
      payload: response.data.data.products
    });
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to fetch products';
    setError(message);
  }
};

  const addToCart = (product) => {
    dispatch({ type: ACTION_TYPES.ADD_TO_CART, payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: ACTION_TYPES.REMOVE_FROM_CART, payload: productId });
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      dispatch({
        type: ACTION_TYPES.UPDATE_CART_QUANTITY,
        payload: { id: productId, quantity }
      });
    }
  };

  const clearCart = () => {
    dispatch({ type: ACTION_TYPES.CLEAR_CART });
  };

  // Calculate derived state
  const cartTotal = state.cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const cartItemsCount = state.cart.reduce((count, item) => count + item.quantity, 0);

  // Load user on component mount if token exists
  useEffect(() => {
    loadUser();
  }, []);

  const value = {
    // State
    ...state,
    // Derived state
    cartTotal,
    cartItemsCount,
    // Actions
    setLoading,
    setError,
    clearError,
    login,
    register,
    logout,
    loadUser,
    fetchProducts,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};