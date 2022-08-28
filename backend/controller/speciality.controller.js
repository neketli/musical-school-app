const db = require("../db");

class SpecialityController {
  async createSpeciality(req, res) {
    const { title, instrument, id_departament } = req.body;
    const newSpeciality = await db.query(
      `INSERT INTO speciality (title, instrument, id_departament) VALUES ($1, $2, $3) RETURNING *`,
      [title, instrument, id_departament]
    );

    res.json(newSpeciality.rows[0]);
  }
  async getSpeciality(req, res) {
    const { id } = req.params;
    const speciality = await db.query(
      "SELECT * FROM speciality WHERE id = $1",
      [id]
    );

    res.json(speciality.rows[0]);
  }
  async getAllSpeciality(req, res) {
    const speciality = await db.query("SELECT * FROM speciality");

    res.json(speciality.rows);
  }
  async updateSpeciality(req, res) {
    const { id } = req.params;
    const { title, instrument, id_departament } = req.body;
    const departament = await db.query(
      "UPDATE speciality SET title = $2, instrument = $3, id_departament = $4 WHERE id = $1 RETURNING *",
      [id, title, instrument, id_departament]
    );

    res.json(departament.rows[0]);
  }
  async deleteSpeciality(req, res) {
    const { id } = req.params;
    const speciality = await db.query("DELETE FROM speciality WHERE id = $1", [
      id,
    ]);

    res.json("ok");
  }
}

module.exports = new SpecialityController();
