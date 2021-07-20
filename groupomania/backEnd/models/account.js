const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const User = require('./users');
const Account =  db.define('account', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    textDescription: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    adresse: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    media: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    userId : {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {timestamps : false}
);
Account.hasOne(User);
module.exports = Account;