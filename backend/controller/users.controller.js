const db = require("../db");

class UsersController {
  async createUsers(req, res) {
    try {
      const { login, password, role } = req.body;
      const newUsers = await db.query(
        `INSERT INTO users (login, password, role) VALUES ($1, $2, $3) RETURNING *`,
        [login, password, role]
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
      const { id } = req.params;
      const { login, password, role } = req.body;
      const student = await db.query(
        `UPDATE users SET
	  	login = $2, password = $3, role = $4
	   WHERE id = $1 RETURNING * `,
        [id, login, password, role]
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
      const { id } = req.params;
      await db.query("DELETE FROM users WHERE id = $1", [id]);

      res.json("ok");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = new UsersController();
