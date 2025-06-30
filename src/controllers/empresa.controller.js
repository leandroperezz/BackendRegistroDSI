const { Empresa } = require('../models');

exports.getAllEmpresas = async (req, res) => {
  try {
    const empresas = await Company.findAll();
    res.status(200).json(empresas);
  } catch (error) {
    console.error('Error al obtener empresas:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

exports.getEmpresaPorId = async (req, res) => {
  try {
    const empresa = await Empresa.findByPk(req.params.id);
    if (!empresa) {
      return res.status(404).json({ message: 'Empresa no encontrada.' });
    }
    res.status(200).json(empresa);
  } catch (error) {
    console.error('Error al obtener empresa por ID:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

exports.crearEmpresa = async (req, res) => {
  try {
    if (req.user.role !== 'admin_sau') {
      return res.status(403).json({ message: 'Acceso denegado. Solo administradores de SAU.' });
    }
    const newEmpresa = await Empresa.create(req.body);
    res.status(201).json(newEmpresa);
  } catch (error) {
    console.error('Error al crear empresa:', error);
    res.status(400).json({ message: error.message || 'Error al crear empresa.' });
  }
};

exports.updateEmpresa = async (req, res) => {
  try {
    if (req.user.role !== 'admin_sau') {
      return res.status(403).json({ message: 'Acceso denegado. Solo administradores de SAU.' });
    }
    const [updatedRows] = await Empresa.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Empresa no encontrada o sin cambios.' });
    }
    const updatedEmpresa = await Empresa.findByPk(req.params.id);
    res.status(200).json(updatedEmpresa);
  } catch (error) {
    console.error('Error al actualizar empresa:', error);
    res.status(400).json({ message: error.message || 'Error al actualizar empresa.' });
  }
};

exports.borrarEmpresa = async (req, res) => {
  try {
    if (req.user.role !== 'admin_sau') {
      return res.status(403).json({ message: 'Acceso denegado. Solo administradores de SAU.' });
    }
    const deletedRows = await Empresa.destroy({
      where: { id: req.params.id },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Empresa no encontrada.' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar empresa:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};