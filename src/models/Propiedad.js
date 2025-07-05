import mongoose from 'mongoose';

const propiedadSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['casa', 'departamento', 'local', 'oficina', 'otro'],
    required: true
  },
  transaccion: {
    type: String,
    enum: ['alquiler', 'venta', 'alquiler temporario'],
    required: true
  },
  precio: {
    valor: {
      type: Number,
      required: true
    },
    moneda: {
      type: String,
      enum: ['ARS', 'USD', 'EUR'],
      default: 'ARS'
    },
    expensas: Number,
    todoIncluido: {
      type: Boolean,
      default: false
    }
  },
  estado: {
    type: String,
    enum: ['disponible', 'reservada', 'alquilada', 'inactiva'],
    default: 'disponible'
  },
  ubicacion: {
    calle: String,
    numero: String,
    piso: String,
    departamento: String,
    ciudad: String,
    provincia: String,
    codigoPostal: String,
    pais: String,
    coordenadas: {
      lat: Number,
      lng: Number
    }
  },
  caracteristicas: {
    habitaciones: Number,
    banos: Number,
    metrosCuadrados: Number,
    antiguedad: Number,
    amoblado: Boolean,
    balcon: Boolean,
    piscina: Boolean,
    gimnasio: Boolean
  },
  serviciosCercanos: {
    hospitales: [
      {
        nombre: String,
        distanciaKm: Number
      }
    ],
    universidades: [
      {
        nombre: String,
        distanciaKm: Number
      }
    ]
  },
  diasDisponibles: {
    type: [String], // ej. ['lunes', 'martes']
    default: []
  },
  horaDesde: {
    type: String,
    default: ''
  },
  horaHasta: {
    type: String,
    default: ''
  },
  vencimiento: {
    type: Date,
    default: null
  },
  imagenUrl: {
    type: String,
    default: ''
  },
  foto: {
    type: String,
    default: ''
  },
  activo: {
    type: Boolean,
    default: true
  },
  propietarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  inquilinoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    default: null
  }
}, {
  timestamps: true,
  collection: 'propiedades'
});

const Propiedad = mongoose.models.Propiedad || mongoose.model('Propiedad', propiedadSchema, 'propiedades');

export default Propiedad;
