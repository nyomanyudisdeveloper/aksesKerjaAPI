// const swaggerJSDoc = require('swagger-jsdoc');
import swaggerJSDoc from 'swagger-jsdoc'

const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: 'API Contract SIMS PPOB',
      version: '1.0.0',
      description: 'Documentation for Take Home Test API',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Optional, specifies the token format
        },
      },
    },
    security: [
      {
        BearerAuth: [], // Apply globally to all endpoints by default
      },
    ],
    tags: [
      { name: '1. Module Membership' },
      { name: '2. Module Information' },
      { name: '3. Module Transaction' },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to your route files with Swagger annotations
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec
