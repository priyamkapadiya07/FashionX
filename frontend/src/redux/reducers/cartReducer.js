const initialState = {
  items: [],
  totalAmount: 0,
  loading: false,
  error: null
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CART_LOADING':
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case 'CART_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.payload.items || [],
        totalAmount: action.payload.totalAmount || 0,
        error: null
      };
    
    case 'CART_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case 'ADD_TO_CART_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
        error: null
      };
    
    case 'UPDATE_CART_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
        error: null
      };
    
    case 'REMOVE_FROM_CART_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
        error: null
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalAmount: 0,
        error: null
      };
    
    default:
      return state;
  }
};

export default cartReducer;
