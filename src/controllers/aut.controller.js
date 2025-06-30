const { Estudiante } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("ERROR: JWT_SECRET no está definido en las variables de entorno.");
  process.exit(1);
}

exports.login = async (req, res) => {
  const { legajo, contrasena } = req.body;

  try {
    const estudiante = await Estudiante.findOne({ where: { legajo } });
    if (!estudiante) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const isMatch = await estudiante.comparePassword(contrasena);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const payload = {
      id: estudiante.id,
      legajo: estudiante.legajo,
      email: estudiante.email,
      role: estudiante.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    const estudianteResponse = estudiante.toJSON();
    delete estudianteResponse.contrasena;

    res.status(200).json({
      message: 'Login exitoso',
      token: token,
      estudiante: estudianteResponse,
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor al iniciar sesión.' });
  }
};

exports.logout = async (req, res) => {
  res.status(200).json({ message: 'Sesión cerrada (token invalidado en cliente).' });
};

exports.obtenerEstudianteAutenticado = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.user.id, {
      attributes: { exclude: ['contrasena'] },
    });

    if (!estudiante) {
      return res.status(404).json({ message: 'Estudiante no encontrado.' });
    }

    res.status(200).json(estudiante);
  } catch (error) {
    console.error('Error al obtener estudiante autenticado:', error);
    res.status(500).json({ message: 'Error en el servidor al obtener datos del estudiante.' });
  }
};