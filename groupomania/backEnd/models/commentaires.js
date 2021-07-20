const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const Posts = require('./posts');
const User = require('./users');
const Comments =  db.define('commentaires', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userName: {
        type: DataTypes.STRING(150),
        allowNull: true       
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    userId : {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    postId : {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {timestamps : false},
);

module.exports = Comments;