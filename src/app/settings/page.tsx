import Image from "next/image";
import React from "react";


const ProfilePage = () => {
    return (
        <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-6">
            {/* Sidebar */}
            <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md">
                <hr className="border-blue-600 my-4" />
                <h2 className="text-xl mb-4 text-blue-600">General Preferences</h2>
                <nav>
                    <ul className="space-y-2">
                        <li className="text-blue-600 cursor-pointer">Dashboard</li> 
                        <li className="text-blue-600 cursor-pointer">Statistics</li>
                        <li className="text-blue-600 cursor-pointer">Transactions</li>
                        <li className="text-blue-600 cursor-pointer">Budget</li>
                        <li className="text-blue-600 cursor-pointer">Analysis</li>
                    </ul>
                </nav>
                <hr className="border-blue-600 my-4" />

                <h2 className="text-xl mt-6 text-blue-600">Other Preferences</h2>
                <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md w-full">
                    My Account
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4 text-blue-600">Your Profile</h1>
                <div className="bg-white p-6 rounded-lg shadow-md grid md:grid-cols-3 gap-6">
                    {/* Profile Details */}
                    <section className="md:col-span-1 border-r p-4">
                        <div className="text-center">
                            <div className="w-24 h-24 mx-auto border border-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-gray-500">YOUR IMAGE HERE</span>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">Add your image</p>
                        </div>
                        <h2 className="text-lg mt-4 text-blue-600">Your Personal Details</h2>
                        <div className="mt-2">
                            <p className="text-gray-500">Full Name</p>
                            <p className="bg-blue-100 p-2 rounded-md text-blue-600">Name Here</p>
                        </div>
                        <div className="mt-2">
                            <p className="text-gray-500">Email</p>
                            <p className="bg-blue-100 p-2 rounded-md text-blue-600">youremail@email.com</p>
                        </div>
                        <div className="mt-2">
                            <p className="text-gray-500">Phone No.</p>
                            <p className="bg-blue-100 p-2 rounded-md text-blue-600">+92-0900-78601</p>
                        </div>
                        <div className="mt-2">
                            <p className="text-gray-500">Your Location</p>
                            <p className="bg-blue-100 p-2 rounded-md text-blue-600">Karachi, Pakistan</p>
                        </div>
                        <div className="mt-4 flex gap-4">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex-1">
                                Edit Details
                            </button>
                            <button className="bg-blue-300 text-white px-4 py-2 rounded-md flex-1">
                                Cancel
                            </button>
                        </div>
                    </section>

                    {/* Payment Cards */}
                    <section className="md:col-span-2 p-4">
                        <h2 className="text-lg text-blue-600">Your Payment Cards</h2>
                        <div className="flex gap-4 mt-4">
                            <div className="bg-blue-500 text-white p-4 rounded-md flex-1 h-40 relative">
                                <p>ZAHV</p>
                                <p className="text-base tracking-widest font-mono mt-4">1101 2001 8723 7001</p>
                                {/* <p className="text-sm mt-2">Deep Shah - Exp: 06/27</p> */}

                                <div className="absolute bottom-4 left-4">
                                    <p className="text-xs uppercase text-white-100">Cardholder Name</p>
                                    <p className="text-sm mt-2">Deep Shah</p>
                                </div>

                                <div className="absolute bottom-4 right-4">
                                    <p className="text-xs uppercase text-white-100">Expiry Date</p>
                                    <p className="text-sm mt-2">06/27</p>
                                </div>
                            </div>

                            <div className="bg-blue-500 text-white p-4 rounded-md flex-1 h-40 relative">
                                <p>GHRD</p>
                                <p className="text-base tracking-widest font-mono mt-4">1101 2001 8723 7001</p>
                                {/* <p className="text-sm mt-2">Deep Shah - Exp: 06/27</p> */}

                                <div className="absolute bottom-4 left-4">
                                    <p className="text-xs uppercase text-white-100">Cardholder Name</p>
                                    <p className="text-sm mt-2">Deep Shah</p>
                                </div>

                                <div className="absolute bottom-4 right-4">
                                    <p className="text-xs uppercase text-white-100">Expiry Date</p>
                                    <p className="text-sm mt-2">06/27</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-4">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                                Manage Cards
                            </button>
                            <button className="bg-blue-300 text-white px-4 py-2 rounded-md">
                                Cancel
                            </button>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-lg text-blue-500">Your Account Details</h2>
                            <div className="mt-2 flex justify-between items-center gap-4">
                                <p className="text-gray-500">Full Name</p>
                                <p className="font-bold text-blue-500">Name Here</p>
                            </div>
                            <div className="mt-2 flex justify-between items-center gap-4">
                                <p className="text-gray-500">Finance Email</p>
                                <p className="font-bold text-blue-500">name@business.com</p>
                            </div>
                            <div className="mt-2 flex justify-between items-center gap-4">
                                <p className="text-gray-500">Profession</p>
                                <p className="font-bold text-blue-500">Bank Manager</p>
                            </div>
                            <div className="mt-2 flex justify-between items-center gap-4">
                                <p className="text-gray-500">Profile ID</p>
                                <p className="font-bold text-blue-500">XXXXXXXX</p>
                            </div>

                            <h2 className="text-lg font-bold mt-6">Your Banking Details</h2>
                            <div className="mt-2 flex justify-between items-center gap-4">
                                <p className="text-gray-500">KYC Verification</p>
                                <p className="font-bold text-blue-500">Verified</p>
                            </div>
                            <div className="mt-2 flex justify-between items-center gap-4">
                                <p className="text-gray-500">Card 1 Number</p>
                                <p className="font-bold text-blue-500">XXXX XXXX XXXX 7001</p>
                            </div>
                            <div className="mt-2 flex justify-between items-center gap-4">
                                <p className="text-gray-500">Card 2 Number</p>
                                <p className="font-bold text-blue-500">XXXX XXXX XXXX 9854</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
