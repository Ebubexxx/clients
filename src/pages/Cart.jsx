import React, { useState, useEffect } from 'react';

// 1. Separate TimeDisplay Component (Clean and Reusable)
function TimeDisplay() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white border border-gray-100 shadow-sm rounded-2xl w-fit mb-6">
      <div className="text-2xl font-mono font-bold text-black tracking-widest">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </div>
      <div className="text-[10px] uppercase tracking-tighter text-gray-400 font-semibold mt-1">
        {time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
      </div>
    </div>
  );
}

// 2. Main Cart Component
function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex justify-between items-start mb-8">
        <h2 className="text-3xl font-bold">Your Shopping Cart</h2>
        <TimeDisplay />
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
          <a href="/" className="text-blue-600 font-medium hover:underline mt-4 block">
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center gap-6 p-4 border rounded-xl shadow-sm bg-white hover:border-blue-200 transition-colors">
                <img
                  src={item.image.startsWith('http') ? item.image : `/${item.image}`}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md bg-gray-100"
                />

                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800 leading-tight">{item.name}</h4>
                  <p className="text-gray-500 text-sm mt-1">Quantity: {item.quantity}</p>
                  <p className="text-[10px] text-gray-300 mt-2 uppercase">ID: {item.productId.split('-')[0]}</p>
                </div>

                <button
                  onClick={() => removeFromCart(index)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove Item"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="mt-10 p-8 bg-black text-white rounded-3xl flex justify-between items-center shadow-xl">
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-widest">Total Items</p>
              <span className="text-3xl font-bold">{cartItems.length}</span>
            </div>
            <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-gray-200 transition-all transform hover:scale-105">
              Checkout Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;