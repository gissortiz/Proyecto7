const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Mi API de Usuarios y Servicios',
    version: '1.0.0',
    description: 'Documentación de la API con Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local (desarrollo)',
    },
    {
      url: 'https://proyecto4-d4d0.onrender.com',
      description: 'Servidor en producción (Render)',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
