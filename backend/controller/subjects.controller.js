const db = require("../db");

class SubjectsController {
  async createSubjects(req, res) {
    try {
      if (req.body.id) {
        const { id, title } = req.body;
        await db.query(`INSERT INTO subjects (id, title) VALUES ($1, $2)`, [
          id,
          title,
        ]);
        return;
      }

      const { title } = req.body;
      const newDepartment = await db.query(
        `INSERT INTO subjects (title) VALUES ($1) RETURNING *`,
        [title]
      );

      res?.json(newDepartment.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async getSubjects(req, res) {
    try {
      const { id } = req.params;
      const subjects = await db.query("SELECT * FROM subjects WHERE id = $1", [
        id,
      ]);

      res?.json(subjects.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async getAllSubjectss(req, res) {
    try {
      const subjects = await db.query("SELECT * FROM subjects");

      res?.json(subjects.rows);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async updateSubjects(req, res) {
    try {
      const { id, title } = req.body;
      await db.query("UPDATE subjects SET title = $2 WHERE id = $1", [
        id,
        title,
      ]);

      if (req?.params?.id) {
        res?.sendStatus(200);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async deleteSubjects(req, res) {
    try {
      if (req.body.id) {
        const { id } = req.body;
        await db.query("DELETE FROM subjects WHERE id = $1", [id]);
        return;
      }
      const { id } = req.params;
      await db.query("DELETE FROM subjects WHERE id = $1", [id]);

      res?.json("ok");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async revertChanges(item) {
    switch (item.operation) {
      case "INSERT":
        await this.deleteSubjects({ body: { ...item } }, {});
        break;
      case "DELETE":
        await this.createSubjects({ body: { ...item } }, {});
        break;
      case "UPDATE":
        await this.updateSubjects({ body: { ...item } }, {});
        break;
      default:
        break;
    }
  }
  async undoSubjects(req, res) {
    try {
      const { op_id, limit = 1 } = req.body;
      if (op_id) {
        const queryString = `select * from temp_subjects where op_id = ${op_id}`;
        const data = await db.query(queryString);
        await this.revertChanges(data.rows[0], res);
        res?.json("reverted");
        return;
      }
      const queryString = `select * from temp_subjects order by op_id desc limit ${limit};`;
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

module.exports = new SubjectsController();
