const db = require('../../database');
const BaseRepository = require('./BaseRepository');

class OperadoraAnsRepository extends BaseRepository {
  table = 'operadoras_ans';

  async findAll(request) {
    if (request.query.cep) {
      request.query.cep = request.query.cep.replace('-', '');
    }

    return super.findAll(request);
  }

  /**
   * 
   * @param {*} id 
   * @returns 
   */
  async findById(id) {
    const [row] = await db.query(`
      select * from operadoras_ans where id = $1 `, [id]);
    return row;
  }

  /**
   * 
   * @param {*} param0 
   * @returns 
   */
  async create({
    registroans, cnpj, razaosocial, nomefantasia, modalidade, cep, uf, cidade, bairro, logradouro, nr_logradouro, complemento,
    ddd, telefone, fax, email, representante, cargo_representante, data_registro,
  }) {
    const [row] = await db.query(`
      insert into operadoras_ans (registroans, cnpj, razaosocial, nomefantasia, modalidade, cep, uf, cidade, bairro, logradouro, nr_logradouro, complemento,
        ddd, telefone, fax, email, representante, cargo_representante, data_registro)
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
      returning *
    `, [registroans, cnpj, razaosocial, nomefantasia, modalidade, cep, uf, cidade, bairro, logradouro, nr_logradouro, complemento,
      ddd, telefone, fax, email, representante, cargo_representante, data_registro]);

    return row;
  }

  /**
   * 
   * @param {*} id 
   * @param {*} param1 
   * @returns 
   */
  async update(id, {
    registroans, cnpj, razaosocial, nomefantasia, modalidade, cep, uf, cidade, bairro, logradouro, nr_logradouro, complemento,
    ddd, telefone, fax, email, representante, cargo_representante, data_registro,
  }) {

    const [row] = await db.query(`
      update operadoras_ans
      set registroans = $1, 
      cnpj = $2, 
      razaosocial = $3,
      nomefantasia = $4,
      modalidade = $5,
      cep = $6,
      uf = $7,
      cidade = $8,
      bairro = $9,
      logradouro = $10,
      nr_logradouro = $11,
      complemento = $12,
      ddd = $13,
      telefone = $14,
      fax = $15,
      email = $16,
      representante = $17,
      cargo_representante = $18,
      data_registro = $19
      where id = $20
      returning *
    `, [registroans, cnpj, razaosocial, nomefantasia, modalidade, cep, uf, cidade, bairro, logradouro, nr_logradouro, complemento,
      ddd, telefone, fax, email, representante, cargo_representante, data_registro, id]);

    return row;
  }

  async delete(id) {
    await db.query('delete from operadoras_ans where id = $1', [id]);
  }
}

module.exports = new OperadoraAnsRepository();