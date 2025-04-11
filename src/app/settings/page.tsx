"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { auth, db2 } from "src/app/firebase.js";
import { useAuth } from '@/app/context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { db } from '@/app/firebase';

interface UserData {
  firstName: string;
  surname: string;
  dob: string;
  gender: string;
  email: string;
  profilePicture?: string;
  createdAt?: string;
}

const ProfilePage = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    dob: "",
    gender: "",
    profilePicture: ""
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Current user:", user);
    const fetchUserData = async () => {
      if (!user) {
        toast.error('User not authenticated');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          console.log("User data:", userDoc.data());
          setUserData(userDoc.data() as UserData);
          setFormData({
            firstName: userDoc.data().firstName || "",
            surname: userDoc.data().surname || "",
            email: userDoc.data().email || "",
            dob: userDoc.data().dob || "",
            gender: userDoc.data().gender || "",
            profilePicture: userDoc.data().profilePicture || ""
          });
          setPreview(userDoc.data().profilePicture || "");
        } else {
          console.error('User data not found');
          toast.error('User data not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = ref(db2, "users/" + user.uid);
      await set(userRef, {
        ...formData,
        profilePicture: preview,
        uid: user.uid,
        createdAt: userData?.createdAt || new Date().toISOString(),
      });
      setUserData({ ...formData, profilePicture: preview });
      setIsEditing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">No user data found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <p className="text-lg">{userData.firstName}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Surname
            </label>
            <p className="text-lg">{userData.surname}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <p className="text-lg">{userData.dob}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <p className="text-lg">{userData.gender}</p>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <p className="text-lg">{userData.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
