const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PostulacionBeca = sequelize.define('PostulacionBeca', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  estudianteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  becaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_postulacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'Pendiente',
    allowNull: false,
  },
}, {
  tableName: 'Postulacion_becas',
  timestamps: true,
  underscored: true,
});

module.exports = PostulacionBeca;