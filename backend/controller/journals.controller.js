const db = require("../db");

class JournalsController {
  async createJournals(req, res) {
    try {
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
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getJournals(req, res) {
    try {
      const { id } = req.params;
      const journals = await db.query("SELECT * FROM journals WHERE id = $1", [
        id,
      ]);

      res.json(journals.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getAllJournals(req, res) {
    try {
      const journals = await db.query("SELECT * FROM journals");

      res.json(journals.rows);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async updateJournals(req, res) {
    try {
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
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async deleteJournals(req, res) {
    try {
      const { id } = req.params;
      await db.query("DELETE FROM journals WHERE id = $1", [id]);

      res.json("ok");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = new JournalsController();
