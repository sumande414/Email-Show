import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 p-6">
            <div className="bg-white shadow-xl rounded-lg p-8 text-center max-w-lg w-full">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Welcome to EmailScout</h1>
                <p className="text-gray-700 text-lg mb-4">The best business email tracking app</p>
                <p className="text-gray-600 mb-4">We monitor the <span className="font-semibold text-gray-900">spyder@gmail.com</span> business account</p>
                <p className="text-gray-500 mb-6">Track emails, manage orders, and streamline your workflow with EmailScout.</p>

                <div className="space-y-4">
                    <button 
                        onClick={() => navigate('/email')} 
                        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 hover:bg-blue-700">
                        View Emails
                    </button>
                    <button 
                        onClick={() => navigate('/order')} 
                        className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 hover:bg-green-700">
                        View Orders
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
