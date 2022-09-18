const db = require("../db");

class TeachersController {
  async createTeachers(req, res) {
    try {
      const {
        first_name,
        last_name,
        patronymic,
        phone,
        birthdate,
        salary,
        position,
      } = req.body;
      const newData = await db.query(
        `INSERT INTO teachers (first_name, last_name, patronymic, phone, birthdate, salary,
      position) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [first_name, last_name, patronymic, phone, birthdate, salary, position]
      );

      res.json(newData.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getTeachers(req, res) {
    try {
      const { id } = req.params;
      const teachers = await db.query("SELECT * FROM teachers WHERE id = $1", [
        id,
      ]);

      res.json(teachers.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getAllTeachers(req, res) {
    try {
      const teachers = await db.query("SELECT * FROM teachers");

      res.json(teachers.rows);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async updateTeachers(req, res) {
    try {
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
      const teacher = await db.query(
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

      res.json(teacher.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async deleteTeachers(req, res) {
    try {
      const { id } = req.params;
      await db.query("DELETE FROM teachers WHERE id = $1", [id]);

      res.json("ok");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = new TeachersController();
