const db = require("../db");

class StudentsGroupsController {
  async createStudentsGroups(req, res) {
    try {
      const { id_student, id_group } = req.body;
      const relation = await db.query(
        `INSERT INTO students_groups (id_student, id_group) VALUES ($1, $2) RETURNING *`,
        [id_student, id_group]
      );

      res.json(relation.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getStudentsByGroup(req, res) {
    try {
      const { id_group } = req.query;
      const data = await db.query(
        "SELECT * FROM students_groups WHERE id_group = $1",
        [id_group]
      );

      res.json(data.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getStudentsGroups(req, res) {
    try {
      const { id_student } = req.query;
      const group = await db.query(
        "SELECT * FROM students_groups WHERE id_student = $1",
        [id_student]
      );
      res.json(group.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getAllStudentsGroups(req, res) {
    try {
      let queryString = "SELECT * FROM students_groups";
      if (!Object.values(req.query).length) {
        const data = await db.query(queryString);
        res.json(data.rows);
        return;
      }
      const { id_student, id_group } = req.query;
      if (id_student) {
        const response = await db.query(
          queryString + " WHERE id_student = $1",
          [id_student]
        );
        let condition = response.rows
          .map((item) => `id_group = ${item?.id_group}`)
          .join(" OR ");
        queryString = `SELECT * 
        FROM students_groups 
        JOIN students ON students_groups.id=students.id 
        WHERE `;
        const groups = await db.query(queryString + condition);
        res.json(
          groups.rows.map((item) => {
            return {
              id_group: item.id_group,
              last_name: item.last_name,
              first_name: item.first_name,
              patronymic: item.patronymic,
              birthdate: new Date(item.birthdate).toLocaleDateString(),
              phone: item.phone,
            };
          })
        );
        return;
      }

      if (id_group) {
        const data = await db.query(queryString + " WHERE id_group = $1", [
          id_group,
        ]);

        res.json(data.rows);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async updateStudentsGroups(req, res) {
    try {
      const { id_student, id_group } = req.body;
      const data = await db.query(
        `UPDATE students_groups SET
	  	id_student = $1, id_group = $2
	   WHERE id_student = $1, id_group = $2 RETURNING * `,
        [id_student, id_group]
      );

      res.json(data.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async deleteStudentsGroups(req, res) {
    try {
      const { id_student, id_group } = req.body;

      await db.query(
        "DELETE FROM students_groups WHERE id_student = $1, id_group = $2",
        [id_student, id_group]
      );

      res.json("ok");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = new StudentsGroupsController();
