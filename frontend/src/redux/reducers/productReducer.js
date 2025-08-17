const initialState = {
  products: [],
  featuredProducts: [],
  newArrivals: [],
  currentProduct: null,
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  total: 0
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PRODUCTS_LOADING':
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case 'PRODUCTS_SUCCESS':
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        total: action.payload.total,
        error: null
      };
    
    case 'PRODUCTS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case 'FEATURED_PRODUCTS_SUCCESS':
      return {
        ...state,
        featuredProducts: action.payload,
        error: null
      };
    
    case 'NEW_ARRIVALS_SUCCESS':
      return {
        ...state,
        newArrivals: action.payload,
        error: null
      };
    
    case 'PRODUCT_DETAIL_LOADING':
      return {
        ...state,
        loading: true,
        currentProduct: null,
        error: null
      };
    
    case 'PRODUCT_DETAIL_SUCCESS':
      return {
        ...state,
        loading: false,
        currentProduct: action.payload,
        error: null
      };
    
    case 'PRODUCT_DETAIL_ERROR':
      return {
        ...state,
        loading: false,
        currentProduct: null,
        error: action.payload
      };
    
    case 'CLEAR_CURRENT_PRODUCT':
      return {
        ...state,
        currentProduct: null
      };
    
    default:
      return state;
  }
};

export default productReducer;
