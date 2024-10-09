const fastify = require('fastify')();
const appRoutes = require('./routes/route');
const sequelize = require('./config/database');
const fastifyStatic = require('@fastify/static');
const path = require('path');

// Swagger setup
fastify.register(require('@fastify/swagger'),{});
fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/',
  uiConfig: {
      docExpansion: 'list',
      deepLinking: false
  },
  uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
})

// Load file
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'qrcodes'),
  prefix: '/qrcodes/', 
});

// Routes
fastify.register(appRoutes);

// Connect to database
sequelize.sync()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error: ' + err));

module.exports = fastify;
