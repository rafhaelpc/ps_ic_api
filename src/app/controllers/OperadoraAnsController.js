const OperadoraAnsRepository = require('../repositories/OperadoraAnsRepository');

class OperadoraAnsController {
  async index(request, response) {
    const collection = await OperadoraAnsRepository.findAll(request);
    return response.json(collection);
  }

  async show(request, response) {
    const { id } = request.params;
    const record = await OperadoraAnsRepository.findById(id);
    return response.json(record);
  }

  async store(request, response) {
    const {
      registroans, cnpj, razaosocial, nomefantasia, modalidade, cep, uf, cidade, bairro, logradouro, nr_logradouro, complemento,
      ddd, telefone, fax, email, representante, cargo_representante, data_registro
    } = request.body;

    if (!razaosocial) {
      return response.status(400).json({ error: 'O campo Razão social é obrigatório!' });
    }


    const record = await OperadoraAnsRepository.create({
      registroans, cnpj, razaosocial, nomefantasia, modalidade, cep, uf, cidade, bairro, logradouro, nr_logradouro, complemento,
      ddd, telefone, fax, email, representante, cargo_representante, data_registro
    });

    response.json(record);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      registroans, cnpj, razaosocial, nomefantasia, modalidade, cep, uf, cidade, bairro, logradouro, nr_logradouro, complemento,
      ddd, telefone, fax, email, representante, cargo_representante, data_registro
    } = request.body;

    const operadoraExists = await OperadoraAnsRepository.findById(id);

    if (!operadoraExists) {
      return response.status(404).json({ error: 'Operadora não encontrada!' });
    }

    if (!razaosocial) {
      return response.status(400).json({ error: 'O campo razão social é obrigatório!' });
    }

    const contact = await OperadoraAnsRepository.update(id, {
      registroans, cnpj, razaosocial, nomefantasia, modalidade, cep, uf, cidade, bairro, logradouro, nr_logradouro, complemento,
      ddd, telefone, fax, email, representante, cargo_representante, data_registro
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;
    await OperadoraAnsRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new OperadoraAnsController();