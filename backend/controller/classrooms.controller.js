const db = require("../db");

class ClassroomsController {
  async createClassrooms(req, res) {
    try {
      const { type, number, id_departament } = req.body;
      const newClassrooms = await db.query(
        `INSERT INTO classrooms (type, number, id_departament) VALUES ($1, $2, $3) RETURNING *`,
        [type, number, id_departament]
      );

      res.json(newClassrooms.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getClassrooms(req, res) {
    try {
      const { id } = req.params;
      const classrooms = await db.query(
        "SELECT * FROM classrooms WHERE id = $1",
        [id]
      );

      res.json(classrooms.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getAllClassrooms(req, res) {
    try {
      const classrooms = await db.query("SELECT * FROM classrooms");

      res.json(classrooms.rows);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async updateClassrooms(req, res) {
    try {
      const { id } = req.params;
      const { type, number, id_departament } = req.body;
      const departament = await db.query(
        "UPDATE classrooms SET type = $2, number = $3, id_departament = $4 WHERE id = $1 RETURNING *",
        [id, type, number, id_departament]
      );

      res.json(departament.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async deleteClassrooms(req, res) {
    try {
      const { id } = req.params;
      await db.query("DELETE FROM classrooms WHERE id = $1", [id]);

      res.json("ok");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = new ClassroomsController();
