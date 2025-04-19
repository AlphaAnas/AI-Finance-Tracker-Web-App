import { db } from '@/app/firebase';
import { collection, addDoc as firebaseAddDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        console.log('📥 Incoming request to add transaction');

        const body = await req.json();
        const { userId, transaction } = body;

        if (!userId || !transaction) {
            console.warn('⚠️ Missing userId or transaction in request body:', body);
            return NextResponse.json({ 
                success: false, 
                error: 'Missing required fields' 
            }, { status: 400 });
        }

        // Normalize transaction data
        const normalizedTransaction = {
            userId,
            date: transaction.InvoiceDate || transaction.date,
            amount: parseFloat(transaction.TotalAmount || transaction.amount),
            category: transaction.Category || transaction.category,
            description: transaction.Description || transaction.description || transaction.Items,
            status: transaction.InvoiceType?.toLowerCase() || transaction.status,
            vendor: transaction.VendorName || transaction.vendor,
            account: transaction.account || "Main Account",
            createdAt: new Date().toISOString(),
        };

        console.log('🧹 Normalized transaction:', normalizedTransaction);

        // Validate date
        if (!normalizedTransaction.date || isNaN(new Date(normalizedTransaction.date).getTime())) {
            console.warn('❌ Invalid date format:', normalizedTransaction.date);
            return NextResponse.json({ 
                success: false, 
                error: 'Invalid date format' 
            }, { status: 400 });
        }

        // Validate amount
        if (typeof normalizedTransaction.amount !== 'number' || isNaN(normalizedTransaction.amount)) {
            console.warn('❌ Invalid amount:', normalizedTransaction.amount);
            return NextResponse.json({ 
                success: false, 
                error: 'Invalid amount' 
            }, { status: 400 });
        }

        // Save to Firestore
        console.log('📤 Attempting to add transaction to Firestore...');
        const docRef = await addDoc(collection(db, 'transactions'), normalizedTransaction);
        console.log(`✅ Transaction added with ID: ${docRef.id}`);

        // Update user balance
        try {
            console.log(`🔍 Fetching user with ID: ${userId}`);
            const userRef = doc(db, 'users', userId);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const userData = userSnap.data();
                const currentBalance = userData.currentBalance || 0;

                let updatedBalance;
                if (normalizedTransaction.status === "incoming") {
                    updatedBalance = currentBalance + normalizedTransaction.amount;
                } else {
                    updatedBalance = currentBalance - normalizedTransaction.amount;
                }

                console.log(`💰 Updating user balance: ${currentBalance} -> ${updatedBalance}`);
                await updateDoc(userRef, {
                    currentBalance: updatedBalance,
                });

                return NextResponse.json({
                    success: true,
                    data: {
                        transactionId: docRef.id,
                        updatedBalance
                    }
                });
            } else {
                console.warn('⚠️ User not found for balance update:', userId);
                return NextResponse.json({
                    success: true,
                    warning: 'Transaction saved but user profile not found for balance update',
                    data: { transactionId: docRef.id }
                });
            }
        } catch (balanceError) {
            console.error('❌ Error updating user balance:', balanceError);
            return NextResponse.json({
                success: true,
                warning: 'Transaction saved but failed to update balance',
                data: { transactionId: docRef.id }
            });
        }
    } catch (error) {
        console.error('❌ Error processing POST request:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to add transaction'
        }, { status: 500 });
    }
}

// Wrapped addDoc with error logging
async function addDoc(collectionRef: any, data: any) {
    try {
        console.log('📄 Adding document to collection...');
        const docRef = await firebaseAddDoc(collectionRef, data);
        return docRef;
    } catch (error) {
        console.error('❌ Error adding document to Firestore:', error);
        throw new Error('Failed to add document');
    }
}
