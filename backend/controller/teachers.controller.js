const db = require("../db");

class TeachersController {
  async createTeachers(req, res) {
    const {
      first_name,
      last_name,
      patronymic,
      phone,
      birthdate,
      salary,
      position,
    } = req.body;
    const newStudent = await db.query(
      `INSERT INTO teachers (first_name, last_name, patronymic, phone, birthdate, salary,
      position) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [first_name, last_name, patronymic, phone, birthdate, salary, position]
    );

    res.json(newStudent.rows[0]);
  }
  async getTeachers(req, res) {
    const { id } = req.params;
    const teachers = await db.query("SELECT * FROM teachers WHERE id = $1", [
      id,
    ]);

    res.json(teachers.rows[0]);
  }
  async getAllTeachers(req, res) {
    const teachers = await db.query("SELECT * FROM teachers");

    res.json(teachers.rows);
  }
  async updateTeachers(req, res) {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      patronymic,
      phone,
      birthdate,
      salary,
      position,
    } = req.body;
    const departament = await db.query(
      `UPDATE teachers SET
	  	first_name = $2,
      last_name = $3,
      patronymic = $4,
      phone = $5,
      birthdate = $6,
      salary = $7,
      position = $8
	   WHERE id = $1 RETURNING * `,
      [
        id,
        first_name,
        last_name,
        patronymic,
        phone,
        birthdate,
        salary,
        position,
      ]
    );

    res.json(departament.rows[0]);
  }
  async deleteTeachers(req, res) {
    const { id } = req.params;
    const teachers = await db.query("DELETE FROM teachers WHERE id = $1", [id]);

    res.json("ok");
  }
}

module.exports = new TeachersController();
