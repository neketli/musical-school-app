const db = require("../db");

class StudentsController {
  async createStudents(req, res) {
    const {
      first_name,
      last_name,
      patronymic,
      phone,
      birthdate,
      parents_phone,
    } = req.body;
    const newStudent = await db.query(
      `INSERT INTO students (first_name, last_name, patronymic, phone, birthdate, parents_phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [first_name, last_name, patronymic, phone, birthdate, parents_phone]
    );

    res.json(newStudent.rows[0]);
  }
  async getStudents(req, res) {
    const { id } = req.params;
    const students = await db.query("SELECT * FROM students WHERE id = $1", [
      id,
    ]);

    res.json(students.rows[0]);
  }
  async getAllStudents(req, res) {
    const students = await db.query("SELECT * FROM students");

    res.json(students.rows);
  }
  async updateStudents(req, res) {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      patronymic,
      phone,
      birthdate,
      parents_phone,
    } = req.body;
    const departament = await db.query(
      `UPDATE students SET
	  	first_name = $2,
		last_name = $3,
		patronymic = $4,
		phone = $5,
		birthdate = $6,
		parents_phone = $7
	   WHERE id = $1 RETURNING * `,
      [first_name, last_name, patronymic, phone, birthdate, parents_phone]
    );

    res.json(departament.rows[0]);
  }
  async deleteStudents(req, res) {
    const { id } = req.params;
    const students = await db.query("DELETE FROM students WHERE id = $1", [id]);

    res.json("ok");
  }
}

module.exports = new StudentsController();
