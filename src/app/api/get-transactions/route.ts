import { NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { query, where } from 'firebase/firestore';
import { db } from 'src/app/firebase'; // Adjust this path based on your structure

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');
    if (!uid || typeof uid !== 'string') {
      return NextResponse.json({ error: 'Invalid UID provided' }, { status: 400 });
    }

    const q = query(collection(db, 'transactions'), where('userId', '==', uid));
    const snapshot = await getDocs(q);

    const transactions = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id, // Use the document ID as the transaction ID
        account: data.account || 'Unknown Account',
        date: data.date || null, // Ensure the date is valid
        status: data.status || 'unknown',
        amount: typeof data.amount === 'number' ? data.amount : 0, // Default to 0 if invalid
        category: data.category || 'Uncategorized',
        description: data.description || 'No description',
        vendor: data.vendor || 'Unknown Vendor',
        createdAt: data.createdAt || new Date().toISOString(), // Default to current timestamp
      };
    });

    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to fetch transactions',
      details: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}