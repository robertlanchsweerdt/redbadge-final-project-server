const { DataTypes } = require('sequelize');
const db = require('../db');

const Notes = db.define('notes', {
  comments: {
    type: DataTypes.TEXT,
    required: true,
  },
});

module.exports = Notes;
