// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000"; // Default to localhost if not set

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Musfi Prod',
      version: '1.0.0',
      description: 'API documentation for project',
    },
    servers: [
      {
        url: 'http://localhost:5000/', // Replace with your server URL
      },
    ],
  },
  apis: ["./src/router/*.js"], // Path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
