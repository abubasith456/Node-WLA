import admin from 'firebase-admin';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = path.join(__dirname, '../../config/data.json');

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://flutter-hayat.appspot.com/"
});

const bucket = admin.storage().bucket();

export { admin, bucket };
