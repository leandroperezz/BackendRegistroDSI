const express = require('express');
const router = express.Router();
const postulacionPasController = require('../controllers/postulacionPas.controller');
const autenticarToken = require('../middleware/aut.middelware');
const { validarPostulacionPas, handleValidationErrors } = require('../middleware/validacion/postulacion.validacion');



router.post('/postulaciones/pasantia', autenticarToken, validarPostulacionPas, handleValidationErrors, postulacionPasController.crearPostulacionPas);

router.get('/admin/postulaciones/pasantias', autenticarToken, postulacionPasController.getAllPostulacionPas);
router.get('/admin/postulaciones/pasantias/:id', autenticarToken, postulacionPasController.getPostulacionPasPorId);
router.put('/admin/postulaciones/pasantias/:id', autenticarToken, postulacionPasController.updatePostulacionPas);

//Lista postulaciones de una pasantía específica
router.get('/admin/pasantias/:id/postulaciones', autenticarToken, postulacionPasController.getAllPostulacionPas);

module.exports = router;