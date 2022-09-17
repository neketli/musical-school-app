const db = require("../db");

class SubjectPlanController {
  async createSubjectPlan(req, res) {
    const { id_subject, id_plan } = req.body;
    const relation = await db.query(
      `INSERT INTO subjects_plans (id_subject, id_plan) VALUES ($1, $2) RETURNING *`,
      [id_subject, id_plan]
    );

    res.json(relation.rows[0]);
  }
  async getSubjectByPlan(req, res) {
    const { id_plan } = req.query;
    const data = await db.query(
      "SELECT * FROM subjects_plans WHERE id_plan = $1",
      [id_plan]
    );

    res.json(data.rows[0]);
  }
  async getSubjectsPlan(req, res) {
    const { id_subject } = req.query;
    const group = await db.query(
      "SELECT * FROM subjects_plans WHERE id_subject = $1",
      [id_subject]
    );

    res.json(group.rows[0]);
  }
  async getAllSubjectPlan(req, res) {
    const sp = await db.query("SELECT * FROM subjects_plans");
    res.json(sp.rows);
  }
  async updateSubjectPlan(req, res) {
    const { id_subject, id_plan } = req.body;
    const data = await db.query(
      `UPDATE subjects_plans SET
	  	id_subject = $1, id_plan = $2
	   WHERE id_subject = $1, id_plan = $2 RETURNING * `,
      [id_subject, id_plan]
    );

    res.json(data.rows[0]);
  }
  async deleteSubjectPlan(req, res) {
    const { id_subject, id_plan } = req.body;

    await db.query("DELETE FROM data WHERE id_subject = $1, id_plan = $2", [
      id_subject,
      id_plan,
    ]);

    res.json("ok");
  }
}

module.exports = new SubjectPlanController();
