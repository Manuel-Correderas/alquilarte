// src/app.js
// src/app.js
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
////
import methodOverride from 'method-override';
// Rutas de vistas y autenticación
import authRoutes from './routes/authRoutes.js';
import indexViewRoutes from './routes/views/indexViewRoutes.js';

// Rutas API del panel admin
import adminDepartmentApiRoutes from './routes/api/adminDepartmentApiRoutes.js';
import adminUserApiRoutes from './routes/api/adminUserApiRoutes.js';
import propiedadesApiRoutes from './routes/api/propiedadesApiRoutes.js';
import propiedadViewRoutes from './routes/propiedadViewRoutes.js';
////
import turnoRoutes from './routes/api/turnoRoutes.js';

// 🛠️ Rutas del módulo de tareas
import tareaRoutes from './routes/api/tareaRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Conexión a la base de datos MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ⚠️ Agregamos las rutas de tareas
// Si querés que se acceda desde "/admin/tareas", cambialo más abajo
app.use('/tareas', tareaRoutes);

// CORS
const corsOptions = {
  origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
console.log(`[APP.JS] CORS configurado para orígenes: ${corsOptions.origin.join(', ')}`);

// Vistas con Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
console.log(`[APP.JS] Express usará vistas desde: ${app.get('views')}`);

// Archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'public')));
console.log(`[APP.JS] Sirviendo archivos estáticos desde: ${path.join(__dirname, '..', 'public')}`);

// === RUTAS PRINCIPALES ===
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminDepartmentApiRoutes);
app.use('/api/admin/users', adminUserApiRoutes);
app.use('/api/propiedades', propiedadesApiRoutes);
app.use('/propiedad', propiedadViewRoutes);
app.use('/', indexViewRoutes);
////
app.use(methodOverride('_method'));
////
app.use('/admin/turnos', turnoRoutes);
// === MANEJO DE ERRORES ===
app.use((req, res, next) => {
  console.log(`[APP.JS] 404: Ruta no encontrada: ${req.path}`);
  if (req.path.startsWith('/api/') || req.headers.accept?.includes('application/json')) {
    res.status(404).json({ message: `Ruta API no encontrada: ${req.path}` });
  } else {
    res.status(404).render('error', { title: 'Página no encontrada' });
  }
});

app.use((err, req, res, next) => {
  console.error(`[APP.JS] Error general: ${err.stack}`);
  const expectsJson = req.path.startsWith('/api/') || req.headers.accept?.includes('application/json');

  if (expectsJson) {
    res.status(err.statusCode || 500).json({
      message: err.message || 'Error interno del servidor.',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  } else {
    res.status(err.statusCode || 500).render('error', {
      title: 'Error del Servidor',
      message: err.message || 'Algo salió mal en nuestro lado.',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  }
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[APP.JS] Servidor corriendo en http://localhost:${PORT}`);
});
