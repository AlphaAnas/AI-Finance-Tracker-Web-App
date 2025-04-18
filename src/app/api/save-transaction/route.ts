import { db } from 'src/app/firebase';
import { collection, addDoc as firebaseAddDoc } from 'firebase/firestore';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, transaction } = body;

        if (!userId || !transaction) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
        }

        // Validate date
        const { date, amount } = transaction;
        if (!date || isNaN(new Date(date).getTime())) {
            return new Response(JSON.stringify({ error: 'Invalid date format' }), { status: 400 });
        }

        // Validate amount
        if (typeof amount !== 'number' || isNaN(amount)) {
            return new Response(JSON.stringify({ error: 'Invalid amount' }), { status: 400 });
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

async function addDoc(collectionRef: any, data: any) {
    try {
        const docRef = await firebaseAddDoc(collectionRef, data);
        return docRef;
    } catch (error) {
        console.error('Error adding document:', error);
        throw new Error('Failed to add document');
    }
}