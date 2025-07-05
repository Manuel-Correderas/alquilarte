// src/routes/propiedadRoutes.js
import express from 'express';
import {
  crearPropiedad,
  obtenerMisPropiedades,
  obtenerPropiedadPorId,
  actualizarPropiedad,
  eliminarPropiedad,
  mostrarMapa,
  getPropiedadesActivas
} from '../controllers/propiedadController.js';

import { protect, authorize } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js'; // para manejo de imágenes

const router = express.Router();

// 🔐 Rutas protegidas con middleware
router.use(protect);

// 📍 Mapa de propiedades activas
router.get('/mapa', mostrarMapa);

// 📦 Obtener propiedades activas (API pública)
router.get('/activas', getPropiedadesActivas);

// 📄 Obtener todas mis propiedades (solo propietario)
router.get('/mis-propiedades', authorize('propietario'), obtenerMisPropiedades);

// ➕ Crear nueva propiedad (solo propietario)
router.post('/', authorize('propietario'), upload.single('foto'), crearPropiedad);

// 🔍 Obtener una propiedad específica
router.get('/:id', obtenerPropiedadPorId);

// ✏️ Actualizar propiedad
router.put('/:id', authorize('propietario'), upload.single('foto'), actualizarPropiedad);

// 🗑️ Eliminar propiedad
router.delete('/:id', authorize('propietario'), eliminarPropiedad);

export default router;
