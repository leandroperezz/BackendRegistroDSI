const sequelize = require('../config/database');
const Estudiante = require('./estudiante.model');
const Pasantia = require('./pasantia.model');
const Beca = require('./beca.model');
const Empresa = require('./empresa.model');
const PostulacionPas = require('./postulacionPas.model');
const PostulacionBeca = require('./postulacionBeca.model');


Estudiante.hasMany(PostulacionPas, { foreignKey: 'estudianteId', as: 'postulacionPas' });
PostulacionPas.belongsTo(Estudiante, { foreignKey: 'estudianteId', as: 'estudiante' });

Estudiante.hasMany(PostulacionBeca, { foreignKey: 'estudianteId', as: 'postulacionBeca' });
PostulacionBeca.belongsTo(Estudiante, { foreignKey: 'estudianteId', as: 'estudiante' });



Pasantia.hasMany(PostulacionPas, { foreignKey: 'pasantiaId', as: 'postulaciones' });
PostulacionPas.belongsTo(Pasantia, { foreignKey: 'pasantiaId', as: 'pasantia' });



Beca.hasMany(PostulacionBeca, { foreignKey: 'becaId', as: 'postulaciones' });
PostulacionBeca.belongsTo(Beca, { foreignKey: 'becaId', as: 'beca' });



Empresa.hasMany(Pasantia, { foreignKey: 'empresaId', as: 'ofertaPasantia' });
Pasantia.belongsTo(Empresa, { foreignKey: 'empresaId', as: 'empresa' });


const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection OK!');
    await sequelize.sync({ alter: true });
    console.log('Base de datos sincronizada correctamente.');
  }
  catch (error) {
    console.error('Error al conectar o sincronizar la base de datos:', error.message);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  Estudiante,
  Pasantia,
  Beca,
  Empresa,
  PostulacionPas,
  PostulacionBeca,
  syncDatabase,
};