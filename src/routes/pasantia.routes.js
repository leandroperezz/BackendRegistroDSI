const express = require('express');
const router = express.Router();
const pasantiasController = require('../controllers/pasantia.controller');
const autenticarToken = require('../middleware/aut.middelware');
const { validarOfertaPasantia, handleValidationErrors } = require('../middleware/validacion/pasantia.validacion');


router.get('/pasantias', pasantiasController.getAllPasantias);
router.get('/pasantias/:id', pasantiasController.getPasantiaPorId);

router.post('/admin/pasantias', autenticarToken, validarOfertaPasantia, handleValidationErrors, pasantiasController.crearPasantia);
router.put('/admin/pasantias/:id', autenticarToken, validarOfertaPasantia, handleValidationErrors, pasantiasController.updatePasantia);
router.delete('/admin/pasantias/:id', autenticarToken, pasantiasController.borrarPasantia);

module.exports = router;