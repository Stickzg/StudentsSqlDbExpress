/* require('dotenv').config();
const mysql = require('mysql'); */
const Sequelize = require('sequelize');
const sequelize = require('../services/sequelize').getIstance();

const student = sequelize.define('student', {
  name: Sequelize.STRING,
  sex: Sequelize.BOOLEAN,
  score: Sequelize.INTEGER,
  age: Sequelize.INTEGER
});

module.exports = student;
