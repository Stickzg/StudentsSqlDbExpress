const studentsControllers = require('./controllers/students');
const express = require('express');

const router = express.Router();

// List all students

router.get('/students', studentsControllers.index);

// new student

router.get('/students/create', studentsControllers.new);

// get student by id

router.get('/students/:id', studentsControllers.show);

// create Student

router.post('/students', studentsControllers.create);

// student update page

router.get('/students/:id/update', studentsControllers.edit);

// repace student

router.put('/students/:id', studentsControllers.update);

// student count

router.get('/students/count', studentsControllers.count);

// delete student

router.delete('/students/:id', studentsControllers.delete);

module.exports = router;
