const db = require("../db");

class PlansController {
  async createPlans(req, res) {
    try {
      if (req.body.id) {
        const { id, year, number } = req.body;
        await db.query(
          `INSERT INTO plans (id, year, number) VALUES ($1, $2, $3) RETURNING *`,
          [id, year, number]
        );
        return;
      }

      const { year, number } = req.body;
      const newPlans = await db.query(
        `INSERT INTO plans (year, number) VALUES ($1, $2) RETURNING *`,
        [year, number]
      );

      res?.json(newPlans.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async getPlans(req, res) {
    try {
      const { id } = req.params;
      const plans = await db.query("SELECT * FROM plans WHERE id = $1", [id]);

      res?.json(plans.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async getAllPlans(req, res) {
    try {
      const plans = await db.query("SELECT * FROM plans");

      res?.json(plans.rows);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async updatePlans(req, res) {
    try {
      const { id, year, number } = req.body;
      await db.query("UPDATE plans SET year = $2, number = $3 WHERE id = $1", [
        id,
        year,
        number,
      ]);
      if (req?.params?.id) {
        res?.sendStatus(200);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async deletePlans(req, res) {
    try {
      if (req.body.id) {
        const { id } = req.body;
        await db.query("DELETE FROM plans WHERE id = $1", [id]);
        return;
      }

      const { id } = req.params;
      await db.query("DELETE FROM plans WHERE id = $1", [id]);
      res?.sendStatus(200);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async revertChanges(item) {
    switch (item.operation) {
      case "INSERT":
        await this.deletePlans({ body: { ...item } }, {});
        break;
      case "DELETE":
        await this.createPlans({ body: { ...item } }, {});
        break;
      case "UPDATE":
        await this.updatePlans({ body: { ...item } }, {});
        break;
      default:
        break;
    }
  }
  async undoPlans(req, res) {
    try {
      const { op_id, limit = 1 } = req.body;
      if (op_id) {
        const queryString = `select * from temp_plans where op_id = ${op_id}`;
        const data = await db.query(queryString);
        await this.revertChanges(data.rows[0], res);
        res?.json("reverted");
        return;
      }
      const queryString = `select * from temp_plans order by op_id desc limit ${limit};`;
      const data = await db.query(queryString);
      data.rows.forEach(async (item) => {
        await this.revertChanges(item);
      });
      res?.json("reverted");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
}

module.exports = new PlansController();
