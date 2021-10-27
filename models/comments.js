const { DataTypes } = require('sequelize');
const db = require('../db');

const Comments = db.define('comments', {
  comments: {
    type: DataTypes.TEXT,
    required: true,
  },
});

module.exports = Comments;
