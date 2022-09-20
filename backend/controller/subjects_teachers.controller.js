const db = require("../db");

class SubjectTeacherController {
  async createSubjectTeacher(req, res) {
    try {
      if (req.body.id) {
        const { id, id_subject, id_teacher } = req.body;
        await db.query(
          `INSERT INTO subjects_teachers (id, id_subject, id_teacher) VALUES ($1, $2, $3)`,
          [id, id_subject, id_teacher]
        );
        return;
      }

      const { id_subject, id_teacher } = req.body;
      const relation = await db.query(
        `INSERT INTO subjects_teachers (id_subject, id_teacher) VALUES ($1, $2) RETURNING *`,
        [id_subject, id_teacher]
      );

      res?.json(relation.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async getAllSubjectTeacher(req, res) {
    try {
      if (!Object.values(req.query).length) {
        const data = await db.query(`SELECT * FROM subjects_teachers`);
        res?.json(data.rows);
        return;
      }
      if (req.query.teachers) {
        const data = await db.query(
          `SELECT (teachers.last_name,teachers.first_name,teachers.patronymic,subjects.title) 
          FROM subjects_teachers
          join subjects on subjects_teachers.id_subject = subjects.id
          JOIN teachers on subjects_teachers.id_teacher = teachers.id;`
        );
        res?.json(data.rows.map((item) => item.row.slice(1, -1).split(",")));
        return;
      }
      const { id_subject, id_teacher } = req.query;
      if (id_teacher) {
        const data = await db.query(
          "SELECT * FROM subjects_teachers WHERE id_teacher = $1",
          [id_teacher]
        );
        res?.json(data.rows[0]);
      }
      if (id_subject) {
        const data = await db.query(
          "SELECT * FROM subjects_teachers WHERE id_subject = $1",
          [id_subject]
        );
        res?.json(data.rows[0]);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async updateSubjectTeacher(req, res) {
    try {
      if (req.body.id) {
        const { id, id_subject, id_teacher } = req.body;
        await db.query(
          `UPDATE subjects_teachers SET
	  	id_subject = $2, id_teacher = $3
	   WHERE id=$1`,
          [id, id_subject, id_teacher]
        );
        return;
      }

      const { id } = req.params;
      const { id_subject, id_teacher } = req.body;
      const data = await db.query(
        `UPDATE subjects_teachers SET
	  	id_subject = $2, id_teacher = $3
	   WHERE id=$1 returning *`,
        [id, id_subject, id_teacher]
      );

      res?.json(data.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async deleteSubjectTeacher(req, res) {
    try {
      if (req.body.id) {
        const { id } = req.body;
        await db.query("DELETE FROM subjects_teachers WHERE id = $1", [id]);
        return;
      }

      const { id } = req.params;
      await db.query("DELETE FROM subjects_teachers WHERE id=$1", [id]);

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
  async undoSubjectsTeacher(req, res) {
    try {
      const { op_id, limit = 1 } = req.body;
      if (op_id) {
        const queryString = `select * from temp_subjects_teachers where op_id = ${op_id}`;
        const data = await db.query(queryString);
        await this.revertChanges(data.rows[0], res);
        res?.json("reverted");
        return;
      }
      const queryString = `select * from temp_subjects_teachers order by op_id desc limit ${limit};`;
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

module.exports = new SubjectTeacherController();
