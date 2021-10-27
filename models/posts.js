const { DataTypes } = require('sequelize');
const db = require('../db');

const Posts = db.define('posts', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  has_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  street_number: {
    type: DataTypes.INTEGER,
  },
  street_name: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
  zip: {
    type: DataTypes.INTEGER,
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

module.exports = Posts;
