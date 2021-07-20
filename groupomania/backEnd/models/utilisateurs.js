const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');

const Utilisateurs =  db.define('utilisateurs', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    picture: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  },
  {timestamps : false}
);

module.exports = Utilisateurs;