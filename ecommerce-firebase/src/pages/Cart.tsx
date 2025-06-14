import React from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty 🛒</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    {item.quantity}
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </td>
                  <td>₹{item.price}</td>
                  <td>₹{item.price * item.quantity}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Total: ₹{total}</h3>
          <button onClick={clearCart} className="clear-cart-btn">
            Clear Cart
          </button>
          <Link to="/checkout">
            <button className="checkout-btn">Proceed to Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
