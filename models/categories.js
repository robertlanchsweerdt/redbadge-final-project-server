const { DataTypes } = require('sequelize');
const db = require('../db');

const Categories = db.define('categories', {
  category: {
    type: DataTypes.STRING(20),
  },
});

module.exports = Categories;
