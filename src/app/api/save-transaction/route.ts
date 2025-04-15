import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';



const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);




export async function POST(request: Request) {
    try {
      const body = await request.json();
      
      if (!body || typeof body !== 'object') {
        return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
      }
  
      // Save to Firestore
      await addDoc(collection(db, 'transactions'), {
        ...body,
        createdAt: new Date().toISOString(), // You could use serverTimestamp() if preferred
      });
  
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error saving transaction:', error);
      return NextResponse.json({ error: 'Failed to save transaction' }, { status: 500 });
    }
  }
  