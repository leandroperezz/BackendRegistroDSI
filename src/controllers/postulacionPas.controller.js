const { PostulacionPas, Estudiante, Pasantia } = require('../models');
// const multer = require('multer'); // Para subir CV

exports.getAllPostulacionPas = async (req, res) => {
  try {
    if (req.user.role !== 'admin_sau') {
      return res.status(403).json({ message: 'Acceso denegado. Solo administradores de SAU.' });
    }
    const postulaciones = await PostulacionPas.findAll({
      include: [
        { model: Estudiante, as: 'estudiante', attributes: { exclude: ['contrasena'] } },
        { model: Pasantia, as: 'pasantia' },
      ],
    });
    res.status(200).json(postulaciones);
  } catch (error) {
    console.error('Error al obtener postulaciones de pasantías:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

exports.getPostulacionPasPorId = async (req, res) => {
  try {
    const postulacion = await PostulacionPas.findByPk(req.params.id, {
      include: [
        { model: Estudiante, as: 'estudiante', attributes: { exclude: ['contrasena'] } },
        { model: Pasantia, as: 'pasantia' },
      ],
    });

    if (!postulacion) {
      return res.status(404).json({ message: 'Postulación no encontrada.' });
    }
    if (req.user.role !== 'admin_sau' && req.user.id !== postulacion.estudianteId) {
      return res.status(403).json({ message: 'Acceso denegado.' });
    }

    res.status(200).json(postulacion);
  } catch (error) {
    console.error('Error al obtener postulación de pasantía por ID:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

exports.crearPostulacionPas = async (req, res) => {
  try {
    const newPostulacion = await PostulacionPas.create(req.body);
    res.status(201).json(newPostulacion);
  } catch (error) {
    console.error('Error al crear postulación de pasantía:', error);
    res.status(400).json({ message: error.message || 'Error al registrar postulación.' });
  }
};

exports.updatePostulacionPas = async (req, res) => {
  try {
    if (req.user.role !== 'admin_sau') {
      return res.status(403).json({ message: 'Acceso denegado. Solo administradores de SAU.' });
    }
    const [updatedRows] = await PostulacionPas.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Postulación no encontrada o sin cambios.' });
    }
    const updatedPostulacion = await PostulacionPas.findByPk(req.params.id);
    res.status(200).json(updatedPostulacion);
  } catch (error) {
    console.error('Error al actualizar postulación de pasantía:', error);
    res.status(400).json({ message: error.message || 'Error al actualizar postulación.' });
  }
};