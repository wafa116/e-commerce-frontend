// db.js
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with SQLite in memory mode
const db = new Sequelize('sqlite::memory:', {
  logging: false, // Disable logging; remove this line to see SQL queries
});


module.exports = { db };
