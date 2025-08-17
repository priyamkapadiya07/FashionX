import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5000/api';

// Get Cart
export const getCart = () => async (dispatch) => {
  try {
    dispatch({ type: 'CART_LOADING' });
    
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    dispatch({
      type: 'CART_SUCCESS',
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: 'CART_ERROR',
      payload: error.response?.data?.message || 'Failed to fetch cart'
    });
  }
};

// Add to Cart
export const addToCart = (productId, quantity, size, color) => async (dispatch) => {
  try {
    dispatch({ type: 'CART_LOADING' });
    
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/cart/add`,
      { productId, quantity, size, color },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch({
      type: 'ADD_TO_CART_SUCCESS',
      payload: response.data
    });

    toast.success('Product added to cart!');
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to add to cart';
    dispatch({
      type: 'CART_ERROR',
      payload: message
    });
    toast.error(message);
  }
};

// Update Cart Item
export const updateCartItem = (itemId, quantity) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `${API_URL}/cart/update/${itemId}`,
      { quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch({
      type: 'UPDATE_CART_SUCCESS',
      payload: response.data
    });

    toast.success('Cart updated!');
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to update cart';
    dispatch({
      type: 'CART_ERROR',
      payload: message
    });
    toast.error(message);
  }
};

// Remove from Cart
export const removeFromCart = (itemId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/cart/remove/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    dispatch({
      type: 'REMOVE_FROM_CART_SUCCESS',
      payload: response.data
    });

    toast.success('Item removed from cart!');
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to remove item';
    dispatch({
      type: 'CART_ERROR',
      payload: message
    });
    toast.error(message);
  }
};

// Clear Cart
export const clearCart = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}/cart/clear`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    dispatch({ type: 'CLEAR_CART' });
    toast.success('Cart cleared!');
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to clear cart';
    dispatch({
      type: 'CART_ERROR',
      payload: message
    });
    toast.error(message);
  }
};
