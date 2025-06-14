import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css'; // We'll create this CSS file

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

 const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const handlePayment = async () => {
  const res = await loadRazorpayScript();
  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const options = {
    key: "rzp_test_Rljw3kyvD1pjKl", // Replace with your Razorpay Test Key
    amount: totalAmount * 100, // amount in paisa
    currency: "INR",
    name: "My Shop",
    description: "Test Transaction",
    image: "/your-logo.png", // optional
    handler: function (response: any) {
      alert("Payment successful! ID: " + response.razorpay_payment_id);
      clearCart();
      navigate('/home');
    },
    prefill: {
      name: "Test User",
      email: "test@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "My Shop, Mumbai",
    },
    theme: {
      color: "#2A3EAC",
    },
  };

  const paymentObject = new (window as any).Razorpay(options);
  paymentObject.open();
};


  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <button 
          onClick={() => navigate('/home')}
          className="continue-shopping-btn"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout Summary</h2>
      
      <div className="checkout-items">
        {cart.map(item => (
          <div key={item.id} className="checkout-item">
            <div className="item-info">
              <span className="item-name">{item.name}</span>
              <span className="item-quantity">x {item.quantity}</span>
            </div>
            <span className="item-price">
              ₹{(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="checkout-total">
        <span>Total Amount:</span>
        <span>₹{totalAmount.toFixed(2)}</span>
      </div>

      <div className="checkout-actions">
        <button 
          onClick={() => navigate('/cart')} 
          className="back-to-cart-btn"
        >
          Back to Cart
        </button>
        <button 
          onClick={handlePayment} 
          className="pay-now-btn"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Checkout;