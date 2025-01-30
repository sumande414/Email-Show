import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
    const [emailData, setEmailData] = useState([])
    const [selectedEmail, setSelectedEmail] = useState(null)

    const fetchData = async () => {
        try {
            const response = await axios.get('https://genovate.onrender.com/api/emails')
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
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                Fetching All Emails From MySQL Database
            </h1>
            <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="grid md:grid-cols-5 sm:grid-cols-2 bg-gray-200 text-gray-700 text-sm font-semibold p-3">
                    <p>#</p>
                    <p>Date & Time</p>
                    <p>Sender</p>
                    <p>Subject</p>
                    <p>Body</p>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-300">
                    {emailData.slice(0, 10).map((item, index) => (
                        <div 
                            className="grid md:grid-cols-5 sm:grid-cols-2 text-gray-800 text-sm p-3 hover:bg-gray-100 transition cursor-pointer" 
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

            {/* Modal for Email Details */}
            {selectedEmail && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-semibold mb-4">{selectedEmail.subject}</h2>
                        <p><strong>Sender:</strong> {selectedEmail.sender}</p>
                        <p><strong>Date:</strong> {new Date(selectedEmail.email_date).toLocaleString()}</p>
                        <p className="mt-4 text-gray-700">{selectedEmail.body}</p>
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
    )
}

export default Home
