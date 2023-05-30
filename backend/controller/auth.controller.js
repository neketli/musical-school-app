const jwt = require("jsonwebtoken");
const db = require("../db");

class AuthController {
  async login(req, res) {
    try {
      const { login, password } = req.body;
      const usersRes = await db.query("SELECT * FROM users");
      const user = usersRes.rows.find(
        (user) => user.login === login && user.password === password
      );
      if (!user) {
        res?.status(403).send("Username or password incorrect");
        // throw new Error()
        return;
      }
      const resUser = {
        login: user.login,
        role: user.role,
        rid: user.rid,
      };
      const token = jwt.sign(resUser, process.env.JWT_KEY);

      res?.status(200).json({
        user: resUser,
        token,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
}

module.exports = new AuthController();
