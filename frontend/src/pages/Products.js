import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    gender: searchParams.get("gender") || "",
    search: searchParams.get("search") || "",
    sort: searchParams.get("sort") || "newest",
  });
  const [categories, setCategories] = useState([]);

  const { products, loading, error, totalPages, currentPage } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [filters]);

  const fetchProducts = async () => {
    dispatch({ type: "PRODUCTS_LOADING" });
    try {
      const queryParams = new URLSearchParams();
      if (filters.category) queryParams.append("category", filters.category);
      if (filters.gender) queryParams.append("gender", filters.gender);
      if (filters.search) queryParams.append("search", filters.search);
      if (filters.sort) queryParams.append("sort", filters.sort);

      const response = await axios.get(
        `http://localhost:5000/api/products?${queryParams}`
      );
      dispatch({ type: "PRODUCTS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "PRODUCTS_ERROR",
        payload: error.response?.data?.message || "Failed to fetch products",
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    const newSearchParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) newSearchParams.append(k, v);
    });
    setSearchParams(newSearchParams);
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      gender: "",
      search: "",
      sort: "newest",
    });
    setSearchParams({});
  };

  if (loading) {
    return (
      <div
        className="container"
        style={{ paddingTop: "100px", textAlign: "center" }}>
        <div>Loading products...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={{ fontFamily: "cursive" }}>Products</h1>

      {/* Filters */}
      <div
        className="filters"
        style={{
          display: "flex",
          gap: "1.5rem",
          marginBottom: "2rem",
          padding: "1.5rem",
          backgroundColor: "white",
          borderRadius: "12px",
          flexWrap: "wrap",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          alignItems: "center",
          fontFamily: "Poppins, sans-serif",
        }}>
        {/* Search */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ fontWeight: "500", marginRight: "0.5rem" }}>
            Search:
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            placeholder="Search products..."
            style={{
              padding: "0.6rem 0.8rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              outline: "none",
              minWidth: "200px",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        {/* Category */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ fontWeight: "500", marginRight: "0.5rem" }}>
            Category:
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            style={{
              padding: "0.6rem 0.8rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              outline: "none",
              minWidth: "150px",
              cursor: "pointer",
            }}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Gender */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ fontWeight: "500", marginRight: "0.5rem" }}>
            Gender:
          </label>
          <select
            value={filters.gender}
            onChange={(e) => handleFilterChange("gender", e.target.value)}
            style={{
              padding: "0.6rem 0.8rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              outline: "none",
              minWidth: "120px",
              cursor: "pointer",
            }}>
            <option value="">All</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        {/* Sort */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ fontWeight: "500", marginRight: "0.5rem" }}>
            Sort by:
          </label>
          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
            style={{
              padding: "0.6rem 0.8rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              outline: "none",
              minWidth: "160px",
              cursor: "pointer",
            }}>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          style={{
            padding: "0.6rem 1.2rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "background 0.2s, transform 0.1s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056b3")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#007bff")
          }
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}>
          Clear Filters
        </button>
      </div>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>Error: {error}</div>
      )}

      {/* Products Grid */}
      <div
        className="products-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "2rem",
          marginBottom: "2rem",
        }}>
        {products.map((product) => (
          <div
            key={product._id}
            className="product-card"
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              textAlign: "center",
              backgroundColor: "white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
              cursor: "pointer",
            }}>
            <Link
              to={`/products/${product._id}`}
              style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ marginBottom: "1rem" }}>
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
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
              <h3 style={{ margin: "0.5rem 0", fontSize: "1.1rem" }}>
                {product.name}
              </h3>
              <p style={{ color: "#666", margin: "0.5rem 0" }}>
                {product.brand}
              </p>
              <div style={{ margin: "0.5rem 0" }}>
                {product.discountPrice > 0 ? (
                  <>
                    <span
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "#e74c3c",
                      }}>
                      ₹{product.discountPrice}
                    </span>
                    <span
                      style={{
                        textDecoration: "line-through",
                        marginLeft: "0.5rem",
                        color: "#999",
                      }}>
                      ₹{product.price}
                    </span>
                  </>
                ) : (
                  <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    ₹{product.price}
                  </span>
                )}
              </div>
              {product.rating && product.rating.count > 0 && (
                <div style={{ margin: "0.5rem 0" }}>
                  <span>
                    ★ {product.rating.average.toFixed(1)} (
                    {product.rating.count})
                  </span>
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>

      {products.length === 0 && !loading && (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>No products found matching your criteria.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "2rem",
          }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handleFilterChange("page", page)}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: currentPage === page ? "#007bff" : "white",
                color: currentPage === page ? "white" : "#007bff",
                border: "1px solid #007bff",
                borderRadius: "4px",
                cursor: "pointer",
              }}>
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
