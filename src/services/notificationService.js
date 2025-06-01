import { admin } from '../config/firebase-admin.js';

class NotificationService {
    static async sendNotification(token, title, body, data = {}) {
        try {
            const message = {
                notification: {
                    title,
                    body,
                },
                data: {
                    ...data,
                    click_action: 'FLUTTER_NOTIFICATION_CLICK',
                },
                token,
            };

            const response = await admin.messaging().send(message);
            console.log('Successfully sent notification:', response);
            return response;
        } catch (error) {
            console.error('Error sending notification:', error);
            throw error;
        }
    }

    static async sendMulticastNotification(tokens, title, body, data = {}) {
        try {
            const messages = tokens.map(token => ({
                notification: {
                    title,
                    body,
                },
                data: {
                    ...data,
                    click_action: 'FLUTTER_NOTIFICATION_CLICK',
                },
                token,
            }));

            const response = await admin.messaging().sendAll(messages);
            console.log('Successfully sent messages:', response);
            console.log(`${response.successCount} messages were sent successfully`);

            if (response.failureCount > 0) {
                console.log('Failed messages:', response.responses.filter(r => !r.success));
            }

            return response;
        } catch (error) {
            console.error('Error sending notifications:', error);
            throw error;
        }
    }
}

export default NotificationService;
