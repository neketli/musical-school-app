const db = require("../db");

class ClassroomsController {
  async createClassrooms(req, res) {
    try {
      if (req.body.id) {
        const { id, type, number, id_classroom } = req.body;
        await db.query(
          `INSERT INTO classrooms (id, type, number, id_classroom) VALUES ($1, $2, $3, $4)`,
          [id, type, number, id_classroom]
        );
        return;
      }

      const { type, number, id_classroom } = req.body;
      const newClassrooms = await db.query(
        `INSERT INTO classrooms (type, number, id_classroom) VALUES ($1, $2, $3) RETURNING *`,
        [type, number, id_classroom]
      );

      res.json(newClassrooms.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getClassrooms(req, res) {
    try {
      const { id } = req.params;
      const classrooms = await db.query(
        "SELECT * FROM classrooms WHERE id = $1",
        [id]
      );

      res.json(classrooms.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getAllClassrooms(req, res) {
    try {
      const classrooms = await db.query("SELECT * FROM classrooms");

      res.json(classrooms.rows);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async updateClassrooms(req, res) {
    try {
      if (req.body.id) {
        const { id, type, number, id_classroom } = req.body;
        await db.query(
          "UPDATE classrooms SET type = $2, number = $3, id_classroom = $4 WHERE id = $1",
          [id, type, number, id_classroom]
        );
        return;
      }

      const { id } = req.params;
      const { type, number, id_classroom } = req.body;
      const classroom = await db.query(
        "UPDATE classrooms SET type = $2, number = $3, id_classroom = $4 WHERE id = $1 RETURNING *",
        [id, type, number, id_classroom]
      );

      res.json(classroom.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async deleteClassrooms(req, res) {
    try {
      if (req.body.id) {
        const { id } = req.body;
        await db.query("DELETE FROM classrooms WHERE id = $1", [id]);
        return;
      }

      const { id } = req.params;
      await db.query("DELETE FROM classrooms WHERE id = $1", [id]);
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
        await this.deleteClassrooms({ body: { ...item } }, res);
        break;
      case "DELETE":
        await this.createClassrooms({ body: { ...item } }, res);
        break;
      case "UPDATE":
        await this.updateClassrooms({ body: { ...item } }, res);
        break;
      default:
        break;
    }
  }

  async undoClassrooms(req, res) {
    try {
      const { op_id, limit = 1 } = req.body;
      if (op_id) {
        const queryString = `select * from temp_classrooms where op_id = ${op_id}`;
        const data = await db.query(queryString);
        await this.revertChanges(data.rows[0], res);
        res.json("reverted");
        return;
      }
      const queryString = `select * from temp_classrooms order by op_id desc limit ${limit};`;
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

module.exports = new ClassroomsController();
