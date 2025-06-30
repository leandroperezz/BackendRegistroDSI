const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pasantia = sequelize.define('Pasantia', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  requisitos: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  duracion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaInicio: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empresaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tareas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  responsabilidades: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  horarios: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lugarTrabajo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  disponibilidadHoraria: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'pasantias',
  timestamps: true,
  underscored: true,
});

module.exports = Pasantia;