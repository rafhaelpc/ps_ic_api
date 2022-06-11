const { Client } = require('pg');
const importCsvOperadoras = require('../../app/helpers/importCsvOperadoras');

async function createTables(connection) {
  const client = new Client(connection);

  client.connect();

  await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await client.query(`CREATE TABLE IF NOT EXISTS operadoras_ans (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    registroans VARCHAR NOT NULL,
    cnpj VARCHAR NOT NULL,
    razaosocial VARCHAR NOT NULL,
    nomefantasia VARCHAR,
    modalidade VARCHAR NOT NULL,
    logradouro VARCHAR NOT NULL,
    nr_logradouro VARCHAR NOT NULL,
    complemento VARCHAR,
    bairro VARCHAR NOT NULL,
    cidade VARCHAR NOT NULL,
    UF VARCHAR(2) NOT NULL,
    CEP VARCHAR(9) NOT NULL,
    DDD VARCHAR(2),
    telefone VARCHAR(20),
    fax VARCHAR(20),
    email VARCHAR,
    representante VARCHAR NOT NULL,
    cargo_representante VARCHAR NOT NULL,
    data_registro DATE
  );`)

  const result = await client.query('SELECT 1 from operadoras_ans');

  if (result.rows.length === 0) {
    importCsvOperadoras('src/assets/relatorio-cadop.csv')
  }




  client.end();
}

module.exports = createTables;