const { Router } = require('express');
const CEPController = require('./app/controllers/CEPController');
const OperadoraAnsController = require('./app/controllers/OperadoraAnsController');

const router = Router();

router.get('/operadoras-ans', OperadoraAnsController.index);
router.get('/operadoras-ans/:id', OperadoraAnsController.show);
router.post('/operadoras-ans', OperadoraAnsController.store);
router.put('/operadoras-ans/:id', OperadoraAnsController.update);
router.delete('/operadoras-ans/:id', OperadoraAnsController.delete);

router.get('/cep/:cep', CEPController.find);

module.exports = router;