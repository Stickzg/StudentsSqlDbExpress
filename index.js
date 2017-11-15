const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const hbs = require('hbs');
const methodOverride = require('method-override');
const path = require('path');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE,
   process.env.DB_USER, process.env.DB_PASSWORD, {
     host: 'localhost',
     dialect: 'mysql'
   });

const Student = sequelize.define('student', {
  name: Sequelize.STRING,
  sex: Sequelize.BOOLEAN,
  score: Sequelize.INTEGER,
  age: Sequelize.INTEGER
});

const router = require('./routes');

app.set('views', './views/');
app.set('view engine', 'hbs');
app.engine('hbs', require('hbs').__express);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use('/', router);

hbs.registerPartials(path.join(__dirname, '/views/partials'));

hbs.registerHelper('currentPage', (pages, page, options) => {
  if (pages === page) {
    return options.fn(page);
  }
  return options.inverse(this);
});

/* app.get('/scores', function (request, response) {
  let interval = students.filter((student) => {
    return student.score >= request.query.min && student.score <= request.query.max;
  })
  .filter((student) => {
    return student.sex === request.query.sex;
  });
  response.json({student: interval});
}); */

sequelize.sync()
.then(() => app.listen(3000));

module.exports = Student;
