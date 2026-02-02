import React, { useState } from 'react';

function DeliveryOptions({ productId, deliveryOptions }) {
  // Use state to track which delivery option is selected for THIS product
  // Default to the first option's ID
  const [selectedOption, setSelectedOption] = useState(deliveryOptions[0].id);

  return (
    <div className="flex flex-col gap-3 mt-4">
      <p className="font-bold text-sm">Choose a delivery option:</p>
      
      {deliveryOptions.map((option) => {
        const isChecked = selectedOption === option.id;

        return (
          <label 
            key={option.id}
            className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
              isChecked ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              className="w-4 h-4 cursor-pointer accent-blue-600"
              name={`delivery-option-${productId}`}
              checked={isChecked}
              onChange={() => setSelectedOption(option.id)}
            />
            
            <div className="flex flex-col">
              <div className="font-semibold text-green-700 text-sm">
                {option.dateString}
              </div>
              <div className="text-gray-500 text-xs">
                {option.priceCents === 0 ? 'FREE' : `$${(option.priceCents / 100).toFixed(2)}`} - Shipping
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
}

export default DeliveryOptions;