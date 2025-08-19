import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      dispatch({ type: "REGISTER_SUCCESS", payload: response.data });
      toast.success("Registration successful!");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
        marginBottom: "20px",
      }}>
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          padding: "30px",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
        }}>
        <h2 style={{ marginBottom: "20px", color: "#333", fontSize: "1.8rem" }}>
          Register at FashionX
        </h2>
        <form onSubmit={handleSubmit}>
          {["name", "email", "password", "confirmPassword"].map(
            (field, index) => (
              <div
                key={index}
                style={{ textAlign: "left", marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "600",
                    color: "#555",
                  }}>
                  {field === "confirmPassword"
                    ? "Confirm Password"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field.includes("password") ? "password" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "border 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#007bff";
                    e.target.style.boxShadow = "0 0 6px rgba(0,123,255,0.3)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#ddd";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            )
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: "#fff",
              background:
                "linear-gradient(270deg, #007bff, #20c997, #6f42c1, #ff6a00, #28a745)",
              backgroundSize: "600% 600%",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "10px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              animation: loading ? "none" : "gradientMove 8s ease infinite",
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.2)";
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }
            }}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p style={{ marginTop: "20px", textAlign: "center", color: "#555" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#007bff",
              fontWeight: "bold",
              textDecoration: "none",
            }}>
            Login here
          </Link>
        </p>
      </div>

      <style>
        {`
      @keyframes gradientBG {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `}
      </style>
    </div>
  );
};

export default Register;
