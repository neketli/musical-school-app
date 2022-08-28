const db = require("../db");

class SubjectTeacherController {
  async createSubjectTeacher(req, res) {
    const { id_subject, id_teacher } = req.body;
    const relation = await db.query(
      `INSERT INTO subjects_teacher (id_subject, id_teacher) VALUES ($1, $2) RETURNING *`,
      [id_subject, id_teacher]
    );

    res.json(relation.rows[0]);
  }
  async getSubjectByTeacher(req, res) {
    const { id_teacher } = req.query;
    const students = await db.query(
      "SELECT * FROM subjects_teacher WHERE id_teacher = $1",
      [id_teacher]
    );

    res.json(students.rows[0]);
  }
  async getSubjectsTeacher(req, res) {
    const { id_subject } = req.query;
    const group = await db.query(
      "SELECT * FROM subjects_teacher WHERE id_subject = $1",
      [id_subject]
    );

    res.json(group.rows[0]);
  }
  async getAllSubjectTeacher(req, res) {
    const students = await db.query("SELECT * FROM subjects_teacher");

    res.json(students.rows);
  }
  async updateSubjectTeacher(req, res) {
    const { id_subject, id_teacher } = req.body;
    const student = await db.query(
      `UPDATE subjects_teacher SET
	  	id_subject = $1, id_teacher = $2
	   WHERE id_subject = $1, id_teacher = $2 RETURNING * `,
      [id_subject, id_teacher]
    );

    res.json(student.rows[0]);
  }
  async deleteSubjectTeacher(req, res) {
    const { id_subject, id_teacher } = req.body;

    const _ = await db.query(
      "DELETE FROM students WHERE id_subject = $1, id_teacher = $2",
      [id_subject, id_teacher]
    );

    res.json("ok");
  }
}

module.exports = new SubjectTeacherController();
