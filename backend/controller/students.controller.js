const db = require("../db");

class StudentsController {
  async createStudents(req, res) {
    try {
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
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getStudents(req, res) {
    try {
      const { id } = req.params;
      const students = await db.query("SELECT * FROM students WHERE id = $1", [
        id,
      ]);

      res.json(students.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getAllStudents(req, res) {
    try {
      const students = await db.query("SELECT * FROM students");

      res.json(students.rows);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async updateStudents(req, res) {
    try {
      const { id } = req.params;
      const {
        first_name,
        last_name,
        patronymic,
        phone,
        birthdate,
        parents_phone,
      } = req.body;
      const student = await db.query(
        `UPDATE students SET
	  	first_name = $2,
		last_name = $3,
		patronymic = $4,
		phone = $5,
		birthdate = $6,
		parents_phone = $7
	   WHERE id = $1 RETURNING * `,
        [id, first_name, last_name, patronymic, phone, birthdate, parents_phone]
      );

      res.json(student.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async deleteStudents(req, res) {
    try {
      const { id } = req.params;
      await db.query("DELETE FROM students WHERE id = $1", [id]);

      res.json("ok");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = new StudentsController();
