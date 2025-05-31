import admin from 'firebase-admin';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = path.join(__dirname, '../../config/flutter-hayat.json');

// Verify service account file exists
if (!fs.existsSync(serviceAccount)) {
    throw new Error('Firebase service account file not found');
}

try {
    // Check if app is already initialized
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: "flutter-hayat.appspot.com" // Remove 'gs://' prefix
        });
        console.log('Firebase Admin initialized successfully');
    }
} catch (error) {
    console.error('Firebase Admin initialization error:', error);
    throw error;
}

const bucket = admin.storage().bucket();

export { admin, bucket };
