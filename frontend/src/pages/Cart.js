import React, { useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalAmount, loading, error } = useSelector(
    (state) => state.cart
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   fetchCart();
  // }, [fetchCart]);

  const fetchCart = useCallback(async () => {
    dispatch({ type: "CART_LOADING" });
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "CART_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "CART_ERROR",
        payload: error.response?.data?.message || "Failed to fetch cart",
      });
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/cart/update/${itemId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({ type: "UPDATE_CART_SUCCESS", payload: response.data });
      toast.success("Cart updated!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update cart");
    }
  };

  const removeItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/api/cart/remove/${itemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({ type: "REMOVE_FROM_CART_SUCCESS", payload: response.data });
      toast.success("Item removed from cart!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:5000/api/cart/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "CLEAR_CART" });
      toast.success("Cart cleared!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to clear cart");
    }
  };

  if (!isAuthenticated) {
    return (
      <div
        className="container"
        style={{ paddingTop: "100px", textAlign: "center" }}>
        <h1>Shopping Cart</h1>
        <div className="card" style={{ padding: "2rem" }}>
          <p>Please login to view your cart</p>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className="container"
        style={{ paddingTop: "100px", textAlign: "center" }}>
        <div>Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "100px" }}>
      <h1>Shopping Cart</h1>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>Error: {error}</div>
      )}

      {items.length === 0 ? (
        <div
          className="card"
          style={{ marginTop: "2rem", padding: "2rem", textAlign: "center" }}>
          <p
            style={{
              marginBottom: "1rem",
              textAlign: "center",
              fontFamily: "cursive",
            }}>
            Your cart is empty
          </p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "2rem",
          }}>
          {/* Cart Items */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}>
              <h3>Items ({items.length})</h3>
              <button
                onClick={clearCart}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}>
                Clear Cart
              </button>
            </div>

            {items.map((item) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "1rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                  backgroundColor: "white",
                }}>
                {/* Product Image */}
                <div style={{ flexShrink: 0 }}>
                  {item.product.images && item.product.images.length > 0 ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "4px",
                      }}>
                      No Image
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div style={{ flex: 1 }}>
                  <Link
                    to={`/products/${item.product._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}>
                    <h4 style={{ margin: "0 0 0.5rem 0" }}>
                      {item.product.name}
                    </h4>
                  </Link>
                  <p style={{ color: "#666", margin: "0.25rem 0" }}>
                    Size: {item.size}
                  </p>
                  <p style={{ color: "#666", margin: "0.25rem 0" }}>
                    Color: {item.color}
                  </p>
                  <p style={{ fontWeight: "bold", margin: "0.5rem 0" }}>
                    ${item.price}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                  }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                      style={{
                        padding: "0.25rem 0.5rem",
                        border: "1px solid #ddd",
                        backgroundColor: "white",
                        cursor: "pointer",
                        borderRadius: "4px",
                      }}>
                      -
                    </button>
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        minWidth: "40px",
                        textAlign: "center",
                      }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      style={{
                        padding: "0.25rem 0.5rem",
                        border: "1px solid #ddd",
                        backgroundColor: "white",
                        cursor: "pointer",
                        borderRadius: "4px",
                      }}>
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item._id)}
                    style={{
                      padding: "0.5rem",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                    }}>
                    Remove
                  </button>
                </div>

                {/* Item Total */}
                <div style={{ textAlign: "right", minWidth: "100px" }}>
                  <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div
              style={{
                marginBottom: "2rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1.5rem",
                backgroundColor: "white",
                position: "sticky",
                top: "120px",
              }}>
              <h3 style={{ marginBottom: "1rem" }}>Order Summary</h3>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}>
                <span>Subtotal ({items.length} items):</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}>
                <span>Shipping:</span>
                <span>Free</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}>
                <span>Tax:</span>
                <span>${(totalAmount * 0.08).toFixed(2)}</span>
              </div>

              <hr style={{ margin: "1rem 0" }} />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "1.5rem",
                }}>
                <span>Total:</span>
                <span>${(totalAmount + totalAmount * 0.08).toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                style={{
                  width: "100%",
                  padding: "1rem",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginBottom: "1rem",
                }}>
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                style={{
                  display: "block",
                  textAlign: "center",
                  color: "#007bff",
                  textDecoration: "none",
                  padding: "0.5rem",
                }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
