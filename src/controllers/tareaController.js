// src/controllers/tareaController.js

import Tarea from '../models/Tarea.js';
import Empleado from '../models/Empleado.js';

export const getAllTareas = async (req, res) => {
  try {
    const { estado, prioridad, area, busqueda } = req.query;
    let filtro = {};
    if (estado && estado !== 'todos') filtro.estado = estado;
    if (prioridad && prioridad !== 'todas') filtro.prioridad = prioridad;
    if (area && area !== 'todas') filtro.area = area;

    if (busqueda) {
      filtro.$or = [
        { titulo: new RegExp(busqueda, 'i') },
        { descripcion: new RegExp(busqueda, 'i') }
      ];
    }

    const tareas = await Tarea.find(filtro).lean();
    res.render('tareas/listaTareas', {
      title: 'Lista de Tareas',
      tareas,
      currentEstado: estado || 'todos',
      currentPrioridad: prioridad || 'todas',
      currentArea: area || 'todas',
      currentBusqueda: busqueda || ''
    });
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).render('error', { message: 'Error al obtener tareas', detail: error.message });
  }
};

export const showNewTareaForm = (req, res) => {
  res.render('tareas/nuevaTarea', {
    title: 'Crear Nueva Tarea',
    areas: ['Ventas', 'Administración', 'Contabilidad', 'Mantenimiento'],
    estados: ['pendiente', 'en progreso', 'completada'],
    prioridades: ['baja', 'media', 'alta']
  });
};
////
export const createTarea = async (req, res) => {
  try {
    console.log('📩 Datos recibidos en createTarea:', req.body);

    const {
      titulo,
      descripcion,
      area,
      estado,
      prioridad,
      fecha,
      empleadoId
    } = req.body;

    // Validación básica
    if (!titulo || !descripcion || !area || !estado || !prioridad) {
      return res.status(400).render('error', {
        message: 'Faltan campos obligatorios',
        detail: 'Por favor completá todos los campos requeridos.'
      });
    }

    // Crear nueva tarea
    const nueva = new Tarea({
      titulo,
      descripcion,
      area,
      estado,
      prioridad,
      fecha: fecha ? new Date(fecha) : undefined,
      empleadoId
    });

    await nueva.save();
    console.log('✅ Tarea guardada exitosamente:', nueva);

    res.redirect('/tareas');
  } catch (error) {
    console.error('❌ Error al crear tarea:', error);
    res.status(500).render('error', {
      message: 'Error al crear tarea',
      detail: error.message
    });
  }
};
////


export const showEditTareaForm = async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id).lean();
    if (!tarea) return res.status(404).render('error', { message: 'Tarea no encontrada' });

    res.render('tareas/editarTarea', {
      title: `Editar Tarea: ${tarea.titulo}`,
      tarea,
      areas: ['Ventas', 'Administración', 'Contabilidad', 'Mantenimiento'],
      estados: ['pendiente', 'en progreso', 'completada'],
      prioridades: ['baja', 'media', 'alta']
    });
  } catch (error) {
    console.error('Error al cargar tarea:', error);
    res.status(500).render('error', { message: 'Error al cargar tarea', detail: error.message });
  }
};

export const updateTarea = async (req, res) => {
  try {
    await Tarea.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/tareas');
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    res.status(500).render('error', { message: 'Error al actualizar tarea', detail: error.message });
  }
};

export const deleteTarea = async (req, res) => {
  try {
    await Tarea.findByIdAndDelete(req.params.id);
    res.redirect('/tareas');
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    res.status(500).render('error', { message: 'Error al eliminar tarea', detail: error.message });
  }
};

export const showTareaDetail = async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id).lean();
    if (!tarea) return res.status(404).render('error', { message: 'Tarea no encontrada' });

    res.render('tareas/detalleTarea', {
      title: `Detalle de Tarea ${tarea.titulo}`,
      tarea
    });
  } catch (error) {
    console.error('Error al mostrar detalle:', error);
    res.status(500).render('error', { message: 'Error al mostrar detalle', detail: error.message });
  }
};

export const buscarTareasPorNombreApellido = async (req, res) => {
  try {
    const { nombre, apellido } = req.query;
    const empleados = await Empleado.find().lean();

    const empleadosFiltrados = empleados.filter(e =>
      e.nombre.toLowerCase().includes(nombre.toLowerCase()) &&
      e.apellido.toLowerCase().includes(apellido.toLowerCase())
    );

    const ids = empleadosFiltrados.map(e => e._id);
    const tareas = await Tarea.find({ empleadoId: { $in: ids } }).lean();

    res.render('tareas/tareasFiltradas', { tareas });
  } catch (error) {
    console.error('Error al buscar tareas:', error);
    res.status(500).render('error', { message: 'Error al buscar tareas', detail: error.message });
  }
};
