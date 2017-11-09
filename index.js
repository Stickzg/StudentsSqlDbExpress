const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const hbs = require('hbs');
const methodOverride = require('method-override');
const path = require('path');

require('dotenv').config();
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect();
const studentsTable = `create table if not exists students
    (id int AUTO_INCREMENT,
    name varchar(100),
    sex boolean,
    score int,
    age int,
    PRIMARY KEY(id) );`;
connection.query(studentsTable, function (err, rows, fields) {
  if (err) throw err;
  console.log('Students table created.');
});

// handlebars

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

app.get('/students/create', function (request, response) {
  response.render('students/create');
});

app.get('/students/:id/update', function (request, response) {
  const studentDatas = `SELECT * FROM students WHERE id='${request.params.id}' ;`;

  connection.query(studentDatas, function (err, rows, fields) {
    if (err) throw err;

    if (rows && rows.length > 0) {
      const student = rows[0];

      response.format({
        'text/html': function () {
          response.render('students/update', {
            student: student
          });
        },
        'applicaton/json': function () {
          response.json({student: student});
        }
      });
    } else {
      response.format({
        'text/html': function () {
          response.render('students/update', {
            student: []
          });
        },
        'applicaton/json': function () {
          response.json({ student: [] });
        }
      });
    }
  });
});

app.get('/students', function (request, response) {
  const list = `SELECT * FROM students;`;
  connection.query(list, function (err, rows, fields) {
    if (rows && rows.length > 0) {
      const students = rows;
      response.format({
        'text/html': function () {
          response.render('students/index', {
            students: students
          });
        },
        'applicaton/json': function () {
          response.json({students: students});
        }
      });
    } else {
      response.format({
        'text/html': function () {
          response.render('students/index', {
            students: []
          });
        },
        'applicaton/json': function () {
          response.json({ students: [] });
        }
      });
    }

    if (err) throw err;
    console.log('Students table created.');
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

app.put('/students/:id', function (request, response) {
  const changeStudent = `UPDATE students SET name='${request.body.name}', sex='${request.body.sex}',
    score='${request.body.score}', age='${request.body.age}' WHERE id='${request.params.id}';`;

  connection.query(changeStudent, function (err, rows, fields) {
    const StudentID = request.params.id;

    if (err) throw err;

    response.format({
      'text/html': function () {
        response.redirect('/students/' + StudentID);
      },

      'application/json': function () {
        response.redirect('/students/' + StudentID);
      }

    });
  });
});

app.get('/students/:id', function (request, response) {
  const studentShow = `SELECT * FROM students WHERE id='${request.params.id}' ;`;

  connection.query(studentShow, function (err, rows, fields) {
    if (err) throw err;

    if (rows && rows.length > 0) {
      const student = rows[0];

      response.format({
        'text/html': function () {
          response.render('students/show', {
            student: student
          });
        },
        'applicaton/json': function () {
          response.json({student: student});
        }
      });
    } else {
      response.format({
        'text/html': function () {
          response.render('students/show', {
            student: []
          });
        },
        'applicaton/json': function () {
          response.json({ student: [] });
        }
      });
    }
  });
});

app.delete('/students/:id', function (request, response) {
  const deleteStudent = `DELETE FROM students WHERE id='${request.params.id}';`;
  connection.query(deleteStudent, function (err, rows, fields) {
    if (err) throw err;

    response.format({
      'text/html': () => response.redirect('/students'),
      'applicaton/json': () => response.redirect('/students')
    });
  }
  );
});

app.post('/students', function (request, response) {
  const createStudent = `INSERT INTO students (name, sex, score, age)
  VALUES ('${request.body.name}' ,
     '${request.body.sex}', 
     '${request.body.score}', 
     '${request.body.age}' ) ;`;
  connection.query(createStudent, function (err, rows, fields) {
    if (err) throw err;
    response.format({
      'text/html': function () {
        response.redirect('/students');
      },
      'application/json': function () {
        response.redirect('/students');
      }
    });
  });
});

app.listen(3000);
