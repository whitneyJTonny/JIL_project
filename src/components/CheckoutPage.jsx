import React from 'react';
import { useCart } from '../../src/context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  // Calculate total price safely (default price and quantity to 0 if undefined)
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + (item.price ?? 0) * (item.quantity ?? 0),
    0
  );

  const handlePayment = () => {
    // Placeholder for payment gateway integration
    alert('Proceeding to payment...');
    clearCart();
    navigate('/'); // Redirect to home after payment
  };

  if (cartItems.length === 0) {
    return <p className="empty-cart">Your cart is empty.</p>;
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <table className="checkout-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price (each)</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(({ id, name, quantity = 0, price = 0 }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{quantity}</td>
              <td>${price.toFixed(2)}</td>
              <td>${(price * quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="total-row">
            <td colSpan="3">Total</td>
            <td>${totalPrice.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <button className="payment-button" onClick={handlePayment}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default CheckoutPage;
