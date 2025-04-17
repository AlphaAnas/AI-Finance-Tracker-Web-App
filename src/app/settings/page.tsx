"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { auth } from "@/app/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { UserData } from "@/app/api/profile/userDataService";

interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    gender: "",
    dob: "",
    location: "",
    currency: "USD",
    timezone: "America/New_York",
    emailNotifications: true,
    darkMode: false,
  });
<<<<<<< Updated upstream
  
  const router = useRouter();

  // Check if user is logged in
=======

  const router = useRouter();

>>>>>>> Stashed changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        console.log("Redirecting to login");
<<<<<<< Updated upstream
        toast.error('Session expired. Please log in again.');
        setTimeout(() => {
          toast.dismiss();
        }, 1000);
        redirect("/login");
        return;
      }
      
      setUser(currentUser);
      await fetchUserData(currentUser.uid);
    });
    
=======
        toast.error("Session expired. Please log in again.");
        setTimeout(() => toast.dismiss(), 1000);
        redirect("/login");
        return;
      }

      setUser(currentUser);
      await fetchUserData(currentUser.uid);
    });

>>>>>>> Stashed changes
    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid: string) => {
    setIsLoading(true);
    try {
<<<<<<< Updated upstream
      // Use the API to fetch user data
      const response = await fetch(`/api/profile?uid=${uid}`);
      
=======
      const response = await fetch(/api/profile?uid=${uid});

>>>>>>> Stashed changes
      if (response.ok) {
        const result = await response.json();
        const data = result.data as UserData;
        setUserData(data);
        setFormData({
          firstName: data.firstName || "",
          surname: data.surname || "",
          email: data.email || "",
          gender: data.gender || "",
          dob: data.dob || "",
          location: data.location || "",
          currency: data.currency || "USD",
          timezone: data.timezone || "America/New_York",
<<<<<<< Updated upstream
          emailNotifications: data.emailNotifications || true,
          darkMode: data.darkMode || false,
        });
      } else {
        // No user found, will create when saving
        console.log("No user data found, will create new record on save");
        if (user) {
          setFormData({
            ...formData,
            firstName: user.displayName?.split(" ")[0] || "",
            surname: user.displayName?.split(" ")[1] || "",
            email: user.email || "",
          });
=======
          emailNotifications: data.emailNotifications ?? true,
          darkMode: data.darkMode ?? false,
        });
      } else {
        console.log("No user data found, will create new record on save");
        if (user) {
          setFormData((prev) => ({
            ...prev,
            firstName: user.displayName?.split(" ")[0] || "",
            surname: user.displayName?.split(" ")[1] || "",
            email: user.email || "",
          }));
>>>>>>> Stashed changes
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

<<<<<<< Updated upstream
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
=======
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
>>>>>>> Stashed changes
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

<<<<<<< Updated upstream
  const handleToggleChange = (name: string) => {
    setFormData({
      ...formData,
      [name]: !formData[name as keyof typeof formData],
    });
=======
  const handleToggleChange = (name: keyof typeof formData) => {
    setFormData((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
>>>>>>> Stashed changes
  };

  const handleSaveProfile = async () => {
    try {
      if (!user) return;

      const userDataToSave = {
        ...formData,
        uid: user.uid,
        createdAt: userData?.createdAt || new Date().toISOString(),
      };

<<<<<<< Updated upstream
      // Use the API to update user data
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
=======
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
>>>>>>> Stashed changes
        },
        body: JSON.stringify(userDataToSave),
      });

      if (response.ok) {
        setUserData(userDataToSave as UserData);
<<<<<<< Updated upstream
        toast.success('Profile updated successfully');
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error('Failed to update profile');
=======
        toast.success("Profile updated successfully");
      } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to update profile");
>>>>>>> Stashed changes
    }
  };

  if (isLoading) {
    return (
<<<<<<< Updated upstream
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Loading profile...</div>
          <div className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-b-purple-500 border-r-transparent border-l-transparent animate-spin mx-auto"></div>
        </div>
=======
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-xl animate-pulse">Loading Profile...</p>
>>>>>>> Stashed changes
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6">
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
<<<<<<< Updated upstream
          {/* Heading with 3D effect */}
=======
>>>>>>> Stashed changes
          <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg">
            Profile Settings
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Profile Section */}
            <section className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300 overflow-hidden">
                    {user?.photoURL ? (
<<<<<<< Updated upstream
                      <Image 
                        src={user.photoURL} 
                        alt="Profile" 
                        width={128} 
                        height={128} 
=======
                      <Image
                        src={user.photoURL}
                        alt="Profile"
                        width={128}
                        height={128}
>>>>>>> Stashed changes
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-white text-4xl">
                        {formData.firstName ? formData.firstName.charAt(0).toUpperCase() : "👤"}
                      </span>
                    )}
                  </div>
                  <button className="mt-4 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    Change Photo
                  </button>
                </div>
              </div>

              <div className="space-y-4">
<<<<<<< Updated upstream
                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <label className="text-sm text-gray-500">First Name</label>
                  <input 
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <label className="text-sm text-gray-500">Surname</label>
                  <input 
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleFormChange}
                    className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Enter your surname"
                  />
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <label className="text-sm text-gray-500">Email</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email || user?.email || ""}
                    onChange={handleFormChange}
                    className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Enter your email"
                    readOnly={!!user?.email}
                  />
                  {user?.emailVerified && (
                    <span className="mt-1 inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Verified</span>
                  )}
                </div>
                
=======
                {[
                  { label: "First Name", name: "firstName", type: "text" },
                  { label: "Surname", name: "surname", type: "text" },
                  { label: "Email", name: "email", type: "email", readOnly: !!user?.email },
                  { label: "Date of Birth", name: "dob", type: "date" },
                  { label: "Location", name: "location", type: "text" },
                ].map(({ label, name, type, readOnly }) => (
                  <div
                    key={name}
                    className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <label className="text-sm text-gray-500">{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={(formData as any)[name]}
                      onChange={handleFormChange}
                      className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder={Enter your ${label.toLowerCase()}}
                      readOnly={readOnly}
                    />
                    {name === "email" && user?.emailVerified && (
                      <span className="mt-1 inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Verified</span>
                    )}
                  </div>
                ))}

>>>>>>> Stashed changes
                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <label className="text-sm text-gray-500">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleFormChange}
                    className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
<<<<<<< Updated upstream
                
                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <label className="text-sm text-gray-500">Date of Birth</label>
                  <input 
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleFormChange}
                    className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <label className="text-sm text-gray-500">Location</label>
                  <input 
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Enter your location"
                  />
                </div>
              </div>
            </section>

            {/* Account Details Section */}
=======
              </div>
            </section>

            {/* Account Details and Preferences Section */}
>>>>>>> Stashed changes
            <section className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Details</h2>
                <div className="space-y-4">
<<<<<<< Updated upstream
                  <div className="bg-white/80 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                    <p className="text-sm text-gray-500">Account Type</p>
                    <p className="text-lg font-medium text-gray-800">Budget Tracker User</p>
                  </div>
                  <div className="bg-white/80 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="text-lg font-medium text-gray-800">
                      {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : "New User"}
                    </p>
                  </div>
                  <div className="bg-white/80 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                    <p className="text-sm text-gray-500">Account Status</p>
                    <p className="text-lg font-medium text-green-600">Active</p>
                  </div>
                  <div className="bg-white/80 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="text-lg font-medium text-gray-800">{user?.uid.substring(0, 8)}...</p>
                  </div>
=======
                  <InfoCard title="Account Type" value="Budget Tracker User" />
                  <InfoCard
                    title="Member Since"
                    value={
                      userData?.createdAt
                        ? new Date(userData.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                          })
                        : "New User"
                    }
                  />
                  <InfoCard title="Account Status" value="Active" color="green" />
                  <InfoCard title="User ID" value={${user?.uid.substring(0, 8)}...} />
