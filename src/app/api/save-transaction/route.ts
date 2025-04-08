import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Generate unique filename
    const timestamp = new Date().getTime();
    const filename = `receipt_${timestamp}.txt`;
    const groundTruthDir = path.join(process.cwd(), 'ground_truth');

    // Ensure ground_truth directory exists
    if (!fs.existsSync(groundTruthDir)) {
      fs.mkdirSync(groundTruthDir, { recursive: true });
    }

    // Save transaction data to file
    const filePath = path.join(groundTruthDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({
      success: true,
      filename,
      data
    });

  } catch (error) {
    console.error('Error saving transaction:', error);
    return NextResponse.json(
      { error: 'Failed to save transaction' },
      { status: 500 }
    );
  }
} 