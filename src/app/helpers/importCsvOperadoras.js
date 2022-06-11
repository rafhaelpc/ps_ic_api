const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");
const connectionData = require("../../database/dbConfig");
const parseDate = require('date-fns/parse')

function exportCsvOperadoras(fileName) {
  let stream = fs.createReadStream(fileName);
  let csvData = [];

  const csvStream = fastcsv.parse({ headers: false, delimiter: ';', encoding: 'latin1' })
    .on("data", function(data) {
      csvData.push(data);
    })
    .on("end", function() {
      // remove the first line: header
      csvData.shift();
      csvData.shift();
      csvData.shift();

      // create a new connection to the database
      const pool = new Pool(connectionData);
      const query = `INSERT INTO operadoras_ans (registroans, cnpj, razaosocial, nomefantasia, modalidade, 
        logradouro, nr_logradouro, complemento, bairro, cidade, uf, cep, ddd, telefone, fax, email, 
        representante, cargo_representante, data_registro) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`;

      pool.connect((err, client, done) => {
        if (err) throw err;

        try {
          csvData.forEach(row => {
            const registroAns = row[0].trim();
            const cnpj = row[1].trim();
            const razaoSocial = row[2].trim();
            const nomeFantasia = row[3].trim();
            const modalidade = row[4].trim();
            const logradouro = row[5].trim();
            const nrLogradouro = row[6].trim();
            const complemento = row[7].trim();
            const bairro = row[8].trim();
            const cidade = row[9].trim();
            const uf = row[10].trim();
            const cep = row[11].trim();
            const ddd = row[12].trim();
            const telefone = row[13].trim();
            const fax = row[14].trim();
            const email = row[15].trim();
            const representante = row[16].trim();
            const cargo_representante = row[17].trim();
            const data_registro = parseDate(row[18].trim(), 'dd/M/yyyy', new Date());


            client.query(query, [
              registroAns,
              cnpj,
              razaoSocial,
              nomeFantasia,
              modalidade,
              logradouro,
              nrLogradouro,
              complemento,
              bairro,
              cidade,
              uf,
              cep,
              ddd,
              telefone,
              fax,
              email,
              representante,
              cargo_representante,
              data_registro
            ]);
          });
        } finally {
          done();
        }
      });
    });

  stream.pipe(csvStream);
}

module.exports = exportCsvOperadoras;