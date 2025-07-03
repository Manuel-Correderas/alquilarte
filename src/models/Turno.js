import mongoose from 'mongoose';

const turnoSchema = new mongoose.Schema({
  inquilinoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  propiedadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Propiedad',
    required: true
  },
  propietarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  empleadoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    default: null
  },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  comprobante: { type: String, default: '' },
  pagado: { type: Boolean, default: false },
  estado: {
    type: String,
    enum: ['pendiente', 'aceptado', 'rechazado'],
    default: 'pendiente'
  }
}, { timestamps: true });

export default mongoose.model('Turno', turnoSchema);
