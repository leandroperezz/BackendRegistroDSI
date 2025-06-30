const express = require('express');
const router = express.Router();
const PostulacionBecaController = require('../controllers/postulacionBeca.controller');
const autenticarToken = require('../middleware/aut.middelware');
const { validarPostulacionBeca, handleValidationErrors } = require('../middleware/validacion/postulacion.validacion');


router.post('/postulaciones/beca', autenticarToken, validarPostulacionBeca, handleValidationErrors, PostulacionBecaController.crearPostulacionBeca);


router.get('/admin/postulaciones/becas', autenticarToken, PostulacionBecaController.getAllPostulacionBeca);
router.get('/admin/postulaciones/becas/:id', autenticarToken, PostulacionBecaController.getPostulacionBecaPorId);
router.put('/admin/postulaciones/becas/:id', autenticarToken, PostulacionBecaController.updatePostulacionBeca);

router.get('/admin/becas/:id/postulaciones', autenticarToken, PostulacionBecaController.getAllPostulacionBeca);

module.exports = router;