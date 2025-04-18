import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
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
    // Optional: don't re-throw to avoid build crash
  }
}

const db = admin.firestore();

export { admin, db };
