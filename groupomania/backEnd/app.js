const express = require('express');
const helmet = require("helmet");

const app = express();
const { Sequelize , DataTypes } = require('sequelize');
const path = require('path');
const bodyParser = require("body-parser");
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const user = require('./routes/user');
const posts = require('./routes/post');
const comments = require('./routes/comment');
const account = require('./routes/account');

app.use(helmet());
app.use(
  mongoSanitize({
    replaceWith: '_',
  }),
);

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});  

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', user);
app.use('/api/post', posts);
app.use('/api/comment', comments);
app.use('/api/account', account);

module.exports = app;