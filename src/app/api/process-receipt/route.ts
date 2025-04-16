import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { auth } from '@/app/firebase'; // adjust path if needed

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');




const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);



// Prompt for invoice parsing
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



// This function basically sends the image to the Google Gemini API and gets the response back.
// It then parses the response and stores it in Firestore.
// The function is called when the user uploads a receipt image in the frontend.
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const file = formData.get('file') as File;
    
    const userId = formData.get('userId') as string;
    const userName = formData.get('userName') as string;
    const userEmail = formData.get('userEmail') as string;

    if (!file || !userId) {
      return NextResponse.json({ error: 'No file or user ID provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: buffer.toString('base64'),
          mimeType: file.type,
        },
      },
    ]);

    const response = await result.response;
    const responseText = response.text();
    const cleanJson = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    let extractedData;
    try {
      extractedData = JSON.parse(cleanJson);
    } catch (error) {
      console.error('JSON parse error:', error);
      return NextResponse.json({ error: 'Failed to parse JSON' }, { status: 500 });
    }

    // add the user ID to the extracted data
    extractedData = {
      ...extractedData,
      userId: userId, // add user ID if available
    }



    // 🔥 Store the parsed data in Firestore
    await addDoc(collection(db, 'transactions'), {
      ...extractedData,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      data: extractedData,
    });
  } catch (error) {
    console.error('Error processing receipt:', error);
    return NextResponse.json({ error: 'Failed to process receipt' }, { status: 500 });
  }
}