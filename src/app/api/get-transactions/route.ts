import { NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { query, where } from 'firebase/firestore';
import { db } from 'src/app/firebase'; // adjust this path based on your structure





export async function GET(request: Request) {
  try {
    // Use process.stdout.write for terminal logging in Next.js API routes
    process.stdout.write(`[${new Date().toISOString()}] API: Transactions request received\n`);
    
    // Extract search parameters
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');
    if (!uid || typeof uid !== 'string') {
      return NextResponse.json({ error: 'Invalid UID provided' }, { status: 400 });
    }
    
  

    
    // Query only transactions for the specific user
    const q = query(collection(db, 'transactions'), where('userId', '==', uid));
   
    
    const snapshot = await getDocs(q);


    if (snapshot.empty) {
      process.stdout.write(`[${new Date().toISOString()}] API ERROR: No transactions found for user ID: ${uid}\n`);
      return NextResponse.json({ error: 'No transactions found' }, { status: 404 });
    }

    process.stdout.write(`[${new Date().toISOString()}] API: Processing transaction documents...\n`);
    const transactions = snapshot.docs
      .map(doc => {
        const data = doc.data();
        const docId = doc.id;
        process.stdout.write(`[${new Date().toISOString()}] API: Processing document ${docId}\n`);
        
        if (!data) {
          process.stdout.write(`[${new Date().toISOString()}] API WARNING: Empty data for document ${docId}\n`);
          return null;
        }

        return { // returns all the data from the document
          id: `TRX-${data.InvoiceNumber || Math.floor(Math.random() * 10000)}`,
          account: "Main Checking",
          date: data.InvoiceDate || 'No Invoice Date Found!',
          status: "outgoing",
          amount: data.TotalAmount || 0,
          category: data.VendorName || "Uncategorized",
          description: data.Items?.map((item: any) => item.ItemName).join(', ') || "No items",
          vendor: data.VendorName,
          invoiceType: data.InvoiceType,
          gstAmount: data.GSTAmount,
          items: data.Items || [],
        };
      })
      .filter((tx): tx is NonNullable<typeof tx> => tx !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    process.stdout.write(`[${new Date().toISOString()}] API: Returning ${transactions.length} processed transactions\n`);
    return NextResponse.json(transactions);
  } catch (error) {
    process.stdout.write(`[${new Date().toISOString()}] API ERROR: Error fetching transactions: ${error instanceof Error ? error.message : String(error)}\n`);
    return NextResponse.json({
      error: 'Failed to fetch transactions',
      details: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}



//  OLD CODE TO GET LOCAL INVOICES 

// export const runtime = 'nodejs';

// import { NextResponse } from 'next/server';
// import fs from 'fs';
// import path from 'path';

// export async function GET() {
//   try {
//     const groundTruthDir = path.join(process.cwd(), 'ground_truth');

//     if (!fs.existsSync(groundTruthDir)) {
//       console.error(`Directory not found: ${groundTruthDir}`);
//       return NextResponse.json({ error: 'Ground truth directory not found' }, { status: 404 });
//     }

//     const files = fs.readdirSync(groundTruthDir);
//     console.log('Found files:', files);

//     const transactions = files
//       .filter(file => file.endsWith('.txt'))
//       .map(file => {
//         const filePath = path.join(groundTruthDir, file);
//         console.log('Processing file:', filePath);

//         const content = fs.readFileSync(filePath, 'utf-8');
//         let data;
//         try {
//           data = JSON.parse(content);
//         } catch (parseError) {
//           console.error(`Error parsing file ${file}:`, parseError);
//           return null;
//         }

//         return {
//           id: `TRX-${data.InvoiceNumber || Math.floor(Math.random() * 10000)}`,
//           account: "Main Checking",
//           date: data.InvoiceDate || new Date().toISOString().split('T')[0],
//           status: "outgoing",
//           amount: data.TotalAmount || 0,
//           category: data.VendorName || "Uncategorized",
//           description: data.Items ? data.Items.map((item: any) => item.ItemName).join(', ') : "No items",
//           vendor: data.VendorName,
//           invoiceType: data.InvoiceType,
//           gstAmount: data.GSTAmount,
//           items: data.Items || []
//         };
//       })
//       .filter((tx): tx is NonNullable<typeof tx> => tx !== null)
//       .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

//     return NextResponse.json(transactions);
//   } catch (error) {
//     console.error('Error fetching transactions:', error);
//     return NextResponse.json({
//       error: 'Failed to fetch transactions',
//       details: error instanceof Error ? error.message : String(error)
//     }, { status: 500 });
//   }
// }
