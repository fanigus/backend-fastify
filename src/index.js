const fastify = require('./app');
const Event = require('./models/event.model')
const Ticket = require('./models/ticket.model')

Event.hasMany(Ticket, { foreignKey: 'eventId' });

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: 'localhost' });
    console.log('Server is running on port 3000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
