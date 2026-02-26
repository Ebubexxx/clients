import React, { useState, useEffect } from 'react'
import './index.css'
import Header from './components/Header'
import ListingCard from './components/ListingCard'
import Cart from './pages/Cart'
import ReturnsOrders from './pages/ReturnsOrders'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // This is where we park whatever the user types in the search bar
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Grabbing the data from the public folder. Just simple fetch vibes.
    fetch('/product.json')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Oops, something went sideways:", err);
        setLoading(false);
      });
  }, []);

  // So.. this part handles the "magic." It checks the name AND the keywords 
  // so if you type "socks" it finds it even if it's just a keyword.
  const filteredProducts = products.filter((product) => {
    const query = searchTerm.toLowerCase();
    const matchesName = product.name.toLowerCase().includes(query);
    const matchesKeyword = product.keywords?.some((keyword) => 
      keyword.toLowerCase().includes(query)
    );

    return matchesName || matchesKeyword;
  });

  return (
    <div>
      {/* Passing the search stuff to the Header so the input actually works */}
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <Routes>
        <Route path="/" element={
          <main className="max-w-7xl mx-auto px-6 py-10">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-xl font-semibold text-gray-500">Just a sec, loading...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {/* If we find stuff, show it. If not, tell 'em it's empty. */}
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ListingCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20">
                    <p className="text-stone-400">Couldn't find anything for "{searchTerm}" – try something else?</p>
                  </div>
                )}
              </div>
            )}
          </main>
        } />

        <Route path="/cart" element={<Cart />} />
        <Route path='/orders' element={<ReturnsOrders />} />
      </Routes>
    </div>
  )
}

export default App