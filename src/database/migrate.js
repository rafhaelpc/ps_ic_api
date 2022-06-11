const createDatabase = require('./migrations/createDatabase');
const createTables = require('./migrations/createTables');

async function migrate(connection) {
  await createDatabase(connection);
  await createTables(connection);
}

module.exports = migrate;

