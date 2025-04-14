import { NextResponse } from 'next/server';

const ABSTRACT_API_KEY = process.env.NEXT_PUBLIC_EMAIL_VALIDATION_API_KEY;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ 
        isValid: false, 
        message: 'Email is required' 
      });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        isValid: false,
        message: 'Invalid email format'
      });
    }

    try {
      const response = await fetch(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}&email=${encodeURIComponent(email)}`
      );
      const data = await response.json();

      const {
        deliverability,
        is_valid_format,
        is_mx_found,
        is_smtp_valid,
      } = data;

      // Accept deliverable or unknown with good format & SMTP
      if (
        deliverability === 'DELIVERABLE' ||
        (deliverability === 'UNKNOWN' && is_valid_format?.value && is_mx_found?.value && is_smtp_valid?.value)
      ) {
        return NextResponse.json({ isValid: true, message: 'Valid Email' });
      }

      if (deliverability === 'UNDELIVERABLE') {
        return NextResponse.json({ isValid: false, message: 'Please enter an existing email' });
      }

      // CHANGED: Accept emails with uncertain verification but valid format
      // This allows users to sign up even when the API can't give a definitive answer
      return NextResponse.json({ 
        isValid: true, 
        message: 'Email format is valid' 
      });

    } catch (error) {
      console.error('Abstract API error:', error);
      // Fallback to basic validation if the API call fails
      return NextResponse.json({
        isValid: emailRegex.test(email),
        message: 'Validation failed — fallback to basic check'
      });
    }
  } catch (error) {
    console.error('Request parsing error:', error);
    return NextResponse.json({ 
      isValid: false, 
      message: 'Invalid request' 
    });
  }
}
