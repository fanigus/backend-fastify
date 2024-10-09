const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Event = require('./event.model')

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  classe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isUsed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  eventId: { 
    type: DataTypes.INTEGER,
    references: {
      model: Event,
      key: 'id',
    },
    allowNull: false,
  },
});
Ticket.belongsTo(Event, { foreignKey: 'eventId' });

module.exports = Ticket;