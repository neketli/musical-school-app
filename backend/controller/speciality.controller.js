const db = require("../db");

class SpecialityController {
  async createSpeciality(req, res) {
    try {
      if (req.body.id) {
        const { id, title, instrument, id_departament } = req.body;
        await db.query(
          `INSERT INTO speciality (id, title, instrument, id_departament) VALUES ($1, $2, $3, $4)`,
          [id, title, instrument, id_departament]
        );
        return;
      }
      const { title, instrument, id_departament } = req.body;
      const newSpeciality = await db.query(
        `INSERT INTO speciality (title, instrument, id_departament) VALUES ($1, $2, $3) RETURNING *`,
        [title, instrument, id_departament]
      );

      res?.json(newSpeciality.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async getSpeciality(req, res) {
    try {
      const { id } = req.params;
      const speciality = await db.query(
        "SELECT * FROM speciality WHERE id = $1",
        [id]
      );

      res?.json(speciality.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async getAllSpeciality(req, res) {
    try {
      const speciality = await db.query(
        "SELECT speciality.id,speciality.title, speciality.instrument, departaments.id as id_departament, departaments.title as departament FROM speciality JOIN departaments ON speciality.id_departament=departaments.id"
      );

      const data = speciality.rows.map((item) => {
        return {
          id: item.id,
          title: item.title,
          instrument: item.instrument,
          id_departament_select: `${item.id_departament} ${item.departament}`,
        };
      });

      res?.json(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500).send(error);
    }
  }
  async updateSpeciality(req, res) {
    try {
      const { id, title, instrument, id_departament } = req.body;
      await db.query(
        "UPDATE speciality SET title = $2, instrument = $3, id_departament = $4 WHERE id = $1",
        [id, title, instrument, id_departament]
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
  async deleteSpeciality(req, res) {
    try {
      if (req.body.id) {
        const { id } = req.body;
        await db.query("DELETE FROM speciality WHERE id = $1", [id]);
        return;
      }
      const { id } = req.params;
      await db.query("DELETE FROM speciality WHERE id = $1", [id]);
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
        await this.deleteSpeciality({ body: { ...item } }, {});
        break;
      case "DELETE":
        await this.createSpeciality({ body: { ...item } }, {});
        break;
      case "UPDATE":
        await this.updateSpeciality({ body: { ...item } }, {});
        break;
      default:
        break;
    }
  }
  async undoSpeciality(req, res) {
    try {
      const { op_id, limit = 1 } = req.body;
      if (op_id) {
        const queryString = `select * from temp_speciality where op_id = ${op_id}`;
        const data = await db.query(queryString);
        await this.revertChanges(data.rows[0], res);
        res?.json("reverted");
        return;
      }
      const queryString = `select * from temp_speciality order by op_id desc limit ${limit};`;
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

module.exports = new SpecialityController();
