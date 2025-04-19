import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Basic email format validation
    const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicRegex.test(email)) {
      return NextResponse.json({
        isValid: false,
        message: "Please enter a valid email"
      });
    }

    // If ABSTRACT_API_KEY is not set, fall back to basic validation
    if (!process.env.ABSTRACT_API_KEY) {
      return NextResponse.json({
        isValid: true,
        message: "Valid Email"
      });
    }

    // Extended validation using Abstract API
    try {
      const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${email}`);
      const data = response.data;

      // Check for specific validation failures
      if (!data.deliverability || data.deliverability === "UNDELIVERABLE") {
        return NextResponse.json({
          isValid: false,
          message: "Please enter a valid email"
        });
      }

      if (data.is_disposable_email?.value === true) {
        return NextResponse.json({
          isValid: false,
          message: "Please use a permanent email address"
        });
      }

      // If the domain appears inactive or invalid
      if (data.is_valid_format?.value === true && 
          (!data.is_mx_found?.value || data.is_smtp_valid?.value === false)) {
        return NextResponse.json({
          isValid: false,
          message: "Please enter a valid email"
        });
      }

      // If everything passes
      return NextResponse.json({
        isValid: true,
        message: "Valid Email"
      });

    } catch (error) {
      // Fallback to basic validation if API call fails
      return NextResponse.json({
        isValid: true,
        message: "Valid Email"
      });
    }
  } catch (error) {
    return NextResponse.json({
      isValid: false,
      message: "Please enter a valid email"
    });
  }
}
