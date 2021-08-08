const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const Posts = require('./posts');
const Comments = require('./commentaires');
const User =  db.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    userName: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    mail: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {timestamps : false}
);
User.hasMany(Posts);
//user peux avoir plusieurs posts
User.hasMany(Comments);

module.exports = User;