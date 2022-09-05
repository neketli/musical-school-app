const jwt = require("jsonwebtoken");
const db = require("../db");

class AuthController {
  async login(req, res) {
    const { login, password } = req.body;
    const usersRes = await db.query("SELECT * FROM users");
    const user = usersRes.rows.find(
      (user) => user.login === login && user.password === password
    );
    if (!user) {
      res.status(403).send("Username or password incorrect");
      // throw new Error()
      return;
    }
    const resUser = {
      login: user.login,
      user_group: user.user_group,
    };
    const token = jwt.sign(resUser, process.env.JWT_KEY);

    res.json({
      user: resUser,
      token,
    });
  }
}

module.exports = new AuthController();
