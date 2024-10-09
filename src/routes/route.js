const { DESCRIBE } = require('sequelize/lib/query-types');
const Controller = require('../controllers/controller');

async function appRoutes(fastify, options) {
  fastify.get('/events', Controller.getAllEvent);
  
  fastify.post('/ticket', {
    schema: {
      body: {
        type: 'object',
        required: ['firstname', 'lastname', 'class','eventId'],
        properties: {
          firstname: { type: 'string' },
          lastname: { type: 'string' },
          class: { type: 'string' },
          eventId:{ type: 'number'}
        }
      }
    }
  }, Controller.createTicket);

  fastify.post('/verify', {
    schema: {
      body: {
        type: 'object',
        required: ['key','eventId'],
        properties: {
          key:{ type: 'string'},
          eventId:{type:'number'}
        }
      }
    }
  }, Controller.verifyTicket);
}

module.exports = appRoutes;
