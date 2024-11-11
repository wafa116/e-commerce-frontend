// db.js
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with SQLite in memory mode
const sequelize = new Sequelize('sqlite::memory:', {
  logging: false, // Disable logging; remove this line to see SQL queries
});

// Define models
const User = sequelize.define('User', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = { sequelize, User };
