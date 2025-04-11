import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        isValid: false, 
        message: 'Invalid email format' 
      });
    }

    // Validate email using Abstract API
    const response = await fetch(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${email}`
    );
    
    const data = await response.json();
    
    // Check if email is deliverable and has valid format
    const isValid = data.deliverability === 'DELIVERABLE' && 
                   data.is_valid_format.value === true &&
                   data.is_disposable_email.value === false;

    return NextResponse.json({ 
      isValid,
      message: isValid ? 'Email is valid' : 'Email is not valid or disposable'
    });
  } catch (error) {
    console.error('Email validation error:', error);
    return NextResponse.json({ 
      isValid: false, 
      message: 'Error validating email' 
    });
  }
} 