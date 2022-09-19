const db = require("../db");

class TeachersController {
  async createTeachers(req, res) {
    try {
      if (req.body.id) {
        const {
          id,
          first_name,
          last_name,
          patronymic,
          phone,
          birthdate,
          salary,
          position,
        } = req.body;
        await db.query(
          `INSERT INTO teachers (id, first_name, last_name, patronymic, phone, birthdate, salary,
      position) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
          [
            id,
            first_name,
            last_name,
            patronymic,
            phone,
            birthdate,
            salary,
            position,
          ]
        );
        return;
      }

      const {
        first_name,
        last_name,
        patronymic,
        phone,
        birthdate,
        salary,
        position,
      } = req.body;
      const newData = await db.query(
        `INSERT INTO teachers (first_name, last_name, patronymic, phone, birthdate, salary,
      position) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [first_name, last_name, patronymic, phone, birthdate, salary, position]
      );

      res.json(newData.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getTeachers(req, res) {
    try {
      const { id } = req.params;
      const teachers = await db.query("SELECT * FROM teachers WHERE id = $1", [
        id,
      ]);

      res.json({
        ...teachers.rows[0],
        birthdate: new Date(teachers[0].birthdate).toLocaleDateString(),
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getAllTeachers(req, res) {
    try {
      const teachers = await db.query("SELECT * FROM teachers");

      res.json(
        teachers.rows.map((item) => {
          return {
            ...item,
            birthdate: new Date(item.birthdate).toLocaleDateString(),
          };
        })
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async updateTeachers(req, res) {
    try {
      if (req.body.id) {
        const {
          id,
          first_name,
          last_name,
          patronymic,
          phone,
          birthdate,
          salary,
          position,
        } = req.body;
        await db.query(
          `UPDATE teachers SET
	  	first_name = $2,
      last_name = $3,
      patronymic = $4,
      phone = $5,
      birthdate = $6,
      salary = $7,
      position = $8
	   WHERE id = $1 `,
          [
            id,
            first_name,
            last_name,
            patronymic,
            phone,
            birthdate,
            salary,
            position,
          ]
        );
        return;
      }

      const { id } = req.params;
      const {
        first_name,
        last_name,
        patronymic,
        phone,
        birthdate,
        salary,
        position,
      } = req.body;
      const teacher = await db.query(
        `UPDATE teachers SET
	  	first_name = $2,
      last_name = $3,
      patronymic = $4,
      phone = $5,
      birthdate = $6,
      salary = $7,
      position = $8
	   WHERE id = $1 RETURNING * `,
        [
          id,
          first_name,
          last_name,
          patronymic,
          phone,
          birthdate,
          salary,
          position,
        ]
      );

      res.json(teacher.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async deleteTeachers(req, res) {
    try {
      if (req.body.id) {
        const { id } = req.body;
        await db.query("DELETE FROM teachers WHERE id = $1", [id]);
        return;
      }

      const { id } = req.params;
      await db.query("DELETE FROM teachers WHERE id = $1", [id]);

      res.json("ok");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async revertChanges(item, res) {
    switch (item.operation) {
      case "INSERT":
        await this.deleteTeachers({ body: { ...item } }, res);
        break;
      case "DELETE":
        await this.createTeachers({ body: { ...item } }, res);
        break;
      case "UPDATE":
        await this.updateTeachers({ body: { ...item } }, res);
        break;
      default:
        break;
    }
  }
  async undoTeachers(req, res) {
    try {
      const { op_id, limit = 1 } = req.body;
      if (op_id) {
        const queryString = `select * from temp_teachers where op_id = ${op_id}`;
        const data = await db.query(queryString);
        await this.revertChanges(data.rows[0], res);
        res.json("reverted");
        return;
      }
      const queryString = `select * from temp_teachers order by op_id desc limit ${limit};`;
      const data = await db.query(queryString);
      data.rows.forEach(async (item) => {
        await this.revertChanges(item, res);
      });
      res.json("reverted");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = new TeachersController();
