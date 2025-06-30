const { Beca } = require('../models');
const { Op } = require('sequelize');


exports.getAllBecas = async (req, res) => {
  try {
    const { duracion } = req.query;
    const whereClause = {};
    if (duracion) whereClause.duracion = duracion;

    const becas = await Beca.findAll({
      where: whereClause,
    });
    res.status(200).json(becas);
  } catch (error) {
    console.error('Error al obtener becas:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

exports.getBecaPorId = async (req, res) => {
  try {
    const beca = await Beca.findByPk(req.params.id);
    if (!beca) {
      return res.status(404).json({ message: 'Beca no encontrada.' });
    }
    res.status(200).json(beca);
  } catch (error) {
    console.error('Error al obtener beca por ID:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

exports.crearBeca = async (req, res) => {
  try {
    if (req.user.role !== 'admin_sau') {
      return res.status(403).json({ message: 'Acceso denegado. Solo administradores de SAU.' });
    }
    const nuevaBeca = await Beca.create(req.body);
    res.status(201).json(nuevaBeca);
  } catch (error) {
    console.error('Error al crear beca:', error);
    res.status(400).json({ message: error.message || 'Error al crear beca.' });
  }
};

exports.updateBeca = async (req, res) => {
  try {
    if (req.user.role !== 'admin_sau') {
      return res.status(403).json({ message: 'Acceso denegado. Solo administradores de SAU.' });
    }
    const [updatedRows] = await Beca.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Beca no encontrada o sin cambios.' });
    }
    const updatedBeca = await Beca.findByPk(req.params.id);
    res.status(200).json(updatedBeca);
  } catch (error) {
    console.error('Error al actualizar beca:', error);
    res.status(400).json({ message: error.message || 'Error al actualizar beca.' });
  }
};

exports.borrarBeca = async (req, res) => {
  try {
    if (req.user.role !== 'admin_sau') {
      return res.status(403).json({ message: 'Acceso denegado. Solo administradores de SAU.' });
    }
    const deletedRows = await Beca.destroy({
      where: { id: req.params.id },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Beca no encontrada.' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar beca:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};