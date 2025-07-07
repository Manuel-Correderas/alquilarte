// src/routes/propiedadViewRoutes.js
import express from 'express';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js'; // ✅ IMPORTANTE para manejar imágenes

import {
  crearPropiedad,
  actualizarPropiedad,
  eliminarPropiedad,
  mostrarMapa,
  getPropiedadesActivas
} from '../controllers/propiedadController.js';


import Propiedad from '../models/Propiedad.js';

const router = express.Router();

// ✅ Ruta pública del mapa
router.get('/mapa', mostrarMapa);

// ✅ API para obtener propiedades activas en formato JSON
router.get('/api/propiedades', async (req, res) => {
  try {
    const propiedades = await getPropiedadesActivas();
    res.json(propiedades);
  } catch (error) {
    console.error('[API] Error al obtener propiedades activas:', error);
    res.status(500).json({ error: 'Error al obtener propiedades activas' });
  }
});

// ✅ Formulario para crear propiedad (vista)
router.get(
  '/admin/propiedades/nueva',
  protect,
  authorize(['admin', 'propietario']),
  (req, res) => {
    res.render('admin/formNuevaPropiedad', {
      title: 'Añadir Propiedad',
      user: req.user
    });
  }
);

// ✅ Lista de propiedades (vista)
router.get(
  '/admin/propiedades',
  protect,
  authorize(['admin', 'propietario']),
  async (req, res) => {
    try {
      const propiedades = await Propiedad.find({ propietarioId: req.user._id }).lean();

      res.render('admin/listaPropiedades', {
        title: 'Lista de Propiedades',
        propiedades,
        user: req.user
      });
    } catch (error) {
      console.error('[VISTA] Error al cargar lista de propiedades:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'No se pudieron cargar las propiedades.'
      });
    }
  }
);

// ✅ Ruta para crear propiedad (POST desde formulario)
router.post(
  '/admin/propiedades/nueva',
  protect,
  authorize(['admin', 'propietario']),
  upload.single('foto'),
  crearPropiedad
);

// ✅ Ruta para editar propiedad (formulario GET)
router.get(
  '/admin/propiedades/editar/:id',
  protect,
  authorize(['admin', 'propietario']),
  async (req, res) => {
    try {
      const propiedad = await Propiedad.findById(req.params.id).lean();
      if (!propiedad) {
        return res.status(404).render('error', { message: 'Propiedad no encontrada' });
      }
      res.render('admin/formEditarPropiedad', {
        title: 'Editar Propiedad',
        propiedad,
        user: req.user
      });
    } catch (error) {
      console.error('[VISTA] Error al cargar formulario de edición:', error);
      res.status(500).render('error', { message: 'Error al cargar el formulario' });
    }
  }
);

// ✅ Ruta para procesar edición (POST desde formulario)
router.post(
  '/admin/propiedades/editar/:id',
  protect,
  authorize(['admin', 'propietario']),
  upload.single('foto'),
  actualizarPropiedad
);

// ✅ Ruta para eliminar propiedad (GET con confirmación previa o AJAX desde el panel)
router.get(
  '/admin/propiedades/eliminar/:id',
  protect,
  authorize(['admin', 'propietario']),
  eliminarPropiedad
);
// ✅ Coincide con el formulario que usa method='POST'
router.post(
  '/admin/propiedades/eliminar/:id',
  protect,
  authorize(['admin', 'propietario']),
  eliminarPropiedad
);
router.get(
  '/admin/propiedades/editar/:id',  // 👈 esta debe coincidir
  protect,
  authorize(['admin', 'propietario']),
  async (req, res) => {
    const propiedad = await Propiedad.findById(req.params.id).lean();
    if (!propiedad) {
      return res.status(404).render('error', { message: 'Propiedad no encontrada' });
    }
    res.render('admin/formEditarPropiedad', {
      title: 'Editar Propiedad',
      propiedad,
      user: req.user
    });
  }
);


export default router;
