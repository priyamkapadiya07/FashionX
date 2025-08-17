import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: '#333', 
      color: 'white', 
      padding: '2rem 0',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div className="grid grid-3">
          <div>
            <h3>FashionX</h3>
            <p>Your ultimate destination for fashion</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul style={{ listStyle: 'none' }}>
              <li><a href="/products" style={{ color: 'white', textDecoration: 'none' }}>Products</a></li>
              <li><a href="/cart" style={{ color: 'white', textDecoration: 'none' }}>Cart</a></li>
              <li><a href="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Email: info@fashionx.com</p>
            <p>Phone: +1 234 567 8900</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem', borderTop: '1px solid #555', paddingTop: '1rem' }}>
          <p>&copy; 2024 FashionX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
