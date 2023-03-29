const db = require("../db");

class HistoryConroller {
  async getHistory(req, res) {
    try {
      const { table } = req.body;
      const data = await db.query(`SELECT * FROM temp_${table}`);

      res?.json({
        columns: data.fields.map((item) => item.name),
        rows: data.rows,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
}

module.exports = new HistoryConroller();
