import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ 
        isValid: false, 
        message: 'Email is required' 
      }, { status: 400 });
    }

    // Basic email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        isValid: false,
        message: 'Please enter a valid email'
      });
    }

    try {
      const abstractApiKey = process.env.ABSTRACT_API_KEY;
      
      // Check if API key exists and is valid (not truncated)
      if (!abstractApiKey || abstractApiKey.length < 32) {
        console.error('Abstract API key is missing or appears incomplete');
        // Fall back to basic validation if API key is missing or incomplete
        return NextResponse.json({
          isValid: true,
          message: 'Valid Email'
        });
      }

      // Make request to Abstract API
      const response = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${abstractApiKey}&email=${encodeURIComponent(email)}`
      );
      const data = response.data;

      // Check the quality score and is_valid flag from Abstract API
      if (data.is_valid_format && data.deliverability === "DELIVERABLE") {
        return NextResponse.json({
          isValid: true,
          message: 'Valid Email'
        });
      } else if (data.is_valid_format && data.deliverability === "UNDELIVERABLE") {
        return NextResponse.json({
          isValid: false,
          message: 'Please enter a valid email'
        });
      } else {
        return NextResponse.json({
          isValid: false,
          message: 'Please enter a valid email'
        });
      }
    } catch (error) {
      console.error('Email validation error:', error);
      
      // If API call fails, fall back to basic validation
      return NextResponse.json({
        isValid: emailRegex.test(email),
        message: emailRegex.test(email) 
          ? 'Valid Email' 
          : 'Please enter a valid email'
      });
    }
  } catch (error) {
    console.error('Request parsing error:', error);
    return NextResponse.json({ 
      isValid: false, 
      message: 'Please enter a valid email' 
    }, { status: 400 });
  }
}
