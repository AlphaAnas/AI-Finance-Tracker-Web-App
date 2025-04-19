import { NextResponse } from 'next/server';
import { auth } from '@/app/firebase/admin';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({
        exists: false,
        message: "Email is required"
      }, { status: 400 });
    }

    try {
      // Try to get user by email
      const userRecord = await auth().getUserByEmail(email);
      return NextResponse.json({
        exists: true,
        message: "Email found"
      });
    } catch (error: any) {
      // If error code is auth/user-not-found, email doesn't exist
      if (error.code === 'auth/user-not-found') {
        return NextResponse.json({
          exists: false,
          message: "No account found with this email"
        });
      }
      
      // For other errors, return a generic error
      console.error('Error checking email:', error);
      return NextResponse.json({
        exists: false,
        message: "Error checking email"
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json({
      exists: false,
      message: "Invalid request"
    }, { status: 400 });
  }
} 