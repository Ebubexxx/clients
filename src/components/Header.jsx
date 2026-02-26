import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBasket, ShieldCheck, CircleHelp, Search, ShoppingCart, Menu, X } from 'lucide-react';

// So.. we’re still grabbing these from App.js to keep the search logic in sync.
function Header({ searchTerm, setSearchTerm }) {
    // Just tracking if the mobile menu is popped open or nah.
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        // z-50 keeps this on top so nothing slides over your navigation.
        <header className="w-full bg-white border-b border-gray-100 shadow-sm relative z-50">

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                {/* Just the logo link. Simple vibes. */}
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

                {/* All the clickable actions over on the right. */}
                <div className="flex items-center gap-4">
                    {/* So.. I removed the 'hidden' class here so this button stops disappearing on mobile. */}
                    <Link to="/orders">
                        <button className="text-sm font-medium border rounded-full px-5 py-2 hover:bg-gray-50 transition-all">
                            Orders
                        </button>
                    </Link>

                    {/* The cart button. Made it black so it stands out from the rest. */}
                    <Link
                        to="/cart"
                        className="relative z-60 pointer-events-auto flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-all"
                    >
                        <ShoppingCart size={18} />
                        <span className="text-sm font-medium">Cart</span>
                    </Link>

                    {/* The hamburger icon for mobile users. */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 hover:bg-gray-100 rounded-full lg:hidden"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* This is the mobile menu. It only drops down if you actually hit that icon. */}
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

            {/* The search bar part. Centered it to keep things looking balanced. */}
            <div className="flex justify-center pb-6 mt-2 px-4">
                <div className="relative w-full max-w-2xl">
                    {/* Just a search icon sitting pretty inside the input box. */}
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    
                    <input
                        className="w-full pl-12 pr-12 h-12 rounded-full border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)] focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:outline-none transition-all"
                        type="text"
                        placeholder="Search for products..."
                        
                        // Linking the box to the searchTerm state from App.js.
                        value={searchTerm}
                        // This part makes the filtering happen as soon as you type.
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* This 'X' button only shows up if the user has actually typed something. */}
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