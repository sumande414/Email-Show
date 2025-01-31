import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Email = () => {
    const [emailData, setEmailData] = useState([])
    const [selectedEmail, setSelectedEmail] = useState(null)

    const navigate = useNavigate();

    const refreshHandler = async () => {
        await axios.get('https://refresh-genovate.onrender.com/refresh');
        await axios.get('https://genovate-refresh-orders.onrender.com/process-orders');
        fetchData();
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(' https://genovate.vercel.app/emails')
            setEmailData(response.data)
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
                Email Inbox
            </h1>
            <div className="flex gap-4 mb-4">
                <button onClick={refreshHandler} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Refresh</button>
                <button onClick={() => navigate('/')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Home</button>
                <button onClick={() => navigate('/order')} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Orders</button>
            </div>
            <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
                
                <div className="grid md:grid-cols-5 sm:grid-cols-2 bg-blue-500 text-white text-sm font-semibold p-4">
                    <p>#</p>
                    <p>Date & Time</p>
                    <p>Sender</p>
                    <p>Subject</p>
                    <p>Body</p>
                </div>

                
                <div className="divide-y divide-gray-300">
                    {emailData.map((item, index) => (
                        <div 
                            className="grid md:grid-cols-5 sm:grid-cols-2 text-gray-800 text-sm p-4 hover:bg-gray-100 transition cursor-pointer" 
                            key={index}
                            onClick={() => setSelectedEmail(item)}
                        >
                            <p className="font-medium">{index + 1}</p>
                            <p>{new Date(item.email_date).toLocaleString()}</p>
                            <p className="font-medium text-blue-600">{item.sender}</p>
                            <p className="truncate text-gray-700">{item.subject}</p>
                            <p className="truncate text-gray-500">{item.body}</p>
                        </div>
                    ))}
                </div>
            </div>

            
            {selectedEmail && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full border border-gray-300">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">{selectedEmail.subject}</h2>
                        <p className="text-gray-800"><strong>Sender:</strong> {selectedEmail.sender}</p>
                        <p className="text-gray-800"><strong>Date:</strong> {new Date(selectedEmail.email_date).toLocaleString()}</p>
                        <p className="mt-4 text-gray-700">{selectedEmail.body}</p>
                        <button 
                            onClick={() => setSelectedEmail(null)}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Email