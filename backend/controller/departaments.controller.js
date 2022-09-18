const db = require("../db");

class DepartamentController {
  async createDepartament(req, res) {
    try {
      const { title } = req.body;
      const newDepartment = await db.query(
        `INSERT INTO departaments (title) VALUES ($1) RETURNING *`,
        [title]
      );

      res.json(newDepartment.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getDepartament(req, res) {
    try {
      const { id } = req.params;
      const departaments = await db.query(
        "SELECT * FROM departaments WHERE id = $1",
        [id]
      );

      res.json(departaments.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getAllDepartaments(req, res) {
    try {
      const departaments = await db.query("SELECT * FROM departaments");

      res.json(departaments.rows);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async updateDepartament(req, res) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const departament = await db.query(
        "UPDATE departaments SET title = $2 WHERE id = $1 RETURNING *",
        [id, title]
      );

      res.json(departament.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async deleteDepartament(req, res) {
    try {
      const { id } = req.params;
      await db.query("DELETE FROM departaments WHERE id = $1", [id]);

      res.json("ok");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = new DepartamentController();
