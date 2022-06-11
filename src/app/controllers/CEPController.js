const CEPRepository = require("../repositories/CEPRepository");

class CEPController {
  /**
   * 
   * @param {*} request 
   * @param {*} response 
   * @returns 
   */
  async find(request, response) {
    const { cep } = request.params;
    const record = await CEPRepository.findViaCEP(cep);

    if (record) {
      return response.json(record);
    }

    return response.sendStatus(204);
  }
}

module.exports = new CEPController();