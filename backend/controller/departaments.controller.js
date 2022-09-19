const db = require("../db");

class DepartamentController {
  async createDepartament(req, res) {
    try {
      if (req.body.id) {
        const { id, title } = req.body;
        await db.query(
          `INSERT INTO departaments (id, title) VALUES ($1, $2) RETURNING *`,
          [id, title]
        );
        return;
      }

      const { title } = req.body;
      const newDepartment = await db.query(
        `INSERT INTO departaments (title) VALUES ($1) RETURNING *`,
        [title]
      );

      res.json(newDepartment.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getDepartament(req, res) {
    try {
      const { id } = req.params;
      const departaments = await db.query(
        "SELECT * FROM departaments WHERE id = $1",
        [id]
      );

      res.json(departaments.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getAllDepartaments(req, res) {
    try {
      const departaments = await db.query("SELECT * FROM departaments");

      res.json(departaments.rows);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async updateDepartament(req, res) {
    try {
      if (req.body.id) {
        const { id, title } = req.body;
        await db.query("UPDATE departaments SET title = $2 WHERE id = $1", [
          id,
          title,
        ]);
        return;
      }

      const { id } = req.params;
      const { title } = req.body;
      const departament = await db.query(
        "UPDATE departaments SET title = $2 WHERE id = $1 RETURNING *",
        [id, title]
      );

      res.json(departament.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async deleteDepartament(req, res) {
    try {
      if (req.body.id) {
        const { id } = req.body;
        await db.query("DELETE FROM departaments WHERE id = $1", [id]);
        return;
      }

      const { id } = req.params;
      await db.query("DELETE FROM departaments WHERE id = $1", [id]);

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
        await this.deleteDepartament({ body: { ...item } }, res);
        break;
      case "DELETE":
        await this.createDepartament({ body: { ...item } }, res);
        break;
      case "UPDATE":
        await this.updateDepartament({ body: { ...item } }, res);
        break;
      default:
        break;
    }
  }

  async undoDepartament(req, res) {
    try {
      const { op_id, limit = 1 } = req.body;
      if (op_id) {
        const queryString = `select * from temp_departaments where op_id = ${op_id}`;
        const data = await db.query(queryString);
        await this.revertChanges(data.rows[0], res);
        res.json("reverted");
        return;
      }
      const queryString = `select * from temp_departaments order by op_id desc limit ${limit};`;
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

module.exports = new DepartamentController();
