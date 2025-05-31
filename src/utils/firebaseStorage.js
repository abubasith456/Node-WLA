import { bucket } from "../config/firebase-admin.js";

export const uploadToFirebase = async (file, filename) => {
    if (!file || !file.buffer) {
        throw new Error("No file provided");
    }

    try {
        console.log(`Starting upload for file: ${filename}`);
        
        // Create file reference
        const fileRef = bucket.file(filename);

        // Create write stream
        const blobStream = fileRef.createWriteStream({
            metadata: {
                contentType: file.mimetype,
                cacheControl: 'public, max-age=31536000',
            },
            resumable: false // Set to false for small files
        });

        // Handle upload through Promise
        await new Promise((resolve, reject) => {
            blobStream.on('error', (error) => {
                console.error('Upload stream error:', error);
                reject(error);
            });

            blobStream.on('finish', () => {
                console.log(`Upload completed for: ${filename}`);
                resolve();
            });

            blobStream.end(file.buffer);
        });

        // Generate signed URL
        const [url] = await fileRef.getSignedUrl({
            action: 'read',
            expires: Date.now() + 1000 * 60 * 60 * 24 * 365 * 100, // 100 years
        });

        console.log(`Generated signed URL for: ${filename}`);
        return url;

    } catch (error) {
        console.error("Error in uploadToFirebase:", error);
        throw new Error(`Failed to upload file: ${error.message}`);
    }
};

export const generateSignedUrl = async (filename) => {
    try {
        const [url] = await bucket.file(filename).getSignedUrl({
            action: 'read',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 200), // 200 years
        });
        return url;
    } catch (error) {
        console.error("Error generating signed URL:", error);
        throw new Error("Failed to generate signed URL");
    }
};

export const uploadAvatar = async (file, userId) => {
    const imageName = `ProfilePictures/${userId}_profile.jpg`;
    return await uploadToFirebase(file, imageName);
};
