const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PostulacionPas = sequelize.define('PostulacionPas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  estudianteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pasantiaId: {
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
  cv_uploaded_path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'postulaciones_pasantias',
  timestamps: true,
  underscored: true,
});

module.exports = PostulacionPas;