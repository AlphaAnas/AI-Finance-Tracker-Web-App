import Image from "next/image";
import React from "react";

const ProfilePage = () => {
    return (
        <div className="flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6">
            {/* Main Content */}
            <main className="flex-1 p-6">
                <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
                    {/* Heading with 3D effect */}
                    <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg">
                        Profile Settings
                    </h1>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Profile Section */}
                        <section className="space-y-6">
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="text-center">
                                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                                        <span className="text-white text-xl">👤</span>
                                    </div>
                                    <button className="mt-4 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                                        Change Photo
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                                    <label className="text-sm text-gray-500">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                                    <label className="text-sm text-gray-500">Email</label>
                                    <input 
                                        type="email" 
                                        className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                                    <label className="text-sm text-gray-500">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                                    <label className="text-sm text-gray-500">Location</label>
                                    <input 
                                        type="text" 
                                        className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                        placeholder="Enter your location"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Account Details Section */}
                        <section className="space-y-6">
                            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Details</h2>
                                <div className="space-y-4">
                                    <div className="bg-white/80 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                                        <p className="text-sm text-gray-500">Account Type</p>
                                        <p className="text-lg font-medium text-gray-800">Premium Member</p>
                                    </div>
                                    <div className="bg-white/80 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                                        <p className="text-sm text-gray-500">Member Since</p>
                                        <p className="text-lg font-medium text-gray-800">January 2024</p>
                                    </div>
                                    <div className="bg-white/80 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                                        <p className="text-sm text-gray-500">Account Status</p>
                                        <p className="text-lg font-medium text-green-600">Active</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl shadow-lg">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Preferences</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between bg-white/80 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                                        <span className="text-gray-700">Email Notifications</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between bg-white/80 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                                        <span className="text-gray-700">Dark Mode</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex gap-4 justify-end">
                        <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 shadow-md hover:shadow-lg">
                            Cancel
                        </button>
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg">
                            Save Changes
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
