// src/components/Navbar.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css'; // Ensure this import exists

const Navbar: React.FC = () => {
  const { currentUser } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-brand">
          <h1>🛒 MyShop</h1>
        </Link>

        <div className="navbar-links">
          {currentUser && (
            <>
              <Link to="/home" className="nav-link">Home</Link>
              <Link to="/cart" className="nav-link">
                Cart {cartItemCount > 0 && (
                  <span className="cart-count">{cartItemCount}</span>
                )}
              </Link>
            </>
          )}
        </div>

        <div className="navbar-user">
          {currentUser ? (
            <>
              <span className="user-email">{currentUser.email}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="login-btn">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;