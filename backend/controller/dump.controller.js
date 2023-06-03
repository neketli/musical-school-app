const { execute } = require("@getvim/execute");
const dbDump = require("../db_dump.js");

class dumpController {
  async getDump(req, res) {
    try {
      const fileName = await dbDump.backup();
      await res?.download(`./${fileName}`);
      setTimeout(() => {
        execute(`rm -rf ${fileName}`);
        // eslint-disable-next-line no-console
        console.log(`Removed backup succefuly! Path: ./${fileName}`);
      }, 30000);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(500);
    }
  }

  async setDump(req, res) {
    let file;
    try {
      file = req.files.files;
      file.mv(file.name);

      if (!file.name.match("[a-zA-Z0-9-_]*.tar")) {
        res?.status(415).send("Invalid file type!");
        return;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res?.status(503).send(error);
      return;
    }

    try {
      await dbDump.restore(file.name);
      res?.sendStatus(200);

      setTimeout(() => {
        execute(`rm -rf ${file.name}`);
        // eslint-disable-next-line no-console
        console.log(`Removed backup succefuly! Path: ./${file.name}`);
      }, 30000);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      execute(`rm -rf ${file.name}`);
      // eslint-disable-next-line no-console
      console.log(`Removed backup succefuly! Path: ./${file.name}`);
      res?.status(500);
      return;
    }
  }
}

module.exports = new dumpController();
