import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  useEffect(() => {
    fetchOrders();
    fetchUserProfile();
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const userData = response.data;
      setProfileData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: {
          street: userData.address?.street || "",
          city: userData.address?.city || "",
          state: userData.address?.state || "",
          zipCode: userData.address?.zipCode || "",
          country: userData.address?.country || "",
        },
      });
    } catch (error) {
      toast.error("Failed to fetch user profile");
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/orders/my-orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(response.data);
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProfileData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/auth/profile", profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `http://localhost:5000/api/orders/${orderId}/cancel`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Order canceled successfully");
        fetchOrders(); // Refresh orders list
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to cancel order");
      }
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "#ffc107";
      case "shipped":
        return "#17a2b8";
      case "delivered":
        return "#28a745";
      case "canceled":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#28a745";
      case "pending":
        return "#ffc107";
      case "failed":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  return (
    <div className="container" style={{ paddingTop: "10px" }}>
      <h1 style={{ fontFamily: "cursive", marginBottom: "50px" }}>
        My Profile
      </h1>

      {/* Tab Navigation */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #ddd",
          marginBottom: "2rem",
          gap: "2rem",
        }}>
        <button
          onClick={() => setActiveTab("orders")}
          style={{
            padding: "1rem 0",
            background: "none",
            border: "none",
            borderBottom: activeTab === "orders" ? "2px solid #007bff" : "none",
            color: activeTab === "orders" ? "#007bff" : "#666",
            cursor: "pointer",
            fontSize: "1.1rem",
            fontWeight: activeTab === "orders" ? "bold" : "normal",
          }}>
          My Orders
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          style={{
            padding: "1rem 0",
            background: "none",
            border: "none",
            borderBottom:
              activeTab === "profile" ? "2px solid #007bff" : "none",
            color: activeTab === "profile" ? "#007bff" : "#666",
            cursor: "pointer",
            fontSize: "1.1rem",
            fontWeight: activeTab === "profile" ? "bold" : "normal",
          }}>
          Profile Settings
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div>
          <h3>Order History</h3>
          {loading ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <p>No orders found</p>
              <button
                onClick={() => (window.location.href = "/products")}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}>
                Start Shopping
              </button>
            </div>
          ) : (
            <div
              style={{
                marginBottom: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}>
              {orders.map((order) => (
                <div
                  key={order._id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    backgroundColor: "white",
                  }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}>
                    <div>
                      <h4 style={{ margin: "0 0 0.5rem 0" }}>
                        Order #{order._id.slice(-8)}
                      </h4>
                      <p style={{ margin: "0", color: "#666" }}>
                        Placed on{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ marginBottom: "0.5rem" }}>
                        <span
                          style={{
                            padding: "0.25rem 0.75rem",
                            borderRadius: "20px",
                            fontSize: "0.9rem",
                            fontWeight: "bold",
                            backgroundColor: getOrderStatusColor(
                              order.orderStatus
                            ),
                            color: "white",
                          }}>
                          {order.orderStatus.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <span
                          style={{
                            padding: "0.25rem 0.75rem",
                            borderRadius: "20px",
                            fontSize: "0.9rem",
                            fontWeight: "bold",
                            backgroundColor: getPaymentStatusColor(
                              order.paymentStatus
                            ),
                            color: "white",
                          }}>
                          Payment: {order.paymentStatus.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div style={{ marginBottom: "1rem" }}>
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          gap: "1rem",
                          padding: "0.5rem 0",
                          borderBottom:
                            index < order.items.length - 1
                              ? "1px solid #eee"
                              : "none",
                        }}>
                        {item.product.images &&
                        item.product.images.length > 0 ? (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "60px",
                              height: "60px",
                              backgroundColor: "#f0f0f0",
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.8rem",
                            }}>
                            No Image
                          </div>
                        )}
                        <div style={{ flex: 1 }}>
                          <h5 style={{ margin: "0 0 0.25rem 0" }}>
                            {item.product.name}
                          </h5>
                          <p
                            style={{
                              margin: "0",
                              color: "#666",
                              fontSize: "0.9rem",
                            }}>
                            Size: {item.size} | Color: {item.color} | Qty:{" "}
                            {item.quantity}
                          </p>
                        </div>
                        <div style={{ fontWeight: "bold" }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Total */}
                  <div
                    style={{
                      textAlign: "right",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      paddingTop: "1rem",
                      borderTop: "1px solid #ddd",
                      marginBottom: "1rem",
                    }}>
                    Total: ${order.totalAmount.toFixed(2)}
                  </div>

                  {/* Cancel Order Button */}
                  {order.orderStatus === "processing" && (
                    <div style={{ textAlign: "right" }}>
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        style={{
                          padding: "0.5rem 1rem",
                          backgroundColor: "#dc3545",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "0.9rem",
                        }}>
                        Cancel Order
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Profile Settings Tab */}
      {activeTab === "profile" && (
        <div>
          <form
            onSubmit={handleUpdateProfile}
            style={{
              maxWidth: "600px",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                  }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                  }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}>
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}>
                Street Address
              </label>
              <input
                type="text"
                name="address.street"
                value={profileData.address.street}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1rem",
              }}>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                  }}>
                  City
                </label>
                <input
                  type="text"
                  name="address.city"
                  value={profileData.address.city}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                  }}>
                  State
                </label>
                <input
                  type="text"
                  name="address.state"
                  value={profileData.address.state}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                  }}>
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="address.zipCode"
                  value={profileData.address.zipCode}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}>
                Country
              </label>
              <input
                type="text"
                name="address.country"
                value={profileData.address.country}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: "1rem",
                marginBottom: "2rem",
                background:
                  "linear-gradient(270deg, #007bff, #20c997, #6f42c1, #ff6a00, #28a745)",
                backgroundSize: "600% 600%",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "1rem",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                animation: "gradientMove 8s ease infinite",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 6px 15px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}>
              Update Profile
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
      )}
    </div>
  );
};

export default Profile;
