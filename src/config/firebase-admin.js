import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

try {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
            }),
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET
        });
        console.log('Firebase Admin initialized successfully');
    }
} catch (error) {
    console.error('Firebase Admin initialization error:', error);
    throw error;
}

const bucket = admin.storage().bucket();

export { admin, bucket };
