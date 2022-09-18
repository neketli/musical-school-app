const db = require("../db");

class SubjectsController {
  async createSubjects(req, res) {
    try {
      const { title } = req.body;
      const newDepartment = await db.query(
        `INSERT INTO subjects (title) VALUES ($1) RETURNING *`,
        [title]
      );

      res.json(newDepartment.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getSubjects(req, res) {
    try {
      const { id } = req.params;
      const subjects = await db.query("SELECT * FROM subjects WHERE id = $1", [
        id,
      ]);

      res.json(subjects.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getAllSubjectss(req, res) {
    try {
      const subjects = await db.query("SELECT * FROM subjects");

      res.json(subjects.rows);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async updateSubjects(req, res) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const subject = await db.query(
        "UPDATE subjects SET title = $2 WHERE id = $1 RETURNING *",
        [id, title]
      );

      res.json(subject.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async deleteSubjects(req, res) {
    try {
      const { id } = req.params;
      await db.query("DELETE FROM subjects WHERE id = $1", [id]);

      res.json("ok");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = new SubjectsController();
