const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tournament Auction Management API',
      version: '1.0.0',
      description: 'API for managing tournaments, users, and auctions',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Update with your server URL
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          description: 'JWT token for authentication. Format - "Bearer {token}"',
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Path to the API routes
};

const specs = swaggerJsDoc(options);

module.exports = { specs, swaggerUi };