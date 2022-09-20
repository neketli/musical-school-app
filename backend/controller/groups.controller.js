const db = require("../db");

class GroupsController {
  async createGroups(req, res) {
    try {
      if (req.body.id) {
        const { id, form, year, id_speciality } = req.body;
        await db.query(
          `INSERT INTO groups (id, form, year, id_speciality) VALUES ($1, $2, $3, $4)`,
          [id, form, year, id_speciality]
        );
        return;
      }

      const { form, year, id_speciality } = req.body;
      const newGroups = await db.query(
        `INSERT INTO groups (form, year, id_speciality) VALUES ($1, $2, $3) RETURNING *`,
        [form, year, id_speciality]
      );

      res?.json(newGroups.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async getGroups(req, res) {
    try {
      const { id } = req.params;
      const groups = await db.query("SELECT * FROM groups WHERE id = $1", [id]);

      res?.json(groups.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async getAllGroups(req, res) {
    try {
      const groups = await db.query("SELECT * FROM groups");

      res?.json(groups.rows);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async updateGroups(req, res) {
    try {
      const { id, form, year, id_speciality } = req.body;
      await db.query(
        "UPDATE groups SET form = $2, year = $3, id_speciality = $4 WHERE id = $1",
        [id, form, year, id_speciality]
      );
      if (req?.params?.id) {
        res?.sendStatus(200);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async deleteGroups(req, res) {
    try {
      if (req.body.id) {
        const { id } = req.body;
        await db.query("DELETE FROM groups WHERE id = $1", [id]);
        return;
      }

      const { id } = req.params;
      await db.query("DELETE FROM groups WHERE id = $1", [id]);

      res?.json("ok");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async revertChanges(item) {
    switch (item.operation) {
      case "INSERT":
        await this.deleteGroups({ body: { ...item } }, {});
        break;
      case "DELETE":
        await this.createGroups({ body: { ...item } }, {});
        break;
      case "UPDATE":
        await this.updateGroups({ body: { ...item } }, {});
        break;
      default:
        break;
    }
  }
  async undoGroups(req, res) {
    try {
      const { op_id, limit = 1 } = req.body;
      if (op_id) {
        const queryString = `select * from temp_groups where op_id = ${op_id}`;
        const data = await db.query(queryString);
        await this.revertChanges(data.rows[0], res);
        res?.json("reverted");
        return;
      }
      const queryString = `select * from temp_groups order by op_id desc limit ${limit};`;
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

module.exports = new GroupsController();
