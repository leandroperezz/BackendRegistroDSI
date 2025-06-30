const express = require('express');
const router = express.Router();
const PostulacionBecaController = require('../controllers/postulacionBeca.controller');
const autenticarToken = require('../middleware/aut.middelware');
const { validarPostulacionBeca, handleValidationErrors } = require('../middleware/validacion/postulacion.validacion');


router.post('/postulaciones/beca', autenticarToken, validarPostulacionBeca, handleValidationErrors, PostulacionBecaController.createScholarshipApplication);


router.get('/admin/postulaciones/becas', autenticarToken, PostulacionBecaController.getAllScholarshipApplications);
router.get('/admin/postulaciones/becas/:id', autenticarToken, PostulacionBecaController.getScholarshipApplicationById);
router.put('/admin/postulaciones/becas/:id', autenticarToken, PostulacionBecaController.updateScholarshipApplication);

router.get('/admin/becas/:id/postulaciones', autenticarToken, PostulacionBecaController.getAllScholarshipApplications);

module.exports = router;