import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container">
      {/* Popup Modal */}
      <div
        style={{
          textAlign: "center",
          padding: "3rem 2rem",
          maxWidth: "600px",
          margin: "0 auto",
        }}>
        {/* Success Icon */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "#28a745",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 2rem auto",
            fontSize: "3rem",
            color: "white",
          }}>
          ✓
        </div>

        <h1
          style={{
            color: "#28a745",
            marginBottom: "1rem",
            fontSize: "2.5rem",
          }}>
          Payment Successful!
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            color: "#666",
            marginBottom: "1rem",
          }}>
          Thank you for your order! Your payment has been processed
          successfully.
        </p>

        <p
          style={{
            fontSize: "1rem",
            color: "#888",
            marginBottom: "2rem",
          }}>
          You will receive an email confirmation shortly with your order details
          and tracking information.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}>
          {/* View My Orders */}
          <Link
            to="/profile"
            style={{
              padding: "1rem 2rem",
              background:
                "linear-gradient(270deg, #007bff, #20c997, #6f42c1, #ff6a00, #28a745)",
              backgroundSize: "600% 600%",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              display: "inline-block",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              animation: "gradientMove 8s ease infinite",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}>
            View My Orders
          </Link>

          {/* Continue Shopping */}
          <Link
            to="/products"
            style={{
              padding: "1rem 2rem",
              background:
                "linear-gradient(270deg, #ffffff, #f1f1f1, #eaeaea, #ffffff)",
              backgroundSize: "400% 400%",
              color: "#007bff",
              border: "2px solid #007bff",
              textDecoration: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              display: "inline-block",
              transition:
                "transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease",
              animation: "gradientMove 8s ease infinite",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.15)";
              e.currentTarget.style.background =
                "linear-gradient(270deg, #007bff, #0056b3)";
              e.currentTarget.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.background =
                "linear-gradient(270deg, #ffffff, #f1f1f1, #eaeaea, #ffffff)";
              e.currentTarget.style.color = "#007bff";
            }}>
            Continue Shopping
          </Link>

          {/* Gradient Animation */}
          <style>
            {`
              @keyframes gradientMove {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}
          </style>
        </div>

        {/* Additional Info */}
        <div
          style={{
            marginTop: "3rem",
            padding: "1.5rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #dee2e6",
          }}>
          <h4 style={{ marginBottom: "1rem", color: "#495057" }}>
            What's Next?
          </h4>
          <ul
            style={{
              textAlign: "left",
              color: "#666",
              lineHeight: "1.6",
              paddingLeft: "1.5rem",
            }}>
            <li>
              You'll receive an order confirmation email within a few minutes
            </li>
            <li>
              Your order will be processed and shipped within 1-2 business days
            </li>
            <li>Track your order status in your profile under "My Orders"</li>
            <li>Contact our support team if you have any questions</li>
          </ul>
        </div>

        {/* Customer Support */}
        <div style={{ marginTop: "2rem" }}>
          <p style={{ color: "#888", fontSize: "0.9rem" }}>
            Need help? Contact us at{" "}
            <a href="mailto:support@fashionx.com" style={{ color: "#007bff" }}>
              support@fashionx.com
            </a>{" "}
            or call{" "}
            <a href="tel:+1234567890" style={{ color: "#007bff" }}>
              (123) 456-7890
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
