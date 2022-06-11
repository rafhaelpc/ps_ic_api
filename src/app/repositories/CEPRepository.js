const axios = require('axios');

class CEPRepository {
  async findViaCEP(cep) {
    try {
      const response = await axios.get(`http://viacep.com.br/ws/${cep}/json/`);
      return response.data;

    } catch {
      return null;
    }
  }
}

module.exports = new CEPRepository();