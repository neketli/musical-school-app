const db = require("../db");

class GroupsController {
  async createGroups(req, res) {
    const { form, year, id_speciality } = req.body;
    const newGroups = await db.query(
      `INSERT INTO groups (form, year, id_speciality) VALUES ($1, $2, $3) RETURNING *`,
      [form, year, id_speciality]
    );

    res.json(newGroups.rows[0]);
  }
  async getGroups(req, res) {
    const { id } = req.params;
    const groups = await db.query("SELECT * FROM groups WHERE id = $1", [id]);

    res.json(groups.rows[0]);
  }
  async getAllGroups(req, res) {
    const groups = await db.query("SELECT * FROM groups");

    res.json(groups.rows);
  }
  async updateGroups(req, res) {
    const { id } = req.params;
    const { form, year, id_speciality } = req.body;
    const departament = await db.query(
      "UPDATE groups SET form = $2, year = $3, id_speciality = $4 WHERE id = $1 RETURNING *",
      [id, form, year, id_speciality]
    );

    res.json(departament.rows[0]);
  }
  async deleteGroups(req, res) {
    const { id } = req.params;
    const groups = await db.query("DELETE FROM groups WHERE id = $1", [id]);

    res.json("ok");
  }
}

module.exports = new GroupsController();
