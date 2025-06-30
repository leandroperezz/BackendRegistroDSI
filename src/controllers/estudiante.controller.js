const { Estudiante } = require('../models');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

exports.getEstudiantes = async (req, res) => {
  try {
    //Implementar lógica de roles mas tarde(Ej: solo si req.user.role === 'admin_sau')
    if (req.user.role !== 'admin_sau') {
      return res.status(403).json({ message: 'Acceso denegado. Solo administradores de SAU.' });
    }
    const estudiante = await Estudiante.findAll({
      attributes: { exclude: ['contrasena'] },
    });
    res.status(200).json(estudiante);
  } catch (error) {
    console.error('Error al obtener todos los estudiantes:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

exports.crearEstudiante = async (req, res) => {
  try {
    const newEstudiante = await Estudiante.create(req.body);
    const estudianteResponse = newEstudiante.toJSON();
    delete estudianteResponse.contrasena;
    res.status(201).json(estudianteResponse);
  } catch (error) {
    console.error('Error al crear estudiante:', error);
    res.status(400).json({ message: error.message || 'Error al registrar estudiante.' });
  }
};

exports.getEstudiantePorId = async (req, res) => {
  try {
    if (req.user.role !== 'admin_sau' && req.user.id !== parseInt(req.params.id)) {
      return res.status(403).json({ message: 'Acceso denegado.' });
    }
    const estudiante = await Estudiante.findByPk(req.params.id, {
      attributes: { exclude: ['contrasena'] },
    });
    if (!estudiante) {
      return res.status(404).json({ message: 'Estudiante no encontrado.' });
    }
    res.status(200).json(estudiante);
  } catch (error) {
    console.error('Error al obtener estudiante por ID:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

exports.actualizarEstudiante = async (req, res) => {
  try {
    if (req.user.role !== 'admin_sau' && req.user.id !== parseInt(req.params.id)) {
      return res.status(403).json({ message: 'Acceso denegado.' });
    }

    const [updatedRows] = await Estudiante.update(req.body, {
      where: { id: req.params.id },
      individualHooks: true,
    });
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Estudiante no encontrado o sin cambios.' });
    }
    const updatedEstudiante = await Estudiante.findByPk(req.params.id, {
      attributes: { exclude: ['contrasena'] },
    });
    res.status(200).json(updatedEstudiante);
  } catch (error) {
    console.error('Error al actualizar estudiante:', error);
    res.status(400).json({ message: error.message || 'Error al actualizar estudiante.' });
  }
};

exports.borrarEstudiante = async (req, res) => {
  try {
    if (req.user.role !== 'admin_sau') {
      return res.status(403).json({ message: 'Acceso denegado. Solo administradores de SAU.' });
    }
    const deletedRows = await Estudiante.destroy({
      where: { id: req.params.id },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Estudiante no encontrado.' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar estudiante:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};