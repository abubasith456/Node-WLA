// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000/api/v1"; // Default to localhost if not set

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Musfi Shoping',
      version: '1.0.0',
      description: 'API documentations',
    },
    servers: [
      {
        url: SERVER_URL, // Replace with your server URL
      },
    ],
  },
  apis: ["./src/router/*.js"], // Path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
