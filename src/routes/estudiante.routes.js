const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudiante.controller');
const autenticarToken = require('../middleware/aut.middelware');
const { validacionRegistroEst, validateUserUpdate, handleValidationErrors } = require('../middleware/validacion/estudiante.validacion');


router.get('/admin/estudiantes', autenticarToken, estudianteController.getEstudiantes);
router.get('/admin/estudiantes/:id', autenticarToken, estudianteController.getEstudiantePorId);
router.put('/admin/estudiantes/:id', autenticarToken, validateUserUpdate, handleValidationErrors, estudianteController.actualizarEstudiante);


router.post('/admin/estudiantes', validacionRegistroEst, handleValidationErrors, estudianteController.crearEstudiante); // Registro admin
// router.post('/estudiantes', validacionRegistroEst, handleValidationErrors, estudianteController.crearEstudiante); // Registro público para estudiantes

router.delete('/admin/estudiantes/:id', autenticarToken, estudianteController.borrarEstudiante);

module.exports = router;