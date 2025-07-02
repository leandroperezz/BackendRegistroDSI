const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Beca = sequelize.define('Beca', {
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
  cupos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  beneficios: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  monto: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  descripcion_breve: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'becas',
  timestamps: true,
  underscored: true,
});

module.exports = Beca;