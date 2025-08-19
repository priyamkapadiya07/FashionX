import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentProduct, loading, error } = useSelector(
    (state) => state.products
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    fetchProduct();
    return () => {
      dispatch({ type: "CLEAR_CURRENT_PRODUCT" });
    };
  }, [id]);

  const fetchProduct = async () => {
    dispatch({ type: "PRODUCT_DETAIL_LOADING" });
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
      dispatch({ type: "PRODUCT_DETAIL_SUCCESS", payload: response.data });

      // Set default selections
      if (response.data.sizes && response.data.sizes.length > 0) {
        setSelectedSize(response.data.sizes[0].size);
      }
      if (response.data.colors && response.data.colors.length > 0) {
        setSelectedColor(response.data.colors[0]);
      }
    } catch (error) {
      dispatch({
        type: "PRODUCT_DETAIL_ERROR",
        payload: error.response?.data?.message || "Failed to fetch product",
      });
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId: currentProduct._id,
          quantity,
          size: selectedSize,
          color: selectedColor,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch({ type: "ADD_TO_CART_SUCCESS", payload: response.data });
      toast.success("Product added to cart!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  if (loading) {
    return (
      <div
        className="container"
        style={{ paddingTop: "100px", textAlign: "center" }}>
        <div>Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ paddingTop: "100px" }}>
        <div style={{ color: "red", textAlign: "center" }}>Error: {error}</div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div
        className="container"
        style={{ paddingTop: "100px", textAlign: "center" }}>
        <div>Product not found</div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "50px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          marginBottom: "2rem",
        }}>
        {/* Product Images */}
        <div>
          <div style={{ marginBottom: "1rem" }}>
            {currentProduct.images && currentProduct.images.length > 0 ? (
              <img
                src={currentProduct.images[activeImageIndex]}
                alt={currentProduct.name}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "400px",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                }}>
                No Image Available
              </div>
            )}
          </div>

          {/* Image thumbnails */}
          {currentProduct.images && currentProduct.images.length > 1 && (
            <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto" }}>
              {currentProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${currentProduct.name} ${index + 1}`}
                  onClick={() => setActiveImageIndex(index)}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    cursor: "pointer",
                    border:
                      activeImageIndex === index
                        ? "2px solid #007bff"
                        : "1px solid #ddd",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 style={{ marginBottom: "0.5rem" }}>{currentProduct.name}</h1>
          <p style={{ color: "#666", marginBottom: "1rem" }}>
            {currentProduct.brand}
          </p>

          {/* Price */}
          <div style={{ marginBottom: "1rem" }}>
            {currentProduct.discountPrice > 0 ? (
              <>
                <span
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "#e74c3c",
                  }}>
                  ₹{currentProduct.discountPrice}
                </span>
                <span
                  style={{
                    textDecoration: "line-through",
                    marginLeft: "1rem",
                    color: "#999",
                    fontSize: "1.5rem",
                  }}>
                  ₹{currentProduct.price}
                </span>
                <span
                  style={{
                    marginLeft: "1rem",
                    color: "#27ae60",
                    fontWeight: "bold",
                  }}>
                  {Math.round(
                    ((currentProduct.price - currentProduct.discountPrice) /
                      currentProduct.price) *
                      100
                  )}
                  % OFF
                </span>
              </>
            ) : (
              <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
                ₹{currentProduct.price}
              </span>
            )}
          </div>

          {/* Rating */}
          {currentProduct.rating && currentProduct.rating.count > 0 && (
            <div style={{ marginBottom: "1rem" }}>
              <span style={{ fontSize: "1.1rem" }}>
                ★ {currentProduct.rating.average.toFixed(1)} (
                {currentProduct.rating.count} reviews)
              </span>
            </div>
          )}

          {/* Description */}
          <p style={{ marginBottom: "2rem", lineHeight: "1.6" }}>
            {currentProduct.description}
          </p>

          {/* Size Selection */}
          {currentProduct.sizes && currentProduct.sizes.length > 0 && (
            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}>
                Size:
              </label>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {currentProduct.sizes.map((sizeObj, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(sizeObj.size)}
                    disabled={sizeObj.stock === 0}
                    style={{
                      padding: "0.5rem 1rem",
                      border:
                        selectedSize === sizeObj.size
                          ? "2px solid #007bff"
                          : "1px solid #ddd",
                      backgroundColor:
                        selectedSize === sizeObj.size ? "#007bff" : "white",
                      color: selectedSize === sizeObj.size ? "white" : "#333",
                      borderRadius: "4px",
                      cursor: sizeObj.stock === 0 ? "not-allowed" : "pointer",
                      opacity: sizeObj.stock === 0 ? 0.5 : 1,
                    }}>
                    {sizeObj.size} {sizeObj.stock === 0 && "(Out of Stock)"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {currentProduct.colors && currentProduct.colors.length > 0 && (
            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}>
                Color:
              </label>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {currentProduct.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      padding: "0.5rem 1rem",
                      border:
                        selectedColor === color
                          ? "2px solid #007bff"
                          : "1px solid #ddd",
                      backgroundColor:
                        selectedColor === color ? "#007bff" : "white",
                      color: selectedColor === color ? "white" : "#333",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}>
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div style={{ marginBottom: "2rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}>
              Quantity:
            </label>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  backgroundColor: "white",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}>
                -
              </button>
              <span
                style={{
                  padding: "0.5rem 1rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  backgroundColor: "white",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}>
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            style={{
              width: "100%",
              padding: "1rem",
              background:
                "linear-gradient(270deg, #ff6a00, #ee0979, #007bff, #00c6ff)",
              backgroundSize: "600% 600%",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              marginBottom: "1rem",
              animation: "gradientBG 8s ease infinite",
            }}
            onMouseOver={(e) =>(e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}>
            Add to Cart
          </button>

          <style>
            {`
              @keyframes gradientBG {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}
          </style>

          {/* Product Tags */}
          {currentProduct.tags && currentProduct.tags.length > 0 && (
            <div style={{ marginTop: "2rem" }}>
              <h4>Tags:</h4>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {currentProduct.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      padding: "0.25rem 0.5rem",
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #dee2e6",
                      borderRadius: "4px",
                      fontSize: "0.9rem",
                    }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
