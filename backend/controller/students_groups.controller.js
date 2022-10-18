const db = require("../db");

class StudentsGroupsController {
  async createStudentsGroups(req, res) {
    try {
      if (req.body.id) {
        const { id, id_student, id_group } = req.body;
        await db.query(
          `INSERT INTO students_groups (id, id_student, id_group) VALUES ($1, $2, $3)`,
          [id, id_student, id_group]
        );
        return;
      }

      const { id_student, id_group } = req.body;
      const relation = await db.query(
        `INSERT INTO students_groups (id_student, id_group) VALUES ($1, $2) RETURNING *`,
        [id_student, id_group]
      );

      res?.json(relation.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async getAllStudentsGroups(req, res) {
    try {
      let queryString = `SELECT * FROM students_groups 
		JOIN students on students_groups.id_student = students.id
		JOIN groups on students_groups.id_group = groups.id
		JOIN speciality ON groups.id_speciality=speciality.id 
		`;
      if (!Object.values(req.query).length) {
        const data = await db.query(queryString);
        const result = data.rows.map((item) => {
          return {
            id: item.id,
            id_student: `${item.id_student} | ${
              item.last_name
            } ${item.first_name[0].toUpperCase()}. ${item.patronymic[0].toUpperCase()}.`,
            id_group: `${item.id_group} | Год: ${item.year} Форма: ${item.form} | Отделение: ${item.title}`,
          };
        });
        res?.json(result);
        return;
      }
      const { id_student, id_group } = req.query;
      if (id_student) {
        queryString = `SELECT * FROM students_groups JOIN groups ON students_groups.id_group=groups.id 
    		JOIN speciality ON groups.id_speciality=speciality.id
	 		WHERE id_student = $1`;

        const groups = await db.query(queryString, [id_student]);
        res?.json(
          groups.rows.map((item) => {
            return {
              id_group: item.id_group,
              form: item.form,
              speciality: item.title,
              instrument: item.instrument,
            };
          })
        );
        return;
      }

      if (id_group) {
        queryString = `
				SELECT students_groups.id, students.first_name, students.last_name, students.patronymic FROM students_groups
		JOIN students on students_groups.id_student = students.id 
		WHERE id_group = $1`;

        const data = await db.query(queryString, [id_group]);

        const response = data.rows.map((item) => {
          return {
            id: item.id,
            name: `${
              item.last_name
            } ${item.first_name[0].toUpperCase()}. ${item.patronymic[0].toUpperCase()}.`,
          };
        });

        res?.json(response);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async updateStudentsGroups(req, res) {
    try {
      const { id_student, id_group } = req.body;
      let { id } = req.params ? req.params : req.body;

      const data = await db.query(
        `UPDATE students_groups SET
        id_student = $2, id_group = $3
   WHERE id = $1 RETURNING *`,
        [id, id_student, id_group]
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
  async deleteStudentsGroups(req, res) {
    try {
      if (req.body.id) {
        const { id } = req.body;
        await db.query("DELETE FROM students_groups WHERE id = $1", [id]);
        return;
      }
      const { id } = req.params;

      await db.query("DELETE FROM students_groups WHERE id = $1", [id]);
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
        await this.deleteStudentsGroups({ body: { ...item } }, {});
        break;
      case "DELETE":
        await this.createStudentsGroups({ body: { ...item } }, {});
        break;
      case "UPDATE":
        await this.updateStudentsGroups({ body: { ...item } }, {});
        break;
      default:
        break;
    }
  }
  async undoStudentsGroups(req, res) {
    try {
      const { op_id, limit = 1 } = req.body;
      if (op_id) {
        const queryString = `select * from temp_students_groups where op_id = ${op_id}`;
        const data = await db.query(queryString);
        await this.revertChanges(data.rows[0], res);
        res?.json("reverted");
        return;
      }
      const queryString = `select * from temp_students_groups order by op_id desc limit ${limit};`;
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

module.exports = new StudentsGroupsController();
