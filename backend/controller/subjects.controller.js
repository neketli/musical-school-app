const db = require("../db");

class SubjectsController {
  async createSubjects(req, res) {
    const { title } = req.body;
    const newDepartment = await db.query(
      `INSERT INTO subjects (title) VALUES ($1) RETURNING *`,
      [title]
    );

    res.json(newDepartment.rows[0]);
  }
  async getSubjects(req, res) {
    const { id } = req.params;
    const subjects = await db.query("SELECT * FROM subjects WHERE id = $1", [
      id,
    ]);

    res.json(subjects.rows[0]);
  }
  async getAllSubjectss(req, res) {
    const subjects = await db.query("SELECT * FROM subjects");

    res.json(subjects.rows);
  }
  async updateSubjects(req, res) {
    const { id } = req.params;
    const { title } = req.body;
    const subject = await db.query(
      "UPDATE subjects SET title = $2 WHERE id = $1 RETURNING *",
      [id, title]
    );

    res.json(subject.rows[0]);
  }
  async deleteSubjects(req, res) {
    const { id } = req.params;
    const subjects = await db.query("DELETE FROM subjects WHERE id = $1", [id]);

    res.json("ok");
  }
}

module.exports = new SubjectsController();
