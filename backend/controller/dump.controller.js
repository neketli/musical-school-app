const { execute } = require("@getvim/execute");
const dbDump = require("../db_dump.js");

class dumpController {
  async getDump(req, res) {
    try {
      const fileName = await dbDump.backup();
      await res.download(`./${fileName}`);
      setTimeout(() => {
        execute(`rm -rf ${fileName}`);
        // eslint-disable-next-line no-console
        console.log(`Removed backup succefuly! Path: ./${fileName}`);
      }, 30000);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }

  async setDump(req, res) {
    try {
      const file = req.files.file;
      file.mv(file.name);
      await dbDump.restore(file.name);

      setTimeout(() => {
        execute(`rm -rf ${file.name}`);
        // eslint-disable-next-line no-console
        console.log(`Removed backup succefuly! Path: ./${file.name}`);
      }, 30000);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = new dumpController();
