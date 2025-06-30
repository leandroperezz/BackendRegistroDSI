const express = require('express');
const router = express.Router();
const becaController = require('../controllers/beca.controller');
const autenticarToken = require('../middleware/aut.middelware');
const { validarOfertaBeca, handleValidationErrors } = require('../middleware/validacion/beca.validacion');


router.get('/becas', becaController.getAllBecas);
router.get('/becas/:id', becaController.getBecaPorId);

router.post('/admin/becas', autenticarToken, validarOfertaBeca, handleValidationErrors, becaController.crearBeca);
router.put('/admin/becas/:id', autenticarToken, validarOfertaBeca, handleValidationErrors, becaController.updateBeca);
router.delete('/admin/becas/:id', autenticarToken, becaController.borrarBeca);

module.exports = router;