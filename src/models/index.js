const sequelize = require('../config/database');
const Estudiante = require('./estudiante.model');
const Pasantia = require('./pasantia.model');
const Beca = require('./beca.model');
const Empresa = require('./empresa.model');
const PostulacionPas = require('./postulacionPas.model');
const PostulacionBeca = require('./postulacionBeca.model');
const bcrypt = require('bcryptjs');

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

    const adminLegajo = 'admin_sau';
    const adminPassword = '123';
    const adminEmail = 'admin.sau@universidad.com';

    const existingAdmin = await Estudiante.findOne({ where: { legajo: adminLegajo } });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, await bcrypt.genSalt(10));
      await Estudiante.create({
        nombre: 'Admin',
        apellido: 'SAU',
        dni: '00000000',
        legajo: adminLegajo,
        email: adminEmail,
        contrasena: hashedPassword,
        telefono: '5491100000000',
        carrera: 'Administracion',
        año: 0,
        promedio: 10.0,
        role: 'admin_sau'
      });
      console.log('Usuario administrador inicial (admin_sau) creado.');
    } else {
      console.log('Usuario administrador inicial (admin_sau) ya existe.');
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