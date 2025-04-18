import { NextResponse } from 'next/server';
import { db } from '@/app/firebase/admin';

export async function POST(request: Request) {
  try {
    const userData = await request.json();
    
    if (!userData || !userData.uid) {
      return NextResponse.json(
        { message: 'Invalid user data' },
        { status: 400 }
      );
    }

    if (!db) {
      console.error('Firestore not initialized');
      return NextResponse.json(
        { message: 'Database service unavailable' },
        { status: 503 }
      );
    }

    // Save user data to Firestore
    await db.collection('users').doc(userData.uid).set({
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json(
      { message: 'User data saved successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving user data:', error);
    return NextResponse.json(
      { message: 'Failed to save user data' },
      { status: 500 }
    );
  }
} 