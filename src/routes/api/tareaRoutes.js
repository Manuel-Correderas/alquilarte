// src/routes/tareaRoutes.js
import express from 'express';
import * as tareaController from '../../controllers/tareaController.js';
import { protect, authorize } from '../../middlewares/authMiddleware.js';
import Usuario from '../../models/Usuario.js';
import Tarea from '../../models/Tarea.js';

const router = express.Router();

// 🔹 Mostrar dashboard del admin con tareas (ya sin el formulario de nueva tarea)
router.get('/admin/dashboard', protect, authorize(['admin']), async (req, res) => {
  try {
    const user = await Usuario.findById(req.user.id).select('-password');
    if (!user) return res.status(404).render('error', { message: 'Usuario no encontrado.' });

    const tareas = await Tarea.find().lean();

    res.render('admin/adminDashboard', {
      title: 'Panel Administrador',
      user,
      tareas,
      currentEstado: 'todos',
      currentPrioridad: 'todas',
      currentArea: 'todas',
      currentBusqueda: ''
    });
  } catch (error) {
    console.error('Error al renderizar /admin/dashboard:', error);
    res.status(500).render('error', { message: 'Error interno del servidor.' });
  }
});

// ✅ Nueva ruta para mostrar el formulario fuera del dashboard
router.get('/nuevaTarea', protect, authorize(['admin']), (req, res) => {
  res.render('tareas/nuevaTarea', {
    title: 'Nueva Tarea',
    areas: ['Ventas', 'Administración', 'Contabilidad', 'Mantenimiento'],
    estados: ['pendiente', 'en progreso', 'completada'],
    prioridades: ['baja', 'media', 'alta']
  });
});

router.post('/nuevaTarea', protect, authorize(['admin']), tareaController.createTarea);

router.get('/', protect, authorize(['admin']), tareaController.getAllTareas);
router.get('/:id/editar', protect, authorize(['admin']), tareaController.showEditTareaForm);
router.post('/:id/editar', protect, authorize(['admin']), tareaController.updateTarea);
router.delete('/:id/eliminar', protect, authorize(['admin']), tareaController.deleteTarea);
router.get('/:id', protect, authorize(['admin']), tareaController.showTareaDetail);
router.post('/nuevaTarea', protect, authorize(['admin']), tareaController.createTarea);

// Búsqueda por nombre/apellido de empleado
router.get('/empleados/dashboard/buscar-tareas', protect, authorize(['admin', 'empleado']), tareaController.buscarTareasPorNombreApellido);

export default router;

