import React, { useEffect, useState } from 'react'

function ReturnsOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);

  // --- NEW: Return Order Logic ---
  const handleReturnOrder = (orderId) => {
    // 1. Confirm with the user
    if (!window.confirm("Are you sure you want to return this order?")) return;

    // 2. Filter out the order with the matching ID
    const updatedOrders = orders.filter(order => order.orderId !== orderId);

    // 3. Update State and LocalStorage
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    alert(`Order ${orderId} has been returned.`);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8">Returns & Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">
          <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
          <a href="/" className="text-blue-600 font-medium hover:underline mt-4 block">
            Go shopping
          </a>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order, index) => (
            <div key={order.orderId || index} className="border rounded-2xl overflow-hidden shadow-sm bg-white">
              {/* Order Header */}
              <div className="bg-gray-100 p-4 flex flex-wrap justify-between items-center gap-4 text-sm text-gray-600">
                <div>
                  <p className="uppercase font-bold text-[10px]">Order Placed</p>
                  <p>{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="uppercase font-bold text-[10px]">Total</p>
                  <p className="font-bold text-gray-900">${(order.summary?.totalCents / 100).toFixed(2)}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="uppercase font-bold text-[10px]">Order #</p>
                  <p>{order.orderId}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 space-y-6">
                {order.items?.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex gap-6 items-center">
                    <img
                      src={item.image?.startsWith('http') ? item.image : `/${item.image}`}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      
                      <div className="flex gap-2 mt-3">
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-xs font-bold py-2 px-4 rounded-lg transition-colors">
                          Buy it again
                        </button>
                        
                        {/* THE RETURN BUTTON */}
                        <button 
                          onClick={() => handleReturnOrder(order.orderId)}
                          className="bg-white border border-gray-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-xs font-bold py-2 px-4 rounded-lg transition-all"
                        >
                          Return items
                        </button>
                      </div>
                    </div>

                    <div className="hidden md:block">
                      <button className="border border-gray-300 hover:bg-gray-50 text-sm py-2 px-6 rounded-lg transition-colors">
                        Track package
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ReturnsOrders;