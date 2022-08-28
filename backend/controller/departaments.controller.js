const db = require("../db");

class DepartamentController {
  async createDepartament(req, res) {
    const { title } = req.body;
    const newDepartment = await db.query(
      `INSERT INTO departaments (title) VALUES ($1) RETURNING *`,
      [title]
    );

    res.json(newDepartment.rows[0]);
  }
  async getDepartament(req, res) {
    const { id } = req.params;
    const departaments = await db.query(
      "SELECT * FROM departaments WHERE id = $1",
      [id]
    );

    res.json(departaments.rows[0]);
  }
  async getAllDepartaments(req, res) {
    const departaments = await db.query("SELECT * FROM departaments");

    res.json(departaments.rows);
  }
  async updateDepartament(req, res) {
    const { id } = req.params;
    const { title } = req.body;
    const departament = await db.query(
      "UPDATE departaments SET title = $2 WHERE id = $1 RETURNING *",
      [id, title]
    );

    res.json(departament.rows[0]);
  }
  async deleteDepartament(req, res) {
    const { id } = req.params;
    const departaments = await db.query(
      "DELETE FROM departaments WHERE id = $1",
      [id]
    );

    res.json("ok");
  }
}

module.exports = new DepartamentController();
