const db = require("../db");

class JournalsController {
  async createJournals(req, res) {
    const { type, date, grade, id_subject, id_student } = req.body;
    const newStudent = await db.query(
      `INSERT INTO journals (type,
		date,
		grade,
		id_subject,
		id_student) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [type, date, grade, id_subject, id_student]
    );

    res.json(newStudent.rows[0]);
  }
  async getJournals(req, res) {
    const { id } = req.params;
    const journals = await db.query("SELECT * FROM journals WHERE id = $1", [
      id,
    ]);

    res.json(journals.rows[0]);
  }
  async getAllJournals(req, res) {
    const journals = await db.query("SELECT * FROM journals");

    res.json(journals.rows);
  }
  async updateJournals(req, res) {
    const { id } = req.params;
    const { type, date, grade, id_subject, id_student } = req.body;
    const departament = await db.query(
      `UPDATE journals SET
	  	type = $2,
		date = $3,
		grade = $4,
		id_subject = $5,
		id_student = $6
	   WHERE id = $1 RETURNING * `,
      [id, type, date, grade, id_subject, id_student]
    );

    res.json(departament.rows[0]);
  }
  async deleteJournals(req, res) {
    const { id } = req.params;
    const journals = await db.query("DELETE FROM journals WHERE id = $1", [id]);

    res.json("ok");
  }
}

module.exports = new JournalsController();
