import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBasket, ShieldCheck, CircleHelp, Search, ShoppingCart, Menu, X } from 'lucide-react';

// So.. we’re grabbing these two things from App.js. 
// One holds the text, the other changes it. You get the vibe.
function Header({ searchTerm, setSearchTerm }) {
    // Just a quick check to see if the mobile menu is popped open or nah.
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        // z-50 is just to make sure this stays on top of everything. No sliding under stuff.
        <header className="w-full bg-white border-b border-gray-100 shadow-sm relative z-50">

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                {/* Just the name of the spot. Simple. */}
                <Link to="/" className="text-2xl font-bold tracking-tighter text-blue-600">
                    Ebube
                </Link>

                {/* Desktop menu stuff. Only shows up when the screen is big enough. */}
                <nav className="hidden lg:flex items-center gap-8 font-medium text-sm">
                    <Link to="/" className="flex items-center gap-2 text-black hover:text-blue-600 transition-colors">
                        <ShoppingBasket size={18} /> Shop
                    </Link>
                    <Link to="/support" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors">
                        <ShieldCheck size={18} /> Support
                    </Link>
                    <Link to="/about" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors">
                        <CircleHelp size={18} /> About
                    </Link>
                </nav>

                {/* All the clickable actions over on the right side. */}
                <div className="flex items-center gap-4">
                    {/* Hiding the orders button on tiny screens so it doesn't look messy. */}
                    <Link to="/orders" className="hidden sm:block">
                        <button className="text-sm font-medium border rounded-full px-5 py-2 hover:bg-gray-50 transition-all">
                            Orders
                        </button>
                    </Link>

                    {/* The cart. Made it black so it pops out more. */}
                    <Link
                        to="/cart"
                        className="relative z-60 pointer-events-auto flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-all"
                    >
                        <ShoppingCart size={18} />
                        <span className="text-sm font-medium">Cart</span>
                    </Link>

                    {/* The hamburger icon for mobile. Click it and things happen. */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 hover:bg-gray-100 rounded-full lg:hidden"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* This is the mobile menu. It only drops down if you actually click that icon. */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 py-6 px-8 flex flex-col gap-6 lg:hidden shadow-2xl z-40">
                    <Link onClick={() => setIsMenuOpen(false)} to="/" className="flex items-center gap-3 text-lg font-medium">
                        <ShoppingBasket size={22} /> Shop
                    </Link>
                    <Link onClick={() => setIsMenuOpen(false)} to="/support" className="flex items-center gap-3 text-lg font-medium">
                        <ShieldCheck size={22} /> Support
                    </Link>
                    <Link onClick={() => setIsMenuOpen(false)} to="/about" className="flex items-center gap-3 text-lg font-medium">
                        <CircleHelp size={22} /> About
                    </Link>
                </div>
            )}

            {/* The search bar part. Centered it so it looks balanced. */}
            <div className="flex justify-center pb-6 mt-2 px-4">
                <div className="relative w-full max-w-2xl">
                    {/* Just a little search icon sitting inside the box. */}
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    
                    <input
                        className="w-full pl-12 pr-12 h-12 rounded-full border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)] focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:outline-none transition-all"
                        type="text"
                        placeholder="Search for products..."
                        
                        // So.. this makes the input box show whatever is in the 'searchTerm'.
                        value={searchTerm}
                        // And this part updates the search as soon as you type a letter.
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* This little 'X' button only shows up if you actually typed something. */}
                    {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black p-1"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;