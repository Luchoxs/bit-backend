import express from 'express';
import { 
    obtenerIncidentes,
    obtenerIncidente,
    crearIncidente,
    actualizarIncidente,
    eliminarIncidente,
    marcarComoResuelto,
    buscarPorTipo,
    buscarPorEstado,
    buscarPorGravedad
} from '../controllers/incidentes.controller.js';

const router = express.Router();

// Rutas CRUD básicas
router.get('/', obtenerIncidentes);
router.get('/:id', obtenerIncidente);
router.post('/', crearIncidente);
router.put('/:id', actualizarIncidente);
router.delete('/:id', eliminarIncidente);

// Rutas específicas
router.put('/:id/resolver', marcarComoResuelto);
router.get('/tipo/:tipo', buscarPorTipo);
router.get('/estado/:estado', buscarPorEstado);
router.get('/gravedad/:gravedad', buscarPorGravedad);

export default router;
