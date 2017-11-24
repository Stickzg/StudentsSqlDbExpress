const Student = require('../models/student');

module.exports = {
  index: (request, response) => {
    Student.findAll()
    .then((students) => response.render('students/index', {students: students}))
    .catch((err) => response.render('errors/500', {error: err}));
  },
  show: (request, response) => {
    Student.findById(request.params.id)
      .then((student) => response.render('students/show', {student: student}))
      .catch((err) => response.render('errors/500', {error: err}));
  },

  new: function (request, response) {
    response.render('students/create');
  },

  create: (request, response) => {
    Student.create(request.body)
    .then((student) => response.redirect('/students/'))
    .catch((err) => response.render('errors/500', {error: err}));
  },

  edit: (request, response) => {
    Student.findOne({id: request.params.id})
    .then((student) => response.render('students/update', {student: student}))
    .catch((err) => response.render('errors/500', {error: err}));
  },

  update: (request, response) => {
    Student.findById(request.params.id)
      .then((student) => student.update(request.body))
      .then((student) => response.redirect('/students/'))
      .catch((err) => response.render('errors/500', {error: err}));
  },

  delete: (request, response) => {
    Student.findById(request.params.id)
      .then((student) => student.destroy())
      .then(() => response.redirect('/students/'))
      .catch((err) => response.render('errors/500', {error: err}));
  },

  count: (request, response) => {
    Student.count()
      .then((student) => response.json({count: student}))
      .catch((err) => response.render('errors/500', {error: err}));
  }
};
