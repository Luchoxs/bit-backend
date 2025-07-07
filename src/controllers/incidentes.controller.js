import Incidente from '../models/incidente.model.js';

// Obtener todos los incidentes
export const obtenerIncidentes = async (req, res) => {
    try {
        const incidentes = await Incidente.find();
        res.json(incidentes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un incidente por ID
export const obtenerIncidente = async (req, res) => {
    try {
        const incidente = await Incidente.findById(req.params.id);
        if (!incidente) {
            return res.status(404).json({ message: 'Incidente no encontrado' });
        }
        res.json(incidente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo incidente
export const crearIncidente = async (req, res) => {
    const incidente = new Incidente({
        ...req.body,
        ubicacion: {
            latitud: req.body.ubicacion.latitud,
            longitud: req.body.ubicacion.longitud
        }
    });

    try {
        const nuevoIncidente = await incidente.save();
        res.status(201).json(nuevoIncidente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un incidente
export const actualizarIncidente = async (req, res) => {
    try {
        const incidente = await Incidente.findById(req.params.id);
        if (!incidente) {
            return res.status(404).json({ message: 'Incidente no encontrado' });
        }

        if (req.body.ubicacion) {
            incidente.ubicacion.latitud = req.body.ubicacion.latitud;
            incidente.ubicacion.longitud = req.body.ubicacion.longitud;
        }

        Object.assign(incidente, req.body);
        const incidenteActualizado = await incidente.save();
        res.json(incidenteActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un incidente
export const eliminarIncidente = async (req, res) => {
    try {
        const incidente = await Incidente.findById(req.params.id);
        if (!incidente) {
            return res.status(404).json({ message: 'Incidente no encontrado' });
        }
        await incidente.deleteOne();
        res.json({ message: 'Incidente eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Marcar incidente como resuelto
export const marcarComoResuelto = async (req, res) => {
    try {
        const incidente = await Incidente.findById(req.params.id);
        if (!incidente) {
            return res.status(404).json({ message: 'Incidente no encontrado' });
        }
        await incidente.marcarComoResuelto();
        res.json({ message: 'Incidente marcado como resuelto' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar incidentes por tipo
export const buscarPorTipo = async (req, res) => {
    try {
        const incidentes = await Incidente.buscarPorTipo(req.params.tipo);
        res.json(incidentes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar incidentes por estado
export const buscarPorEstado = async (req, res) => {
    try {
        const incidentes = await Incidente.buscarPorEstado(req.params.estado);
        res.json(incidentes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar incidentes por gravedad
export const buscarPorGravedad = async (req, res) => {
    try {
        const incidentes = await Incidente.buscarPorGravedad(req.params.gravedad);
        res.json(incidentes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