>>>>>>> Stashed changes
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Preferences</h2>
                <div className="space-y-4">
<<<<<<< Updated upstream
                  <div className="bg-white/80 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                    <label className="text-sm text-gray-500">Default Currency</label>
                    <select 
                      name="currency"
                      value={formData.currency}
                      onChange={handleFormChange}
                      className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="JPY">JPY - Japanese Yen</option>
                    </select>
                  </div>
                  
                  <div className="bg-white/80 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                    <label className="text-sm text-gray-500">Time Zone</label>
                    <select 
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleFormChange}
                      className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white/80 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                    <span className="text-gray-700">Email Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={formData.emailNotifications}
                        onChange={() => handleToggleChange("emailNotifications")}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white/80 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                    <span className="text-gray-700">Dark Mode</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={formData.darkMode}
                        onChange={() => handleToggleChange("darkMode")}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
=======
                  <SelectCard
                    label="Default Currency"
                    name="currency"
                    value={formData.currency}
                    options={[
                      { value: "USD", label: "USD - US Dollar" },
                      { value: "EUR", label: "EUR - Euro" },
                      { value: "GBP", label: "GBP - British Pound" },
                      { value: "JPY", label: "JPY - Japanese Yen" },
                    ]}
                    onChange={handleFormChange}
                  />
                  <SelectCard
                    label="Time Zone"
                    name="timezone"
                    value={formData.timezone}
                    options={[
                      { value: "America/New_York", label: "Eastern Time (ET)" },
                      { value: "America/Chicago", label: "Central Time (CT)" },
                      { value: "America/Denver", label: "Mountain Time (MT)" },
                      { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
                    ]}
                    onChange={handleFormChange}
                  />
                  <ToggleCard
                    label="Email Notifications"
                    checked={formData.emailNotifications}
                    onChange={() => handleToggleChange("emailNotifications")}
                  />
                  <ToggleCard
                    label="Dark Mode"
                    checked={formData.darkMode}
                    onChange={() => handleToggleChange("darkMode")}
                  />
>>>>>>> Stashed changes
                </div>
              </div>
            </section>
          </div>

<<<<<<< Updated upstream
          {/* Action Buttons */}
          <div className="mt-8 flex gap-4 justify-end">
            <button 
=======
          <div className="mt-8 flex gap-4 justify-end">
            <button
>>>>>>> Stashed changes
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => router.back()}
            >
              Cancel
            </button>
<<<<<<< Updated upstream
            <button 
=======
            <button
>>>>>>> Stashed changes
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={handleSaveProfile}
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

<<<<<<< Updated upstream
=======
// Utility components for cleaner return block
const InfoCard = ({ title, value, color = "gray" }: { title: string; value: string; color?: string }) => (
  <div className="bg-white/80 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
    <p className="text-sm text-gray-500">{title}</p>
    <p className={text-lg font-medium text-${color}-800}>{value}</p>
  </div>
);

const SelectCard = ({
  label,
  name,
  value,
  options,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <div className="bg-white/80 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
    <label className="text-sm text-gray-500">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const ToggleCard = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <div className="flex items-center justify-between bg-white/80 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
    <span className="text-gray-700">{label}</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
    </label>
  </div>
);

>>>>>>> Stashed changes
export default ProfilePage;