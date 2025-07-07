import express from 'express';
import {
  crearPropiedad,
  getPropiedadesActivas,
  mostrarMapa
} from '../../controllers/propiedadController.js';
import { protect, authorize } from '../../middlewares/authMiddleware.js';
import upload from '../../middlewares/upload.js';

const router = express.Router();

// ✅ Ruta correcta: GET /api/propiedades
router.get('/', async (req, res) => {
  try {
    const propiedades = await getPropiedadesActivas();
    res.json(propiedades);
  } catch (error) {
    console.error('[API] Error al obtener propiedades:', error);
    res.status(500).json({ error: 'Error al obtener propiedades' });
  }
});

// ✅ Ruta para mostrar el mapa: GET /api/propiedades/mapa-propiedades
router.get('/mapa-propiedades', mostrarMapa);

// ✅ Ruta para crear propiedad: POST /api/propiedades
router.post(
  '/',
  protect,
  authorize(['admin', 'propietario']),
  upload.single('foto'),
  crearPropiedad
);

export default router;

