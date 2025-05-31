import { bucket } from "../config/firebase-admin.js";

export const uploadToFirebase = async (file, filename) => {
    try {
        // Create a buffer from the file
        const buffer = file.buffer;

        // Create file reference
        const fileRef = bucket.file(filename);

        // Check if file exists
        const [exists] = await fileRef.exists();
        if (exists) {
            await fileRef.delete();
        }

        // Upload file
        await fileRef.save(buffer, {
            metadata: {
                contentType: file.mimetype,
                cacheControl: 'public, max-age=31536000',
            },
        });

        // Generate signed URL valid for 200 years
        const [url] = await fileRef.getSignedUrl({
            action: 'read',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 200), // 200 years
        });

        return url;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("Failed to upload file");
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
