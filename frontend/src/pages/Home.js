import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getFeaturedProducts, getNewArrivals } from '../redux/actions/productActions';

const Home = () => {
  const dispatch = useDispatch();
  const { featuredProducts, newArrivals } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getFeaturedProducts());
    dispatch(getNewArrivals());
  }, [dispatch]);

  return (
    <div className="container" style={{ paddingTop: '100px' }}>
      {/* Hero Section */}
      <div style={{ 
        textAlign: 'center', 
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        color: 'white',
        marginBottom: '4rem'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome to FashionX</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Your ultimate destination for fashion</p>
        <Link 
          to="/products" 
          style={{
            padding: '1rem 2rem',
            backgroundColor: 'white',
            color: '#667eea',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            display: 'inline-block',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Shop Now
        </Link>
      </div>
      
      {/* Categories Section */}
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily:'cursive'}}>Shop by Category</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{
            padding: '2rem',
            border: '1px solid #ddd',
            borderRadius: '12px',
            textAlign: 'center',
            backgroundColor: 'white',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>Men's Fashion</h3>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>Latest trends for men</p>
            <Link 
              to="/products?gender=men" 
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                display: 'inline-block'
              }}
            >
              Explore
            </Link>
          </div>
          
          <div style={{
            padding: '2rem',
            border: '1px solid #ddd',
            borderRadius: '12px',
            textAlign: 'center',
            backgroundColor: 'white',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>Women's Fashion</h3>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>Latest trends for women</p>
            <Link 
              to="/products?gender=women" 
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#e91e63',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                display: 'inline-block'
              }}
            >
              Explore
            </Link>
          </div>
          
          <div style={{
            padding: '2rem',
            border: '1px solid #ddd',
            borderRadius: '12px',
            textAlign: 'center',
            backgroundColor: 'white',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>New Arrivals</h3>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>Fresh styles just in</p>
            <Link 
              to="/products" 
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#28a745',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                display: 'inline-block'
              }}
            >
              Explore
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily:'cursive'}}>Featured Products</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {featuredProducts.slice(0, 4).map(product => (
              <div key={product._id} style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {product.images && product.images.length > 0 ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      style={{ 
                        width: '100%', 
                        height: '200px', 
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div style={{ 
                      width: '100%', 
                      height: '200px', 
                      backgroundColor: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      No Image
                    </div>
                  )}
                  <div style={{ padding: '1rem' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0' }}>{product.name}</h4>
                    <p style={{ color: '#666', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>{product.brand}</p>
                    <div>
                      {product.discountPrice > 0 ? (
                        <>
                          <span style={{ fontWeight: 'bold', color: '#e74c3c' }}>
                            ₹{product.discountPrice}
                          </span>
                          <span style={{ 
                            textDecoration: 'line-through', 
                            marginLeft: '0.5rem',
                            color: '#999'
                          }}>
                            ₹{product.price}
                          </span>
                        </>
                      ) : (
                        <span style={{ fontWeight: 'bold' }}>₹{product.price}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem',fontFamily:'cursive' }}>New Arrivals</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {newArrivals.slice(0, 4).map(product => (
              <div key={product._id} style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {product.images && product.images.length > 0 ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      style={{ 
                        width: '100%', 
                        height: '200px', 
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div style={{ 
                      width: '100%', 
                      height: '200px', 
                      backgroundColor: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      No Image
                    </div>
                  )}
                  <div style={{ padding: '1rem' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0' }}>{product.name}</h4>
                    <p style={{ color: '#666', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>{product.brand}</p>
                    <div>
                      {product.discountPrice > 0 ? (
                        <>
                          <span style={{ fontWeight: 'bold', color: '#e74c3c' }}>
                            ₹{product.discountPrice}
                          </span>
                          <span style={{ 
                            textDecoration: 'line-through', 
                            marginLeft: '0.5rem',
                            color: '#999'
                          }}>
                            ₹{product.price}
                          </span>
                        </>
                      ) : (
                        <span style={{ fontWeight: 'bold' }}>₹{product.price}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
