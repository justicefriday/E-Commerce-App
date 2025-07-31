import React from 'react';
import { useCart } from '../Context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty.</h2>
        <Link
          to="/buy"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Go back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12">
      <h2 className="text-3xl font-bold mb-6">Your Shopping Cart</h2>
      <div className="grid gap-4">
        {cart.map(item => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-500">₦{item.price.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
              
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => increaseQuantity(item.id)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
              <p className="font-semibold">
                ₦{(item.price * item.quantity).toLocaleString()}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-2 text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-4 text-right">
        <p className="text-lg">Total Items: {totalItems}</p>
        <p className="text-xl font-bold">
          Total Price: ₦{totalPrice.toLocaleString()}
        </p>
      <Link to="/checkout">
  <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
    Proceed to Checkout
  </button>
    </Link>
      </div>
    </div>
  );
};

export default CartPage;
