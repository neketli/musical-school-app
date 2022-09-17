const db = require("../db");

class StudentsGroupsController {
  async createStudentsGroups(req, res) {
    const { id_student, id_group } = req.body;
    const relation = await db.query(
      `INSERT INTO students_groups (id_student, id_group) VALUES ($1, $2) RETURNING *`,
      [id_student, id_group]
    );

    res.json(relation.rows[0]);
  }
  async getStudentsByGroup(req, res) {
    const { id_group } = req.query;
    const data = await db.query(
      "SELECT * FROM students_groups WHERE id_group = $1",
      [id_group]
    );

    res.json(data.rows[0]);
  }
  async getStudentsGroup(req, res) {
    const { id_student } = req.query;
    const group = await db.query(
      "SELECT * FROM students_groups WHERE id_student = $1",
      [id_student]
    );

    res.json(group.rows[0]);
  }
  async getAllStudentsGroups(req, res) {
    const data = await db.query("SELECT * FROM students_groups");

    res.json(data.rows);
  }
  async updateStudentsGroups(req, res) {
    const { id_student, id_group } = req.body;
    const data = await db.query(
      `UPDATE students_groups SET
	  	id_student = $1, id_group = $2
	   WHERE id_student = $1, id_group = $2 RETURNING * `,
      [id_student, id_group]
    );

    res.json(data.rows[0]);
  }
  async deleteStudentsGroups(req, res) {
    const { id_student, id_group } = req.body;

    await db.query(
      "DELETE FROM students_groups WHERE id_student = $1, id_group = $2",
      [id_student, id_group]
    );

    res.json("ok");
  }
}

module.exports = new StudentsGroupsController();
