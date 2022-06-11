const { Client } = require('pg');
const migrate = require('./migrate');
const connectionData = require('./dbConfig');

(async () => {
  await migrate(connectionData);

  const client = new Client(connectionData);

  client.connect();

  exports.query = async (query, values) => {
    const { rows } = await client.query(query, values);
    return rows;
  };
})();


