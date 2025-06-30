const express = require('express');
const router = express.Router();
const autorizacionController = require('../controllers/aut.controller');
const autenticarToken = require('../middleware/aut.middelware');
const { validarLogin, handleValidationErrors } = require('../middleware/validacion/estudiante.validacion');


router.post('/login', validarLogin, handleValidationErrors, autorizacionController.login);
router.post('/logout', autorizacionController.logout);
router.get('/estudiante', autenticarToken, autorizacionController.obtenerEstudianteAutenticado);

module.exports = router;