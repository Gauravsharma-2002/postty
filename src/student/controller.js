const pool = require("../../db");
const queries = require("../student/queries");
const getStudents = (req, res) => {
  console.log(`getting students`);
  pool.query(queries.getStudents, (error, result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;
  //check for valid email exists already
  pool.query(queries.checkEmailExists, [email], (err, result) => {
    if (result.rows.length) {
      res.send("Email already EXISTS!!");
    }

    pool.query(queries.addStudent, [name, email, age, dob], (err, result) => {
      if (err) throw err;
      res.status(202).send("Student added succesfully");
      console.log("student added succesfull !!!");
    });
  });
};

const deleteStudent = (req, res) => {
  //if student exist then delete them unless retrun they dont exist
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (err, result) => {
    const noStudentExist = !result.rows.length;
    if (noStudentExist) {
      res.send("no student Exist in DB");
    }

    pool.query(queries.deleteStudent, [id], (err, result) => {
      if (err) throw err;
      res.status(200).send("Student deleted succesfully");
    });
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  pool.query(queries.getStudentById, [id], (err, result) => {
    const noUserFound = !result.rows.length;
    if (noUserFound) {
      res.status(401).send("Student does not EXists");
    }
    pool.query(queries.updateStudent, [name, id], (err, result) => {
      if (err) throw err;
      res.status(202).send("Student Updated succesfully");
    });
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  deleteStudent,
  updateStudent,
};
