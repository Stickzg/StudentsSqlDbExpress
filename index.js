const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const hbs = require('hbs');
const methodOverride = require('method-override');
const path = require('path');

const Model = require('./model');
const Student = new Model();
// handlebars

Student.connect();
Student.init();

app.set('views', './views/');
app.set('view engine', 'hbs');
app.engine('hbs', require('hbs').__express);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

hbs.registerPartials(path.join(__dirname, '/views/partials'));

hbs.registerHelper('currentPage', (pages, page, options) => {
  if (pages === page) {
    return options.fn(page);
  }
  return options.inverse(this);
});

// student count

app.get('/students/count', function (request, response) {
  Student.count(function (err, students) {
    if (err) {
      response.render('errors/500', {error: err});
    } else {
      response.json({count: students});
    }
  });
});

app.get('/students/create', function (request, response) {
  response.render('students/create');
});

// student update page

app.get('/students/:id/update', function (request, response) {
  Student.findOne({id: request.params.id}, function (err, student) {
    if (err) {
      response.render('errors/500', {error: err});
    } else {
      response.render('students/update', {student: student});
    }
  });
});

// List all students
app.get('/students', function (request, response) {
  Student.findAll(function (error, students) {
    if (error) {
      response.render('errors/500', {error: error}
      );
    } else {
      response.render('students/index', {students: students});
    }
  });
});

app.get('/scores', function (request, response) {
  let interval = students.filter((student) => {
    return student.score >= request.query.min && student.score <= request.query.max;
  })
  .filter((student) => {
    return student.sex === request.query.sex;
  });
  response.json({student: interval});
});

// repace student

app.put('/students/:id', function (request, response) {
  Student.update(request.params.id, request.body, function (err, student) {
    if (err) {
      response.render('errors/500', {error: err});
    } else {
      response.redirect('/  students/');
    }
  });
});

// get student by id

app.get('/students/:id', function (request, response) {
  Student.findOne({id: request.params.id}, function (err, student) {
    if (err) {
      response.render('errors/500', {error: err});
    } else {
      response.render('students/show', {student: student});
    }
  });
});

// delete student

app.delete('/students/:id', function (request, response) {
  Student.delete(request.params.id, function (err, student) {
    if (err) {
      response.render('errors/500', {error: err});
    } else {
      response.redirect('/students/');
    }
  });
});

// create Student

app.post('/students', function (request, response) {
  Student.create(request.body, function (err, student) {
    if (err) {
      response.render('errors/500', {error: err});
    } else {
      response.redirect('/students/');
    }
  });
});

app.listen(3000);
