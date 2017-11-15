require('dotenv').config();
const mysql = require('mysql');

class Model {
  constructor () {
    this.connection = null;
  }

  connect (callback) {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });
    this.connection.connect((err, message) => {
      if (err) return callback(err);
      return callback(null, 'Connection succesfull.');
    });
  }

  init (callback) {
    const studentsTable = `create table if not exists students
    (id int AUTO_INCREMENT,
    name varchar(100),
    sex boolean,
    score int,
    age int,
    PRIMARY KEY(id) );`;

    this.connection.query(studentsTable, function (err, rows, fields) {
      if (err) return callback(err);
      return callback(null, 'Students table created.');
    });
  }

  findAll (callback) {
    const list = `SELECT * FROM students;`;
    this.connection.query(list, function (err, rows, fields) {
      if (err) {
        return callback(err);
      }
      if (rows && rows.length > 0) {
        return callback(null, rows);
      } else {
        return callback(null, []);
      }
    });
  }

  findOne (queryObject, callback) {
    const key = Object.keys(queryObject)[0];
    const value = [queryObject[key]];
    const findStudent = `SELECT * FROM students WHERE ${key}='${value}' ;`;

    this.connection.query(findStudent, function (err, rows, fields) {
      const student = rows[0];
      if (err) {
        return callback(err);
      }
      if (rows && rows.length > 0) {
        return callback(null, student);
      } else {
        return student;
      }
    });
  }

  create (queryObject, callback) {
    const createStudent = `INSERT INTO students (name, sex, score, age)
    VALUES ('${queryObject.name}' ,
      '${queryObject.sex}', 
      '${queryObject.score}', 
      '${queryObject.age}' ) ;`;
    this.connection.query(createStudent, function (err, rows, fields) {
      if (err) {
        return callback(err);
      }
      if (rows && rows.length > 0) {
        return callback(null, rows);
      } else {
        return callback(null, []);
      }
    });
  }

  delete (id, callback) {
    const deleteStudent = `DELETE FROM students WHERE id='${id}';`;
    this.connection.query(deleteStudent, function (err, rows, fields) {
      if (err) {
        return callback(err);
      }
      if (rows && rows.length > 0) {
        return callback(null, rows);
      } else {
        return callback(null, []);
      }
    });
  }

  update (id, queryObject, callback) {
    const updateStudent = `UPDATE students SET name='${queryObject.name}',
                            sex='${queryObject.sex}',
                            score='${queryObject.score}',
                            age='${queryObject.age}'
                            WHERE id='${id}';`;

    this.connection.query(updateStudent, function (err, rows, fields) {
      if (err) {
        return callback(err);
      }
      if (rows && rows.length > 0) {
        return callback(null, rows);
      } else {
        return callback(null, []);
      }
    });
  }
  count (callback) {
    const countStudent = `SELECT COUNT(id) FROM students;`;

    this.connection.query(countStudent, function (err, rows, fields) {
      if (err) {
        return callback(err);
      }
      if (rows && rows.length > 0) {
        return callback(null, rows[0]['COUNT(id)']);
      } else {
        return callback(null, []);
      }
    });
  }

  findAndCount () {

  }
}

module.exports = Model;