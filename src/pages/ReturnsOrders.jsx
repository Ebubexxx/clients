import React, { useEffect, useState } from 'react'



function ReturnsOrders() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem('cart'));

    setOrder(savedOrder)

  });

  return (
    <div>
      
    </div>
  )
}

export default ReturnsOrders;
