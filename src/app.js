const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { syncDatabase } = require('./models');
const path = require('path');

const autRoutes = require('./routes/aut.routes');
const estudianteRoutes = require('./routes/estudiante.routes');
const pasantiaRoutes = require('./routes/pasantia.routes');
const becaRoutes = require('./routes/beca.routes');
const empresaRoutes = require('./routes/empresa.routes');
const postulacionPasRoutes = require('./routes/postulacionPas.routes');
const postulacionBecaRoutes = require('./routes/postulacionBeca.route');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'public')));



app.use('/api/autenticacion', autRoutes);
app.use('/api', estudianteRoutes);
app.use('/api', pasantiaRoutes);
app.use('/api', becaRoutes);
app.use('/api', empresaRoutes);
app.use('/api', postulacionPasRoutes);
app.use('/api', postulacionBecaRoutes);


app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

syncDatabase().then(() => {
  app.listen(PORT, (error) => {
    if (!error) {
      console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
      console.log(`Base de datos SQLite en: ${process.env.DB_STORAGE}`);
      console.log(`Archivos estáticos servidos desde: ${path.join(__dirname, '..', 'public')}`);
    } else {
      console.log("Error al iniciar el servidor:", error);
    }
  });
}).catch(err => {
  console.error('La aplicación no pudo iniciar debido a un error de base de datos:', err);
});