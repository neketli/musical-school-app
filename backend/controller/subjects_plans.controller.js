const db = require("../db");

class SubjectPlanController {
  async createSubjectPlan(req, res) {
    try {
      if (req.body.id) {
        const { id, id_subject, id_plan } = req.body;
        await db.query(
          `INSERT INTO subjects_plans (id, id_subject, id_plan) VALUES ($1, $2, $3)`,
          [id, id_subject, id_plan]
        );
        return;
      }

      const { id_subject, id_plan } = req.body;
      const relation = await db.query(
        `INSERT INTO subjects_plans (id_subject, id_plan) VALUES ($1, $2) RETURNING *`,
        [id_subject, id_plan]
      );

      res?.json(relation.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async getAllSubjectPlan(req, res) {
    try {
      if (!Object.values(req.query).length) {
        const sp = await db.query("SELECT * FROM subjects_plans");
        res?.json(sp.rows);
        return;
      }

      const { id_subject, id_plan } = req.query;
      if (id_plan) {
        const data = await db.query(
          "SELECT * FROM subjects_plans WHERE id_plan = $1",
          [id_plan]
        );
        res?.json(data.rows[0]);
      }
      if (id_subject) {
        const group = await db.query(
          "SELECT * FROM subjects_plans WHERE id_subject = $1",
          [id_subject]
        );

        res?.json(group.rows[0]);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async updateSubjectPlan(req, res) {
    try {
      const { id_subject, id_plan } = req.body;
      let id = req.params ? req.params : req.body;
      
      const data = await db.query(
        `UPDATE subjects_plans SET
    id_subject = $2, id_plan = $3
   WHERE id=$1 returnin *`,
        [id, id_subject, id_plan]
      );
      
      if (req.body.id) {
        return;
      }
      res?.json(data.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async deleteSubjectPlan(req, res) {
    try {
      if (req.body.id) {
        const { id } = req.body;
        await db.query(
          "DELETE FROM subjects_plans WHERE id = $1",
          [id]
        );
        return;
      }

      const { id } = req.params;
      await db.query(
        "DELETE FROM subjects_plans WHERE id = $1",
        [id]
      );
      res?.sendStatus("200");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }

  async revertChanges(item) {
    switch (item.operation) {
      case "INSERT":
        await this.deleteSubjectsTeacher({ body: { ...item } }, {});
        break;
      case "DELETE":
        await this.createSubjectsTeacher({ body: { ...item } }, {});
        break;
      case "UPDATE":
        await this.updateSubjectsTeacher({ body: { ...item } }, {});
        break;
      default:
        break;
    }
  }
  async undoSubjectsPlans(req, res) {
    try {
      const { op_id, limit = 1 } = req.body;
      if (op_id) {
        const queryString = `select * from temp_subjects_plans where op_id = ${op_id}`;
        const data = await db.query(queryString);
        await this.revertChanges(data.rows[0], res);
        res?.json("reverted");
        return;
      }
      const queryString = `select * from temp_subjects_plans order by op_id desc limit ${limit};`;
      const data = await db.query(queryString);
      data.rows.forEach(async (item) => {
        await this.revertChanges(item);
      });
      res?.json("reverted");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
}

module.exports = new SubjectPlanController();
