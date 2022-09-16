const db = require("../db");

class UsersController {
  async createUsers(req, res) {
    const { login, password, role } = req.body;
    const newUsers = await db.query(
      `INSERT INTO users (login, password, role) VALUES ($1, $2, $3) RETURNING *`,
      [login, password, role]
    );

    res.json(newUsers.rows[0]);
  }
  async getUsers(req, res) {
    const { id } = req.params;
    const users = await db.query("SELECT * FROM users WHERE id = $1", [id]);

    res.json(users.rows[0]);
  }
  async getAllUsers(req, res) {
    const users = await db.query("SELECT * FROM users");

    res.json(users.rows);
  }
  async updateUsers(req, res) {
    const { id } = req.params;
    const { login, password, role } = req.body;
    const student = await db.query(
      `UPDATE users SET
	  	login = $2, password = $3, role = $4
	   WHERE id = $1 RETURNING * `,
      [id, login, password, role]
    );

    res.json(student.rows[0]);
  }
  async deleteUsers(req, res) {
    const { id } = req.params;
    await db.query("DELETE FROM users WHERE id = $1", [id]);

    res.json("ok");
  }
}

module.exports = new UsersController();
