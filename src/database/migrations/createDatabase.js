const { Client } = require('pg');

async function createDatabase({ host, port, user, password, database }) {
  const client = new Client({
    host, port, user, password
  });

  client.connect();

  const dbQuery = await client.query('SELECT FROM pg_database WHERE datname = $1', [database]);

  if (dbQuery.rows.length === 0) {
    await client.query(`CREATE DATABASE ${database}`);
  }

  client.end();
}

module.exports = createDatabase;