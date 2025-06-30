const { PostulacionBeca, Estudiante, Beca } = require('../models');

exports.getAllPostulacionBeca = async (req, res) => {
  try {
    if (req.user.role !== 'admin_sau') {
      return res.status(403).json({ message: 'Acceso denegado. Solo administradores de SAU.' });
    }
    const postulaciones = await PostulacionBeca.findAll({
      include: [
        { model: Estudiante, as: 'estudiante', attributes: { exclude: ['contrasena'] } },
        { model: Beca, as: 'beca' },
      ],
    });
    res.status(200).json(postulaciones);
  } catch (error) {
    console.error('Error al obtener postulaciones de becas:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

exports.getPostulacionBecaPorId = async (req, res) => {
  try {
    const postulacion = await PostulacionBeca.findByPk(req.params.id, {
      include: [
        { model: Estudiante, as: 'estudiante', attributes: { exclude: ['contrasena'] } },
        { model: Beca, as: 'beca' },
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
    console.error('Error al obtener postulación de beca por ID:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

exports.crearPostulacionBeca = async (req, res) => {
  try {
    const newPostulacion = await PostulacionBeca.create(req.body);
    res.status(201).json(newPostulacion);
  } catch (error) {
    console.error('Error al crear postulación de beca:', error);
    res.status(400).json({ message: error.message || 'Error al registrar postulación.' });
  }
};

exports.updatePostulacionBeca = async (req, res) => {
  try {
    if (req.user.role !== 'admin_sau') {
      return res.status(403).json({ message: 'Acceso denegado. Solo administradores de SAU.' });
    }
    const [updatedRows] = await PostulacionBeca.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Postulación no encontrada o sin cambios.' });
    }
    const updatedPostulacion = await PostulacionBeca.findByPk(req.params.id);
    res.status(200).json(updatedPostulacion);
  } catch (error) {
    console.error('Error al actualizar postulación de beca:', error);
    res.status(400).json({ message: error.message || 'Error al actualizar postulación.' });
  }
};