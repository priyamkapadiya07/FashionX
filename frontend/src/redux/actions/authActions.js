import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5000/api';

// Login Action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'AUTH_LOADING' });
    
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: response.data
    });

    toast.success('Login successful!');
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed';
    dispatch({
      type: 'LOGIN_FAIL',
      payload: message
    });
    toast.error(message);
  }
};

// Register Action
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'AUTH_LOADING' });
    
    const response = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password
    });

    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: response.data
    });

    toast.success('Registration successful!');
  } catch (error) {
    const message = error.response?.data?.message || 'Registration failed';
    dispatch({
      type: 'REGISTER_FAIL',
      payload: message
    });
    toast.error(message);
  }
};

// Logout Action
export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
  toast.success('Logged out successfully!');
};

// Load User Action
export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    dispatch({ type: 'AUTH_ERROR', payload: 'No token found' });
    return;
  }

  try {
    const response = await axios.get(`${API_URL}/auth/user`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    dispatch({
      type: 'USER_LOADED',
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: 'AUTH_ERROR',
      payload: error.response?.data?.message || 'Failed to load user'
    });
  }
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: 'CLEAR_ERROR' });
};
