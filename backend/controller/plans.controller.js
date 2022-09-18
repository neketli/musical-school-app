const db = require("../db");

class PlansController {
  async createPlans(req, res) {
    try {
      const { year, number } = req.body;
      const newPlans = await db.query(
        `INSERT INTO plans (year, number) VALUES ($1, $2) RETURNING *`,
        [year, number]
      );

      res.json(newPlans.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getPlans(req, res) {
    try {
      const { id } = req.params;
      const plans = await db.query("SELECT * FROM plans WHERE id = $1", [id]);

      res.json(plans.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getAllPlans(req, res) {
    try {
      const plans = await db.query("SELECT * FROM plans");

      res.json(plans.rows);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async updatePlans(req, res) {
    try {
      const { id } = req.params;
      const { year, number } = req.body;
      const plan = await db.query(
        "UPDATE plans SET year = $2, number = $3 WHERE id = $1 RETURNING *",
        [id, year, number]
      );

      res.json(plan.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async deletePlans(req, res) {
    try {
      const { id } = req.params;
      await db.query("DELETE FROM plans WHERE id = $1", [id]);

      res.json("ok");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = new PlansController();
