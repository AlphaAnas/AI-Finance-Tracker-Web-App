import { NextResponse } from 'next/server';
import { db } from '@/app/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Add user details to Firestore
    const docRef = await addDoc(collection(db, 'users'), {
      ...data,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
      data
    });

  } catch (error) {
    console.error('Error saving user details:', error);
    return NextResponse.json(
      { error: 'Failed to save user details' },
      { status: 500 }
    );
  }
} 