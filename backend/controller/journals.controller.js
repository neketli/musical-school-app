const db = require("../db");

class JournalsController {
  async createJournals(req, res) {
    try {
      if (req.body.id) {
        const { id, type, date, grade, id_subject, id_student } = req.body;
        await db.query(
          `INSERT INTO journals (id, type,
        date,
        grade,
        id_subject,
        id_student) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
          [id, type, date, grade, id_subject, id_student]
        );
        return;
      }

      const { type, date, grade, id_subject, id_student } = req.body;
      const newStudent = await db.query(
        `INSERT INTO journals (type,
        date,
        grade,
        id_subject,
        id_student) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [type, date, grade, id_subject, id_student]
      );

      res.json(newStudent.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getJournals(req, res) {
    try {
      const { id } = req.params;
      const journals = await db.query("SELECT * FROM journals WHERE id = $1", [
        id,
      ]);

      res.json(journals.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async getAllJournals(req, res) {
    try {
      if (!Object.values(req.query).length) {
        const journals = await db.query("SELECT * FROM journals");
        res.json(
          journals.rows.map((item) => {
            return {
              ...item,
              date: new Date(item.date).toLocaleDateString(),
            };
          })
        );
        return;
      }
      const { id_student } = req.query;
      if (id_student) {
        const journals = await db.query(
          "SELECT * FROM journals JOIN subjects ON journals.id_subject=subjects.id WHERE id_student=$1",
          [id_student]
        );

        res.json(
          journals.rows.map((item) => {
            delete item.id_student;
            delete item.id_subject;
            return {
              ...item,
              date: new Date(item.date).toLocaleDateString(),
            };
          })
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async updateJournals(req, res) {
    try {
      if (req.body.id) {
        const { id, type, date, grade, id_subject, id_student } = req.body;
        await db.query(
          `UPDATE journals SET
	  	type = $2,
		date = $3,
		grade = $4,
		id_subject = $5,
		id_student = $6
	   WHERE id = $1 RETURNING * `,
          [id, type, date, grade, id_subject, id_student]
        );
        return;
      }

      const { id } = req.params;
      const { type, date, grade, id_subject, id_student } = req.body;
      const departament = await db.query(
        `UPDATE journals SET
	  	type = $2,
		date = $3,
		grade = $4,
		id_subject = $5,
		id_student = $6
	   WHERE id = $1 RETURNING * `,
        [id, type, date, grade, id_subject, id_student]
      );

      res.json(departament.rows[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async deleteJournals(req, res) {
    try {
      if (req.body.id) {
        const { id } = req.body;
        await db.query("DELETE FROM journals WHERE id = $1", [id]);
        return;
      }

      const { id } = req.params;
      await db.query("DELETE FROM journals WHERE id = $1", [id]);

      res.json("ok");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
  async revertChanges(item, res) {
    switch (item.operation) {
      case "INSERT":
        await this.deleteJournals({ body: { ...item } }, res);
        break;
      case "DELETE":
        await this.createJournals({ body: { ...item } }, res);
        break;
      case "UPDATE":
        await this.updateJournals({ body: { ...item } }, res);
        break;
      default:
        break;
    }
  }
  async undoJournals(req, res) {
    try {
      const { op_id, limit = 1 } = req.body;
      if (op_id) {
        const queryString = `select * from temp_journal where op_id = ${op_id}`;
        const data = await db.query(queryString);
        await this.revertChanges(data.rows[0], res);
        res.json("reverted");
        return;
      }
      const queryString = `select * from temp_journal order by op_id desc limit ${limit};`;
      const data = await db.query(queryString);
      data.rows.forEach(async (item) => {
        await this.revertChanges(item, res);
      });
      res.json("reverted");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = new JournalsController();
