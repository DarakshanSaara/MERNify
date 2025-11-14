import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const { products, fetchProducts, loading } = useApp();
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    sort: 'name',
    order: 'asc'
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Filter and sort products based on filters
  const filteredProducts = products
    .filter(product => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sort === 'name') {
        return filters.order === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (filters.sort === 'price') {
        return filters.order === 'asc' 
          ? a.price - b.price
          : b.price - a.price;
      }
      return 0;
    });

  const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'];

  if (loading && products.length === 0) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Discover amazing products at great prices</p>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search products..."
          />
        </div>

        <div className="filter-group">
          <label>Category:</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Sort By:</label>
          <select
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <select
            name="order"
            value={filters.order}
            onChange={handleFilterChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        ) : (
          filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>

      {loading && <div className="loading-more">Loading more products...</div>}
    </div>
  );
};

export default Products;