import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBasket, ShieldCheck, CircleHelp, Search, ShoppingCart, Menu, X } from 'lucide-react';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        /* The Intense Upward Shadow */
        <header className="w-full bg-white border-b border-gray-100 shadow-[0_-40px_60px_-15px_rgba(0,0,0,0.3)] relative z-50">

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-tighter text-blue-600">
                    Ebube
                </Link>

                {/* 1. Desktop Menu: ALWAYS visible on large screens (lg:flex) */}
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

                {/* Actions Section */}
                <div className="flex items-center gap-4">
                    {/* Orders: Hidden on very small mobile, visible on sm and up */}
                    <Link to="/orders" className="hidden sm:block">
                        <button className="text-sm font-medium border rounded-full px-5 py-2 hover:bg-gray-50 transition-all">
                            Orders
                        </button>
                    </Link>

                    {/* Cart: Always visible */}
                    <Link
                        to="/cart"
                        className="relative z-60 pointer-events-auto flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-all"
                    >
                        <ShoppingCart size={18} />
                        <span className="text-sm font-medium">Cart</span>
                    </Link>

                    {/* 2. Menu Toggle: ONLY visible on small screens (lg:hidden) */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 hover:bg-gray-100 rounded-full lg:hidden"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* 3. Mobile Dropdown: Only shows when isMenuOpen is true AND screen is small */}
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

            {/* Search Bar */}
            <div className="flex justify-center pb-6 mt-2 px-4">
                <div className="relative w-full max-w-2xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        className="w-full pl-12 pr-4 h-12 rounded-full border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.1)] focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:outline-none transition-all"
                        type="text"
                        placeholder="Search for products..."
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;