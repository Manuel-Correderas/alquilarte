import Turno from '../models/Turno.js';
import Usuario from '../models/Usuario.js';
import Propiedad from '../models/Propiedad.js';

const listarTurnos = async (req, res) => {
  try {
    const turnos = await Turno.find()
      .populate('inquilinoId', 'personalData.firstName personalData.lastName')
      .populate('propiedadId', 'direccion')
      .populate('empleadoId', 'personalData.firstName personalData.lastName');
    res.render('turno/listaTurnos', { turnos });
  } catch (error) {
    res.status(500).render('error', { mensaje: 'Error al listar turnos', error });
  }
};

const renderFormNuevoTurno = async (req, res) => {
  try {
    const inquilinos = await Usuario.find({ role: 'inquilino' });
    const propietarios = await Usuario.find({ role: 'propietario' });
    const empleados = await Usuario.find({ role: 'empleado' });
    const propiedades = await Propiedad.find();

    res.render('turno/formTurno', {
      turno: {},
      inquilinos,
      propietarios,
      empleados,
      propiedades
    });
  } catch (error) {
    res.status(500).render('error', { mensaje: 'Error al cargar formulario de turno', error });
  }
};

const crearTurno = async (req, res) => {
  try {
    const nuevoTurno = new Turno(req.body);
    await nuevoTurno.save();
    res.redirect('/admin/turnos');
  } catch (error) {
    res.status(500).render('error', { mensaje: 'Error al crear turno', error });
  }
};

const editarTurno = async (req, res) => {
  try {
    const turno = await Turno.findById(req.params.id);
    const inquilinos = await Usuario.find({ role: 'inquilino' });
    const propietarios = await Usuario.find({ role: 'propietario' });
    const empleados = await Usuario.find({ role: 'empleado' });
    const propiedades = await Propiedad.find();

    res.render('turno/formTurno', {
      turno,
      inquilinos,
      propietarios,
      empleados,
      propiedades
    });
  } catch (error) {
    res.status(500).render('error', { mensaje: 'Error al editar turno', error });
  }
};

const actualizarTurno = async (req, res) => {
  try {
    await Turno.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/admin/turnos');
  } catch (error) {
    res.status(500).render('error', { mensaje: 'Error al actualizar turno', error });
  }
};

// ... resto de las funciones definidas sin "export const"

const eliminarTurno = async (req, res) => {
  try {
    await Turno.findByIdAndDelete(req.params.id);
    res.redirect('/admin/turnos');
  } catch (error) {
    res.status(500).render('error', { mensaje: 'Error al eliminar turno', error });
  }
};

// Exportación única agrupada
export {
  listarTurnos,
  renderFormNuevoTurno,
  crearTurno,
  editarTurno,
  actualizarTurno,
  eliminarTurno
};

