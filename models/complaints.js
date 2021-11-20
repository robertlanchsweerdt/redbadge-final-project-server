const { DataTypes } = require('sequelize');
const db = require('../db');

const Complaints = db.define('complaints', {
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING(20),
  },
  zip: {
    type: DataTypes.INTEGER,
  },
  narrative: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  photos: {
    type: DataTypes.JSON,
  },
});

module.exports = Complaints;
