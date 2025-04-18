import { db } from '@/app/firebase'; // Adjust the path to your Firebase setup
import { collection, addDoc } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, transaction } = body;

    if (!userId || !transaction) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const docRef = await addDoc(collection(db, 'transactions'), {
      ...transaction,
      userId,
      createdAt: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ id: docRef.id }), { status: 200 });
  } catch (error) {
    console.error('Error adding transaction:', error);
    return new Response(JSON.stringify({ error: 'Failed to add transaction' }), { status: 500 });
  }
}