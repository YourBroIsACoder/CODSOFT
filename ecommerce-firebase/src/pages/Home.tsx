import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Product } from '../types';
import './Home.css';
import { useCart } from '../context/CartContext';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, 'products'));
      const items: Product[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, 'id'>),
      }));
      setProducts(items);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Snacks', 'Beverages'];

  return (
    <div className="home-container">
      {/* Hero Banner */}
      <div className="banner">
        <h2>🛍️ Big Savings Week — Up to 50% Off!</h2>
        <p>Get your groceries delivered fast and fresh</p>
      </div>

      {/* Filters */}
      <div className="home-controls">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="category-dropdown"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Product Listing */}
      <h1 className="section-title">Explore Our Products</h1>

      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p>No products match your search. Try another keyword or category.</p>
        ) : (
          filteredProducts.map(prod => (
            <div key={prod.id} className="product-card">
  {prod.originalPrice != null && prod.originalPrice > prod.price && (
    <div className="discount-badge">
      {Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100)}% OFF
    </div>
  )}
  <div className="product-image-placeholder">
    <img src={prod.image} alt={prod.name} className="product-image" />
  </div>
  <h2 className="product-name">{prod.name}</h2>
  <p className="product-category">{prod.category}</p>
  <p className="product-price discounted-price">
    ₹{prod.price}
    {prod.originalPrice != null && prod.originalPrice > prod.price && (
      <span className="original-price">₹{prod.originalPrice}</span>
    )}
  </p>
  <div className="stars">⭐️⭐️⭐️⭐️☆</div>
  <button onClick={() => addToCart(prod)} className="buy-btn">
    Add to Cart
  </button>
</div>

          ))
        )}
      </div>
    </div>
  );
};

export default Home;
