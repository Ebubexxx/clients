import React, { useState, useEffect } from 'react';

// 1. Separate TimeDisplay Component
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
  const [subtotal, setSubTotal] = useState(0);
  const [shippingCosts, setShippingCosts] = useState({}); 
  const [totalShipping, setTotalShipping] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);

    const initialShipping = {};
    savedCart.forEach((_, index) => {
      initialShipping[index] = 0;
    });
    setShippingCosts(initialShipping);
  }, []);

  useEffect(() => {
    // Calculate Items Price in CENTS
    const itemsCents = cartItems.reduce((acc, item) => {
      // Ensure we are working with numbers
      const price = Number(item.priceCents) || 0;
      const qty = Number(item.quantity) || 1;
      return acc + (price * qty);
    }, 0);

    // Calculate Shipping in CENTS
    const shippingCents = Object.values(shippingCosts).reduce((a, b) => Number(a) + Number(b), 0);

    setSubTotal(itemsCents);
    setTotalShipping(shippingCents);
  }, [cartItems, shippingCosts]);

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    const newShipping = { ...shippingCosts };
    delete newShipping[indexToRemove];
    setShippingCosts(newShipping);
  };

  const handleRadioChange = (event, index) => {
    const val = Number(event.target.value);
    setShippingCosts(prev => ({
      ...prev,
      [index]: val
    }));
  };

  // Logic: Cents + Cents + Cents
  const tax = Math.round(subtotal * 0.1);
  const grandTotal = subtotal + totalShipping + tax;

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    const orderData = {
      orderId: `ORD-${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toISOString(),
      items: cartItems.map((item, index) => ({
        ...item,
        appliedShippingCents: shippingCosts[index] || 0
      })),
      summary: {
        subtotalCents: subtotal,
        shippingCents: totalShipping,
        taxCents: tax,
        totalCents: grandTotal
      }
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([...existingOrders, orderData]));
    localStorage.removeItem('cart');
    setCartItems([]);
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
          <div className='grid gap-4 lg:grid-cols-12'>

            {/* Left Side: Cart Items */}
            <div className='col-span-6 lg:col-span-7'>
              <div className="grid gap-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex flex-col gap-4 p-5 border rounded-xl shadow-sm bg-white hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-6">
                      <img
                        src={item.image?.startsWith('http') ? item.image : `/${item.image}`}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md bg-gray-100"
                      />
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-800">{item.name}</h4>
                        <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                        {/* FIX: Divide by 100 for display */}
                        <p className='text-blue-600 font-bold'>${(Number(item.priceCents) / 100).toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-xs text-red-400 hover:text-red-600 font-semibold uppercase tracking-wider"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs font-bold text-gray-500 uppercase mb-2">Delivery Option</p>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                          <input
                            type="radio"
                            name={`delivery-group-${index}`}
                            value="0"
                            checked={shippingCosts[index] === 0}
                            onChange={(e) => handleRadioChange(e, index)}
                            className="w-4 h-4"
                          />
                          Standard (Free)
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                          <input
                            type="radio"
                            name={`delivery-group-${index}`}
                            value="999"
                            checked={shippingCosts[index] === 999}
                            onChange={(e) => handleRadioChange(e, index)}
                            className="w-4 h-4"
                          />
                          Express ($9.99)
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Order Summary */}
            <div className='col-span-6 lg:col-span-5 p-6 border rounded-xl shadow-sm bg-white self-start sticky top-6'>
              <h2 className='text-xl font-bold text-gray-800 border-b pb-4 mb-4'>Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({cartItems.length}):</span>
                  {/* FIX: Divide by 100 for display */}
                  <span>${(subtotal / 100).toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping & handling:</span>
                  <span>${(totalShipping / 100).toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600 border-b pb-4">
                  <span>Estimated tax (10%):</span>
                  <span>${(tax / 100).toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-xl font-black text-red-600 pt-2">
                  <span>Order total:</span>
                  <span>${(grandTotal / 100).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-full shadow-lg transform active:scale-95 transition-all"
              >
                Place your order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;