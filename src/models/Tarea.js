// src/models/Tarea.js
import mongoose from 'mongoose';

const tareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: String,
  estado: { type: String, enum: ['pendiente', 'en progreso', 'completada'], default: 'pendiente' },
  prioridad: { type: String, enum: ['baja', 'media', 'alta'], default: 'media' },
  fecha: Date,
  area: String,
  empleadoId: String,
  informe: String,
  finalizada: { type: Boolean, default: false }
});

const Tarea = mongoose.model('Tarea', tareaSchema);
export default Tarea;


