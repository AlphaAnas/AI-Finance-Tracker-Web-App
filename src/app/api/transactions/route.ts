export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const groundTruthDir = path.join(process.cwd(), 'ground_truth');

    if (!fs.existsSync(groundTruthDir)) {
      console.error(`Directory not found: ${groundTruthDir}`);
      return NextResponse.json({ error: 'Ground truth directory not found' }, { status: 404 });
    }

    const files = fs.readdirSync(groundTruthDir);
    console.log('Found files:', files);

    const transactions = files
      .filter(file => file.endsWith('.txt'))
      .map(file => {
        const filePath = path.join(groundTruthDir, file);
        console.log('Processing file:', filePath);

        const content = fs.readFileSync(filePath, 'utf-8');
        let data;
        try {
          data = JSON.parse(content);
        } catch (parseError) {
          console.error(`Error parsing file ${file}:`, parseError);
          return null;
        }

        return {
          id: `TRX-${data.InvoiceNumber || Math.floor(Math.random() * 10000)}`,
          account: "Main Checking",
          date: data.InvoiceDate || new Date().toISOString().split('T')[0],
          status: "outgoing",
          amount: data.TotalAmount || 0,
          category: data.VendorName || "Uncategorized",
          description: data.Items ? data.Items.map((item: any) => item.ItemName).join(', ') : "No items",
          vendor: data.VendorName,
          invoiceType: data.InvoiceType,
          gstAmount: data.GSTAmount,
          items: data.Items || []
        };
      })
      .filter((tx): tx is NonNullable<typeof tx> => tx !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({
      error: 'Failed to fetch transactions',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
