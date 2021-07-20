const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const User = require('./users');
const Comments = require('./commentaires');
const Posts =  db.define('posts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
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
Posts.hasMany(Comments);
module.exports = Posts;