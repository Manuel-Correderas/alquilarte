import express from 'express';
import {
  listarTurnos,
  renderFormNuevoTurno,
  crearTurno,
  editarTurno,
  actualizarTurno,
  eliminarTurno
} from '../../controllers/turnoController.js';

const router = express.Router();

router.get('/', listarTurnos);
router.get('/nuevo', renderFormNuevoTurno);
router.post('/', crearTurno);
router.get('/:id/editar', editarTurno);
router.put('/:id', actualizarTurno);
router.delete('/:id', eliminarTurno);

export default router;
