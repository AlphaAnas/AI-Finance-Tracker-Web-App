import type { NextApiRequest, NextApiResponse } from 'next';

const ABSTRACT_API_KEY = process.env.NEXT_PUBLIC_EMAIL_VALIDATION_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ isValid: false, message: 'Email is required' });
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      isValid: false,
      message: 'Invalid email format'
    });
  }

  try {
    const apiRes = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}&email=${encodeURIComponent(email)}`);
    
    // Check if fetch succeeded and body has content
    if (!apiRes.ok) {
      return res.status(502).json({ isValid: false, message: 'Failed to reach email validation service' });
    }

    const data = await apiRes.json();

    const {
      deliverability,
      is_valid_format,
      is_mx_found,
      is_smtp_valid
    } = data;

    if (
      deliverability === 'DELIVERABLE' ||
      (deliverability === 'UNKNOWN' && is_valid_format?.value && is_mx_found?.value && is_smtp_valid?.value)
    ) {
      return res.status(200).json({ isValid: true, message: 'Email looks valid' });
    }

    if (deliverability === 'UNDELIVERABLE') {
      return res.status(200).json({ isValid: false, message: 'Email cannot receive messages' });
    }

    // CHANGED: Accept emails with uncertain verification but valid format
    return res.status(200).json({ isValid: true, message: 'Email format is valid' });

  } catch (error) {
    console.error('Validation error:', error);
    return res.status(500).json({
      isValid: emailRegex.test(email),
      message: 'Validation failed — fallback to basic check',
    });
  }
}
