const db = require("../db");

class PlansController {
  async createPlans(req, res) {
    const { year, number } = req.body;
    const newPlans = await db.query(
      `INSERT INTO plans (year, number) VALUES ($1, $2) RETURNING *`,
      [year, number]
    );

    res.json(newPlans.rows[0]);
  }
  async getPlans(req, res) {
    const { id } = req.params;
    const plans = await db.query("SELECT * FROM plans WHERE id = $1", [id]);

    res.json(plans.rows[0]);
  }
  async getAllPlans(req, res) {
    const plans = await db.query("SELECT * FROM plans");

    res.json(plans.rows);
  }
  async updatePlans(req, res) {
    const { id } = req.params;
    const { year, number } = req.body;
    const plan = await db.query(
      "UPDATE plans SET year = $2, number = $3 WHERE id = $1 RETURNING *",
      [id, year, number]
    );

    res.json(plan.rows[0]);
  }
  async deletePlans(req, res) {
    const { id } = req.params;
    const plans = await db.query("DELETE FROM plans WHERE id = $1", [id]);

    res.json("ok");
  }
}

module.exports = new PlansController();
