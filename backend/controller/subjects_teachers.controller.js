const db = require("../db");

class SubjectTeacherController {
  async createSubjectTeacher(req, res) {
    try {
      const { id_subject, id_teacher } = req.body;
      const relation = await db.query(
        `INSERT INTO subjects_teachers (id_subject, id_teacher) VALUES ($1, $2) RETURNING *`,
        [id_subject, id_teacher]
      );

      res.json(relation.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getAllSubjectTeacher(req, res) {
    try {
      if (!Object.values(req.query).length) {
        const data = await db.query(`SELECT * FROM subjects_teachers`);
        res.json(data.rows);
        return;
      }
      if (req.query.teachers) {
        const data = await db.query(
          `SELECT (teachers.last_name,teachers.first_name,teachers.patronymic,subjects.title) 
          FROM subjects_teachers
          join subjects on subjects_teachers.id_subject = subjects.id
          JOIN teachers on subjects_teachers.id_teacher = teachers.id;`
        );
        res.json(data.rows.map((item) => item.row.slice(1, -1).split(",")));
        return;
      }
      const { id_subject, id_teacher } = req.query;
      if (id_teacher) {
        const data = await db.query(
          "SELECT * FROM subjects_teachers WHERE id_teacher = $1",
          [id_teacher]
        );
        res.json(data.rows[0]);
      }
      if (id_subject) {
        const data = await db.query(
          "SELECT * FROM subjects_teachers WHERE id_subject = $1",
          [id_subject]
        );
        res.json(data.rows[0]);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async updateSubjectTeacher(req, res) {
    try {
      const { id_subject, id_teacher } = req.body;
      const data = await db.query(
        `UPDATE subjects_teachers SET
	  	id_subject = $1, id_teacher = $2
	   WHERE id_subject = $1, id_teacher = $2 RETURNING * `,
        [id_subject, id_teacher]
      );

      res.json(data.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async deleteSubjectTeacher(req, res) {
    try {
      const { id_subject, id_teacher } = req.body;

      await db.query(
        "DELETE FROM subjects_teachers WHERE id_subject = $1, id_teacher = $2",
        [id_subject, id_teacher]
      );

      res.json("ok");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = new SubjectTeacherController();
