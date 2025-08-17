import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  

  return (
    <div className="container">
      {/* Popup Modal */}
      <div style={{ 
        textAlign: 'center', 
        padding: '3rem 2rem',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        {/* Success Icon */}
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          backgroundColor: '#28a745',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem auto',
          fontSize: '3rem',
          color: 'white'
        }}>
          ✓
        </div>

        <h1 style={{ 
          color: '#28a745', 
          marginBottom: '1rem',
          fontSize: '2.5rem'
        }}>
          Payment Successful!
        </h1>
        
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#666', 
          marginBottom: '1rem' 
        }}>
          Thank you for your order! Your payment has been processed successfully.
        </p>
        
        <p style={{ 
          fontSize: '1rem', 
          color: '#888', 
          marginBottom: '2rem' 
        }}>
          You will receive an email confirmation shortly with your order details and tracking information.
        </p>

        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link 
            to="/profile" 
            style={{
              padding: '1rem 2rem',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              display: 'inline-block',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            View My Orders
          </Link>
          
          <Link 
            to="/products" 
            style={{
              padding: '1rem 2rem',
              backgroundColor: 'white',
              color: '#007bff',
              textDecoration: 'none',
              border: '2px solid #007bff',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              display: 'inline-block',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#007bff';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = '#007bff';
            }}
          >
            Continue Shopping
          </Link>
        </div>

        {/* Additional Info */}
        <div style={{
          marginTop: '3rem',
          padding: '1.5rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h4 style={{ marginBottom: '1rem', color: '#495057' }}>What's Next?</h4>
          <ul style={{ 
            textAlign: 'left', 
            color: '#666',
            lineHeight: '1.6',
            paddingLeft: '1.5rem'
          }}>
            <li>You'll receive an order confirmation email within a few minutes</li>
            <li>Your order will be processed and shipped within 1-2 business days</li>
            <li>Track your order status in your profile under "My Orders"</li>
            <li>Contact our support team if you have any questions</li>
          </ul>
        </div>

        {/* Customer Support */}
        <div style={{ marginTop: '2rem' }}>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            Need help? Contact us at{' '}
            <a href="mailto:support@fashionx.com" style={{ color: '#007bff' }}>
              support@fashionx.com
            </a>
            {' '}or call{' '}
            <a href="tel:+1234567890" style={{ color: '#007bff' }}>
              (123) 456-7890
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
