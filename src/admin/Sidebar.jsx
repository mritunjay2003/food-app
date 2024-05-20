import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white">
            <div className="p-6 text-2xl font-semibold">Tailblocks</div>
            <nav className="mt-10">
                <Link to="/" className="block py-2.5 px-4 hover:bg-gray-700">
                    Dashboard
                </Link>
                <Link to="/orders" className="block py-2.5 px-4 hover:bg-gray-700">
                    Orders
                </Link>
                <Link to="/products" className="block py-2.5 px-4 hover:bg-gray-700">
                    Products
                </Link>
                <Link to="/category" className="block py-2.5 px-4 hover:bg-gray-700">

                    categories
                </Link>
                <Link to="/customers" className="block py-2.5 px-4 hover:bg-gray-700">
                    Customers
                </Link>
                <Link to="/analytics" className="block py-2.5 px-4 hover:bg-gray-700">
                    Analytics
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
