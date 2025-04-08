import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Define prompt template
const prompt = `You are an expert invoice parser.

Task: From the invoice image provided, extract the key fields:
- Either Invoice Number or Bill Number: Integer (Output field: InvoiceNumber)
- Items (grouped in a list with ItemName (string), Price (decimal), Quantity (integer), and Total(decimal)) (Output field: Items)
- Invoice Date: Date (Output field: InvoiceDate)
- Total Amount: Decimal (Output field: TotalAmount) 
- Vendor Name: String (Output field: VendorName)
- Payment Method: String (Output field: PaymentMethod)
- Invoice Type: String (Output field: InvoiceType)
- Withholding Tax Amount: Decimal ((Output field: WitholdingTaxAmount))
- GST Amount: Decimal (Output field: GSTAmount)
- Tax Invoice Number (Output field: TaxInvoiceNumber)

Provide the output as a JSON object with the exact field names specified above. If a field is missing, ignore it and do not fill it in or make assumptions.

Restrictions:
Only provide the JSON object with the exact field names.
Do not provide any other text or explanations.
If you are unable to find any fields, provide an empty JSON object.
All rows of items must be grouped together.`;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert File to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Process image with Gemini
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: buffer.toString('base64'),
          mimeType: file.type
        }
      }
    ]);

    const response = await result.response;
    const responseText = response.text();
    
    // Clean up the response text by removing markdown formatting
    const cleanJson = responseText
      .replace(/```json\n?/g, '') // Remove opening ```json
      .replace(/```\n?/g, '')     // Remove closing ```
      .trim();                    // Remove extra whitespace
    
    let extractedData;
    try {
      extractedData = JSON.parse(cleanJson);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      console.error('Raw response:', responseText);
      return NextResponse.json(
        { error: 'Failed to parse receipt data' },
        { status: 500 }
      );
    }

    // Generate unique filename
    const timestamp = new Date().getTime();
    const filename = `receipt_${timestamp}.txt`;
    const groundTruthDir = path.join(process.cwd(), 'ground_truth');

    // Ensure ground_truth directory exists
    if (!fs.existsSync(groundTruthDir)) {
      fs.mkdirSync(groundTruthDir, { recursive: true });
    }

    // Save extracted data to file
    const filePath = path.join(groundTruthDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(extractedData, null, 2));

    return NextResponse.json({
      success: true,
      filename,
      data: extractedData
    });

  } catch (error) {
    console.error('Error processing receipt:', error);
    return NextResponse.json(
      { error: 'Failed to process receipt' },
      { status: 500 }
    );
  }
} 