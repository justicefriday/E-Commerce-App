import React, { useState } from 'react';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address) {
      toast.error('Please fill in all fields');
      return;
    }

    //simulate sending order here
    console.log('Order submitted:', {
      customer: form,
      items: cart,
    });
    clearCart(); 
    toast.success('Thank you for ordering from us!');
    navigate('/');
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      <form onSubmit={handleSubmit} className="grid gap-4 mb-8">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded"
        />
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Shipping Address"
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Submit Order
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-2">Order Summary:</h3>
        <ul className="mb-4">
          {cart.map(item => (
            <li key={item.id}>
              {item.title} x {item.quantity} = ₦{(item.price * item.quantity).toLocaleString()}
            </li>
          ))}
        </ul>
        <p className="text-lg font-bold">Total: ₦{totalPrice.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default CheckoutPage;
