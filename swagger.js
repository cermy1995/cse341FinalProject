const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Not Your Grandmas Cookbook',
    description: 'Cookbook API',
  },
  host: 'cse341finalproject.herokuapp.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);