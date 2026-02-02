import React, { useState, useEffect } from 'react'
import './index.css'
import Header from './components/Header'
import ListingCard from './components/ListingCard'
import Cart from './pages/Cart'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



function App() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure products.json is in your /public folder
    fetch('../public/product.json')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setLoading(false);
      });
  }, []);
  
  return (
    <div>
      <Header />
      
      <Routes>
        {/* HOME PAGE: Put the product grid here */}
        <Route path="/" element={
          <main className="max-w-7xl mx-auto px-6 py-10">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-xl font-semibold text-gray-500">Loading products...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                  <ListingCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        } />

        {/* CART PAGE: Only shows when URL is /cart */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App
