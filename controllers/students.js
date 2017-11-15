const Model = require('../models/student');
const Student = new Model();

Student.connect((err, message) => {
  if (err) {
    console.log(err);
  } else {
    console.log(message);

    Student.init((err, message) => {
      if (err) {
        console.log(err);
      } else {
        console.log(message);
      }
    });
  }
});

module.exports = {
  index: function (request, response) {
    Student.findAll(function (error, students) {
      if (error) {
        response.render('errors/500', {error: error}
        );
      } else {
        response.render('students/index', {students: students});
      }
    });
  },

  show: function (request, response) {
    Student.findOne({id: request.params.id}, function (err, student) {
      if (err) {
        response.render('errors/500', {error: err});
      } else {
        response.render('students/show', {student: student});
      }
    });
  },

  new: function (request, response) {
    response.render('students/create');
  },

  create: function (request, response) {
    Student.create(request.body, function (err, student) {
      if (err) {
        response.render('errors/500', {error: err});
      } else {
        response.redirect('/students/');
      }
    });
  },

  edit: function (request, response) {
    Student.findOne({id: request.params.id}, function (err, student) {
      if (err) {
        response.render('errors/500', {error: err});
      } else {
        response.render('students/update', {student: student});
      }
    });
  },
  update: function (request, response) {
    Student.update(request.params.id, request.body, function (err, student) {
      if (err) {
        response.render('errors/500', {error: err});
      } else {
        response.redirect('/students/');
      }
    });
  },
  delete: function (request, response) {
    Student.delete(request.params.id, function (err, student) {
      if (err) {
        response.render('errors/500', {error: err});
      } else {
        response.redirect('/students/');
      }
    });
  },
  count: function (request, response) {
    Student.count(function (err, students) {
      if (err) {
        response.render('errors/500', {error: err});
      } else {
        response.json({count: students});
      }
    });
  }
};
