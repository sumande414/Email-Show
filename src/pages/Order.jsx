import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Order = () => {
    const [emailData, setEmailData] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const navigate = useNavigate();

    const refreshHandler = async () => {
        await axios.get('https://refresh-genovate.onrender.com/refresh');
        await axios.get('https://genovate-refresh-orders.onrender.com/process-orders');
        fetchData()
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('https://genovate.vercel.app/orders');
            setEmailData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                Fetching All Orders Extracted From MySQL Database
            </h1>
            <div className="flex gap-4 mb-4">
                <button onClick={refreshHandler} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Refresh</button>
                <button onClick={() => navigate('/')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Home</button>
                <button onClick={() => navigate('/email')} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Emails</button>
            </div>
            <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg overflow-hidden">
                
                <div className="grid md:grid-cols-8 sm:grid-cols-2 bg-blue-600 text-white text-sm font-semibold p-3">
                    <p>#</p>
                    <p>Order ID</p>
                    <p>Date & Time</p>
                    <p>Customer Email</p>
                    <p>Address</p>
                    <p>Product Name</p>
                    <p>Quantity</p>
                    <p>Status</p>
                </div>

                
                <div className="divide-y divide-gray-300">
                    {emailData.map((item, index) => (
                        <div 
                            className="grid md:grid-cols-8 sm:grid-cols-2 text-gray-800 text-sm p-3 hover:bg-gray-200 transition cursor-pointer" 
                            key={index}
                            onClick={() => setSelectedEmail(item)}
                        >
                            <p className="font-medium">{index + 1}</p>
                            <p className="truncate text-gray-500">{item.order_id}</p>
                            <p>{new Date(item.date_of_order).toLocaleString()}</p>
                            <p className="font-medium text-blue-600">{item.customer_email}</p>
                            <p className="truncate text-gray-700">{item.address}</p>
                            <p className="truncate text-gray-500">{item.product_name}</p>
                            <p className="truncate text-gray-500">{item.quantity}</p>
                            <p className="truncate text-gray-500">{item.status}</p>
                        </div>
                    ))}
                </div>
            </div>

            
            {selectedEmail && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                        <p><strong>Order ID:</strong> {selectedEmail.order_id}</p>
                        <p><strong>Customer Email:</strong> {selectedEmail.customer_email}</p>
                        <p><strong>Date of Order:</strong> {new Date(selectedEmail.date_of_order).toLocaleString()}</p>
                        <p><strong>Address:</strong> {selectedEmail.address}</p>
                        <p><strong>Product Name:</strong> {selectedEmail.product_name}</p>
                        <p><strong>Quantity:</strong> {selectedEmail.quantity}</p>
                        <p><strong>Status:</strong> {selectedEmail.status}</p>
                        <button 
                            onClick={() => setSelectedEmail(null)}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Order;