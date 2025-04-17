import { db } from "@/app/firebase";
import { collection, query, where, getDocs, doc, setDoc, addDoc } from "firebase/firestore";

export interface UserData {
  firstName: string;
  surname: string;
  email: string;
  gender?: string;
  dob?: string;
  totalBalance?: number;
  currentBalance?: number;
  location?: string;
  currency?: string;
  timezone?: string;
  emailNotifications?: boolean;
  emailValidated?: boolean;
  darkMode?: boolean;
  createdAt?: string;
  uid: string;
}

/**
 * Fetches user data from Firestore by user ID
 * @param uid User ID
 * @returns User data if found, null otherwise
 */
export async function getUserData(uid: string): Promise<UserData | null> {
  try {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return userDoc.data() as UserData;
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

/**
 * Updates existing user data or creates new user data if it doesn't exist
 * @param userData User data to save
 * @returns true if successful, throws error otherwise
 */
export async function updateUserData(userData: UserData): Promise<boolean> {
  try {
    // First check if the user exists
    const q = query(collection(db, "users"), where("uid", "==", userData.uid));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // User exists, update document
      const userDoc = querySnapshot.docs[0];
      await setDoc(doc(db, "users", userDoc.id), userData, { merge: true });
    } else {
      // User doesn't exist, create new document
      // Add createdAt field for new users
      if (!userData.createdAt) {
        userData.createdAt = new Date().toISOString();
      }
      await addDoc(collection(db, 'users'), userData);
    }
    
    return true;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
}