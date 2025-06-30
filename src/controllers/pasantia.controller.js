const { Pasantia, Empresa } = require('../models');
const { Op } = require('sequelize');


exports.getAllPasantias = async (req, res) => {
  try {
    const { estado, empresaId } = req.query;
    const whereClause = {};
    if (estado) whereClause.estado = estado;
    if (empresaId) whereClause.empresaId = empresaId;

    const pasantias = await Pasantia.findAll({
      where: whereClause,
      include: [{ model: Company, as: 'Empresa' }],
    });
    res.status(200).json(pasantias);
  } catch (error) {
    console.error('Error al obtener pasantías:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

exports.getPasantiaPorId = async (req, res) => {
  try {
    const pasantia = await Pasantia.findByPk(req.params.id, {
      include: [{ model: Company, as: 'company' }],
    });
    if (!pasantia) {
      return res.status(404).json({ message: 'Pasantía no encontrada.' });
    }
    res.status(200).json(pasantia);
  } catch (error) {
    console.error('Error al obtener pasantía por ID:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

exports.crearPasania = async (req, res) => {
  try {
    if (req.user.role !== 'admin_sau') {
      return res.status(403).json({ message: 'Acceso denegado. Solo administradores de SAU.' });
    }
    const newPasantia = await Pasantia.create(req.body);
    res.status(201).json(newPasantia);
  } catch (error) {
    console.error('Error al crear pasantía:', error);
    res.status(400).json({ message: error.message || 'Error al crear pasantía.' });
  }
};

exports.updatePasantia = async (req, res) => {
  try {
    if (req.user.role !== 'admin_sau') {
      return res.status(403).json({ message: 'Acceso denegado. Solo administradores de SAU.' });
    }
    const [updatedRows] = await Pasantia.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Pasantía no encontrada o sin cambios.' });
    }
    const updatedPasantia = await Pasantia.findByPk(req.params.id);
    res.status(200).json(updatedPasantia);
  } catch (error) {
    console.error('Error al actualizar pasantía:', error);
    res.status(400).json({ message: error.message || 'Error al actualizar pasantía.' });
  }
};

exports.borrarPasantia = async (req, res) => {
  try {
    if (req.user.role !== 'admin_sau') {
      return res.status(403).json({ message: 'Acceso denegado. Solo administradores de SAU.' });
    }
    const deletedRows = await Pasantia.destroy({
      where: { id: req.params.id },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Pasantía no encontrada.' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar pasantía:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};