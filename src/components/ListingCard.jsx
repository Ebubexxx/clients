import React, { useEffect, useState } from 'react';

const ListingCard = ({ product }) => {
  const price = (product.priceCents / 100).toFixed(2);
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  {/*To Handle Click, Plus showing text of added to cart */ }
const handleAddToCart = () => {
  setIsAdded(true);

  const cartItem = {
    productId: product.id,
    quantity: quantity,
    name: product.name,
    image: product.image
  };

  // 1. Get current cart from storage, or an empty array if it's empty
  const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

  // 2. Add the new item to the list
  existingCart.push(cartItem);

  // 3. Save the list back to the browser's memory
  localStorage.setItem('cart', JSON.stringify(existingCart));

  console.log("Saved to LocalStorage:", cartItem);

  // Reset timer for the "Added" message
  setTimeout(() => {
    setIsAdded(false);
  }, 2000);
};

  return (

    <div className='flex flex-col pt-10 pb-6.25 px-6.25 border-r border-b border-[#e7e7e7]'>
      {/*Img Container*/}
      <div className='flex items-center justify-center'>
        <img
          src={product.image}
          alt={product.name}
          className='flex items-center justify-center h-45 mb-5'
        />
      </div>

      {/*Name Container */}
      <div className='h-10 mb-1.25'>
        ${product.name}
      </div>

      <div className=''>
        <img className='h-5'
          src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
        <div className=''>
          {product.rating.stars.toFixed(1)}
        </div>
      </div>

      <div className='font-bold mb-2.5'>
        ${price}
      </div>

      <div className='mb-4.25'>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="bg-gray-100 border border-gray-300 rounded-md p-1"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      {/* The "Added" message */}
      <div className={`flex items-center text-[16px] text-[#067d62] mb-2 transition-opacity duration-300 ${isAdded ? 'opacity-100' : 'opacity-0'}`}>
        <img className='w-5 h-5 mr-2' src="images/icons/checkmark.png" alt="check" />
        Added
      </div>

      {/* The Button */}
      <button
        onClick={handleAddToCart}
        className='w-full p-2 rounded-full bg-[#ffd814] active:bg-[#f7ca00]'
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ListingCard;
