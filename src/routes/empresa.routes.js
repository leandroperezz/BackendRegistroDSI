const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresa.controller');
const autenticarToken = require('../middleware/aut.middelware');

//Solo rutas para administrador por ahira
router.get('/admin/empresas', autenticarToken, empresaController.getAllEmpresas);
router.get('/admin/empresas/:id', autenticarToken, empresaController.getEmpresaPorId);
router.post('/admin/empresas', autenticarToken, empresaController.crearEmpresa); //Despues
router.put('/admin/empresas/:id', autenticarToken, empresaController.updateEmpresa); //Despues
router.delete('/admin/empresas/:id', autenticarToken, empresaController.borrarEmpresa);

module.exports = router;