import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    // Get the private key and replace escaped newlines
    const privateKey = process.env.FIREBASE_PRIVATE_KEY 
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : undefined;

    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    };

    // Validate service account fields
    if (!serviceAccount.privateKey || !serviceAccount.clientEmail || !serviceAccount.projectId) {
      console.error('❌ Missing Firebase Admin credentials:', {
        hasPrivateKey: !!serviceAccount.privateKey,
        hasClientEmail: !!serviceAccount.clientEmail,
        hasProjectId: !!serviceAccount.projectId,
      });
      throw new Error('Missing required Firebase service account credentials');
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });

    console.log('✅ Firebase Admin initialized successfully');
  } catch (error) {
    console.error('🔥 Firebase Admin initialization error:', error);
    // Don't re-throw to avoid build crash, but log the error
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Stack trace:', error.stack);
    }
  }
}

const db = admin.firestore();

export { admin, db };
