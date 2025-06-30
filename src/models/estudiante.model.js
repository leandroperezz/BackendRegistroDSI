const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Estudiante = sequelize.define('Estudiante', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  legajo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carrera: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  año: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  promedio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  experiencia: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  aptitudes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  cv_path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'estudiante',
    allowNull: false,
  },
}, {
  tableName: 'estudiantes',
  timestamps: true,
  underscored: true,
  hooks: {
    beforeCreate: async (estudiante) => {
      if (estudiante.contrasena) {
        const salt = await bcrypt.genSalt(10);
        estudiante.contrasena = await bcrypt.hash(estudiante.contrasena, salt);
      }
    },
    beforeUpdate: async (estudiante) => {
      if (estudiante.changed('contrasena')) {
        const salt = await bcrypt.genSalt(10);
        estudiante.contrasena = await bcrypt.hash(estudiante.contrasena, salt);
      }
    }
  }
});

Estudiante.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.contrasena);
};

module.exports = Estudiante;