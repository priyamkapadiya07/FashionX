import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get All Products
export const getProducts = (filters = {}) => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCTS_LOADING' });
    
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    const response = await axios.get(`${API_URL}/products?${queryParams}`);

    dispatch({
      type: 'PRODUCTS_SUCCESS',
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: 'PRODUCTS_ERROR',
      payload: error.response?.data?.message || 'Failed to fetch products'
    });
  }
};

// Get Single Product
export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_DETAIL_LOADING' });
    
    const response = await axios.get(`${API_URL}/products/${id}`);

    dispatch({
      type: 'PRODUCT_DETAIL_SUCCESS',
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_DETAIL_ERROR',
      payload: error.response?.data?.message || 'Failed to fetch product'
    });
  }
};

// Get Featured Products
export const getFeaturedProducts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/products/featured/all`);

    dispatch({
      type: 'FEATURED_PRODUCTS_SUCCESS',
      payload: response.data
    });
  } catch (error) {
    console.error('Failed to fetch featured products:', error);
  }
};

// Get New Arrivals
export const getNewArrivals = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/products/new-arrivals/all`);

    dispatch({
      type: 'NEW_ARRIVALS_SUCCESS',
      payload: response.data
    });
  } catch (error) {
    console.error('Failed to fetch new arrivals:', error);
  }
};

// Clear Current Product
export const clearCurrentProduct = () => (dispatch) => {
  dispatch({ type: 'CLEAR_CURRENT_PRODUCT' });
};
