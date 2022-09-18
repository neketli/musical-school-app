const { execute } = require("@getvim/execute");
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

class dbDump {
  async backup() {
    const date = new Date();
    const fileName = `database-backup_${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}.tar`;
    await execute(
      `pg_dump -d postgresql://${username}:${password}@${host}:${port}/${database} -f ${fileName} -F t`
    );
    // eslint-disable-next-line no-console
    console.log(`Backup succefuly! Path: ./${fileName}`);
    return fileName;
  }

  async restore(fileName) {
    await execute(
      `pg_restore -d postgresql://${username}:${password}@${host}:${port}/${database} -c ${fileName}`
    );
    // eslint-disable-next-line no-console
    console.log("Restored successfully!");
    return "ok";
  }
}

module.exports = new dbDump();
