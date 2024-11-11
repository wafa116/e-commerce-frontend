const bcrypt = require('bcryptjs');
const { db } = require('./database');
const { Sequelize, DataTypes } = require('sequelize');

const Credentials = db.define('Credentials', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Hash password before saving the user
  Credentials.beforeCreate(async (credentials) => {
    credentials.password = await bcrypt.hash(credentials.password, 10);
});

  module.exports = { Credentials };