const db = require("../db");

class UsersController {
  async createUsers(req, res) {
    try {
      if (req.body.id) {
        const { id, login, password, role, rid } = req.body;
        await db.query(
          `INSERT INTO users (id, login, password, role, rid) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [id, login, password, role, rid]
        );
        return;
      }

      const { login, password, role, rid } = req.body;
      const newUsers = await db.query(
        `INSERT INTO users (login, password, role, rid) VALUES ($1, $2, $3, $4) RETURNING *`,
        [login, password, role, rid]
      );

      res.json(newUsers.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getUsers(req, res) {
    try {
      const { id } = req.params;
      const users = await db.query("SELECT * FROM users WHERE id = $1", [id]);

      res.json(users.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getAllUsers(req, res) {
    try {
      const users = await db.query("SELECT * FROM users");

      res.json(users.rows);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async updateUsers(req, res) {
    try {
      if (req.body.id) {
        const { id, login, password, role, rid } = req.body;
        await db.query(
          `UPDATE users SET
	  	login = $2, password = $3, role = $4, rid= $5
	   WHERE id = $1 RETURNING * `,
          [id, login, password, role, rid]
        );
        return;
      }
      const { id } = req.params;
      const { login, password, role, rid } = req.body;
      const student = await db.query(
        `UPDATE users SET
	  	login = $2, password = $3, role = $4, rid= $5
	   WHERE id = $1 RETURNING * `,
        [id, login, password, role, rid]
      );

      res.json(student.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async deleteUsers(req, res) {
    try {
      if (req.body.id) {
        const { id } = req.body;
        await db.query("DELETE FROM users WHERE id = $1", [id]);
        return;
      }

      const { id } = req.params;
      await db.query("DELETE FROM users WHERE id = $1", [id]);

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
        await this.deleteUsers({ body: { ...item } }, res);
        break;
      case "DELETE":
        await this.createUsers({ body: { ...item } }, res);
        break;
      case "UPDATE":
        await this.updateUsers({ body: { ...item } }, res);
        break;
      default:
        break;
    }
  }
  async undoUsers(req, res) {
    try {
      const { op_id, limit = 1 } = req.body;
      if (op_id) {
        const queryString = `select * from temp_users where op_id = ${op_id}`;
        const data = await db.query(queryString);
        await this.revertChanges(data.rows[0], res);
        res.json("reverted");
        return;
      }
      const queryString = `select * from temp_users order by op_id desc limit ${limit};`;
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

module.exports = new UsersController();
