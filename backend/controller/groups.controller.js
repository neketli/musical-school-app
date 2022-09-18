const db = require("../db");

class GroupsController {
  async createGroups(req, res) {
    try {
      const { form, year, id_speciality } = req.body;
      const newGroups = await db.query(
        `INSERT INTO groups (form, year, id_speciality) VALUES ($1, $2, $3) RETURNING *`,
        [form, year, id_speciality]
      );

      res.json(newGroups.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getGroups(req, res) {
    try {
      const { id } = req.params;
      const groups = await db.query("SELECT * FROM groups WHERE id = $1", [id]);

      res.json(groups.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getAllGroups(req, res) {
    try {
      const groups = await db.query("SELECT * FROM groups");

      res.json(groups.rows);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async updateGroups(req, res) {
    try {
      const { id } = req.params;
      const { form, year, id_speciality } = req.body;
      const departament = await db.query(
        "UPDATE groups SET form = $2, year = $3, id_speciality = $4 WHERE id = $1 RETURNING *",
        [id, form, year, id_speciality]
      );

      res.json(departament.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async deleteGroups(req, res) {
    try {
      const { id } = req.params;
      await db.query("DELETE FROM groups WHERE id = $1", [id]);

      res.json("ok");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = new GroupsController();
