const appService = require('../services/booking.service');

exports.getAllEvent = async (req, reply) => {
  const users = await appService.getAllEvent();
  reply.send(users);
};

exports.createTicket = async (req, reply) => {
  try {
    const newTicket = await appService.createTicket(req.body);
    reply.status(200).send(newTicket);
  } catch (error) {
    reply.status(400).send({ message: error.message });
  }
};

exports.verifyTicket = async (req, reply) => {
    try {
      const ticket = await appService.verifyTicket(req.body);
      reply.status(200).send(ticket);
    } catch (error) {
      reply.status(400).send({ message: error.message });
    }
};
