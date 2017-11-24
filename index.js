const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const hbs = require('hbs');
const methodOverride = require('method-override');
const path = require('path');
const sequelize = require('./services/sequelize');

const app = express();
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

sequelize.init()
.then(() => app.listen(3000))
.catch();
