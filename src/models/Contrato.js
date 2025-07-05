import mongoose from 'mongoose';

const firmaSchema = new mongoose.Schema({
  imagen: {
    type: String, // base64 o URL al archivo de imagen
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  ip: {
    type: String,
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
}, { _id: false });

const contratoSchema = new mongoose.Schema({
  numeroContrato: {
    type: String,
    required: true,
    unique: true
  },
  propiedad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Propiedad',
    required: true
  },
  propietario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  inquilino: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  empleado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaFin: {
    type: Date,
    required: true
  },
  condiciones: {
    type: String,
    required: true
  },
  firmadoPorEmpleado: firmaSchema,
  firmadoPorPropietario: firmaSchema,
  firmadoPorInquilino: firmaSchema,
  estado: {
    type: String,
    enum: ['pendiente', 'firmado', 'cancelado', 'vencido'],
    default: 'pendiente'
  }
}, {
  timestamps: true
});

const Contrato = mongoose.models.Contrato || mongoose.model('Contrato', contratoSchema);

export default Contrato;
