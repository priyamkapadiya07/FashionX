import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <nav style={{ 
      backgroundColor: '#333', 
      color: 'white', 
      padding: '1rem 0',
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
          FashionX
        </Link>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link>
          <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
            Cart ({items.length})
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
              <button onClick={handleLogout} style={{ 
                background: 'none', 
                border: 'none', 
                color: 'white', 
                cursor: 'pointer' 
              }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
              <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
