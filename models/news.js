const { DataTypes } = require('sequelize');
const db = require('../db');

const News = db.define('news', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  narrative: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cal_date: {
    type: DataTypes.DATE,
  },
  photos: {
    type: DataTypes.JSON,
  },
});

module.exports = News;
