import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (items.length === 0) {
      navigate("/cart");
      return;
    }

    if (user) {
      setShippingInfo({
        fullName: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address?.street || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        zipCode: user.address?.zipCode || "",
        country: user.address?.country || "",
      });
    }
  }, [isAuthenticated, items, navigate, user]);

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // Validate shipping info
    if (
      !shippingInfo.fullName ||
      !shippingInfo.email ||
      !shippingInfo.address ||
      !shippingInfo.city
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/payment/process-payment",
        {
          amount: totalWithTax,
          paymentMethod,
          shippingAddress: shippingInfo,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        // Clear cart
        dispatch({ type: "CLEAR_CART" });
        toast.success("Payment Successful!");

        // Navigate to payment success page without delay
        setTimeout(() => {
          navigate("/payment-success");
        }, 10);
      } else {
        toast.error(response.data.message || "Payment failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(
        error.response?.data?.message || "Payment failed. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const totalWithTax = totalAmount + totalAmount * 0.08;

  return (
    <div className="container" style={{ paddingTop: "10px" }}>
      <h1 style={{ fontFamily: "cursive", marginBottom: "50px" }}>Checkout</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
        }}>
        {/* Checkout Form */}
        <div>
          <form onSubmit={handlePayment}>
            {/* Shipping Information */}
            <div
              style={{
                marginBottom: "2rem",
                padding: "2rem",
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}>
              <h3>Shipping Information</h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginTop: "1rem",
                }}>
                <div>
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingInfo.fullName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      marginTop: "0.5rem",
                    }}
                  />
                </div>
                <div>
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      marginTop: "0.5rem",
                    }}
                  />
                </div>
                <div>
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      marginTop: "0.5rem",
                    }}
                  />
                </div>
                <div>
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      marginTop: "0.5rem",
                    }}
                  />
                </div>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <label>Address *</label>
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    marginTop: "0.5rem",
                  }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "1rem",
                  marginTop: "1rem",
                }}>
                <div>
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      marginTop: "0.5rem",
                    }}
                  />
                </div>
                <div>
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      marginTop: "0.5rem",
                    }}
                  />
                </div>
                <div>
                  <label>ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      marginTop: "0.5rem",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div
              style={{
                marginBottom: "2rem",
                padding: "2rem",
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}>
              <h3>Payment Method</h3>
              <div style={{ marginTop: "1rem" }}>
                {["card", "paypal", "cod"].map((method) => (
                  <label
                    key={method}
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      cursor: "pointer",
                    }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ marginRight: "0.5rem" }}
                    />
                    {method === "card" && "💳 Credit/Debit Card"}
                    {method === "paypal" && "🅿️ PayPal"}
                    {method === "cod" && "💵 Cash on Delivery"}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              style={{
                width: "100%",
                padding: "1rem",
                marginBottom: "2rem",
                background: isProcessing
                  ? "#ccc"
                  : "linear-gradient(270deg, #28a745, #20c997, #007bff, #6f42c1, #ff6a00)",
                backgroundSize: "600% 600%",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "1.1rem",
                cursor: isProcessing ? "not-allowed" : "pointer",
                animation: isProcessing
                  ? "none"
                  : "gradientMove 8s ease infinite",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseOver={(e) => {
                if (!isProcessing) {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 15px rgba(0, 0, 0, 0.2)";
                }
              }}
              onMouseOut={(e) => {
                if (!isProcessing) {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}>
              {isProcessing
                ? "Processing Payment..."
                : `Make Payment ($${totalWithTax.toFixed(2)})`}
            </button>

            <style>
              {`
                @keyframes gradientMove {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
              `}
            </style>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div
            style={{
              marginBottom: "2rem",
              padding: "2rem",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #ddd",
              position: "sticky",
              top: "120px",
            }}>
            <h3>Order Summary</h3>

            {/* Cart Items */}
            <div style={{ marginTop: "1rem" }}>
              {items.map((item) => (
                <div
                  key={item._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid #eee",
                  }}>
                  <div>
                    <p style={{ fontWeight: "bold", margin: 0 }}>
                      {item.product.name}
                    </p>
                    <p style={{ color: "#666", margin: 0, fontSize: "0.9rem" }}>
                      Size: {item.size} | Color: {item.color} | Qty:{" "}
                      {item.quantity}
                    </p>
                  </div>
                  <p style={{ fontWeight: "bold", margin: 0 }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div style={{ borderTop: "2px solid #ddd", paddingTop: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}>
                <span>Subtotal:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}>
                <span>Tax (8%):</span>
                <span>${(totalAmount * 0.08).toFixed(2)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  borderTop: "1px solid #ddd",
                  paddingTop: "0.5rem",
                }}>
                <span>Total:</span>
                <span>${totalWithTax.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
