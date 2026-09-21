const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "To-Do List API",
      version: "1.0.0",
      description: "API documentation for MERN To-Do List application"
    },

    servers: [
      {
        url: "http://localhost:7200"
      }
    ]
  },

  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;