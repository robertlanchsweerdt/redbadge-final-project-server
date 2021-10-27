const { DataTypes } = require('sequelize');
const db = require('../db');

const Status = db.define('status', {
  status: {
    type: DataTypes.JSON,
  },
});

module.exports = Status;
