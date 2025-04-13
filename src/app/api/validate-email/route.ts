import { NextResponse } from 'next/server';

const ABSTRACT_API_KEY = process.env.ABSTRACT_API_KEY || 'AIzaSyB9k6XTcl1AfaG4lYqKTcytaOZb3_gIiW8';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Basic validation first
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        isValid: false,
        message: 'Invalid email format'
      });
    }

    // Call Abstract API for verification
    const response = await fetch(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}&email=${encodeURIComponent(email)}`
    );

    if (!response.ok) {
      throw new Error('Verification service unavailable');
    }

    const data = await response.json();

    // Check email quality and deliverability
    const {
      deliverability,
      is_valid_format: { value: isValidFormat },
      is_free_email: { value: isFreeEmail },
      is_disposable_email: { value: isDisposable }
    } = data;

    // Determine email validity
    if (deliverability === "DELIVERABLE" && isValidFormat && !isDisposable) {
      return NextResponse.json({
        isValid: true,
        message: isFreeEmail ? "Valid free email address" : "Valid email address"
      });
    }

    // Handle different failure cases
    if (!isValidFormat) {
      return NextResponse.json({
        isValid: false,
        message: "Invalid email format"
      });
    }

    if (isDisposable) {
      return NextResponse.json({
        isValid: false,
        message: "Disposable emails not allowed"
      });
    }

    if (deliverability === "UNDELIVERABLE") {
      return NextResponse.json({
        isValid: false,
        message: "Email address appears to be invalid"
      });
    }

    // For UNKNOWN deliverability, accept if format is valid
    if (deliverability === "UNKNOWN" && isValidFormat) {
      return NextResponse.json({
        isValid: true,
        message: "Email format is valid"
      });
    }

    return NextResponse.json({
      isValid: false,
      message: "Could not verify email"
    });

  } catch (error) {
    console.error('Email validation error:', error);
    
    try {
      const { email } = await request.json();
      // Fallback to basic validation
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      const isValid = emailRegex.test(email);
      
      return NextResponse.json({
        isValid,
        message: isValid ? "Basic format check passed" : "Invalid email format"
      });
    } catch {
      return NextResponse.json({
        isValid: false,
        message: "Invalid request"
      });
    }
  }
} 