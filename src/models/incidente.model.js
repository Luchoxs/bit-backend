import mongoose from 'mongoose';

const incidenteSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true,
        enum: ['accidente', 'desvio', 'reparacion', 'mantenimiento', 'obras'],
        lowercase: true
    },
    ubicacion: {
        latitud: {
            type: Number,
            required: true
        },
        longitud: {
            type: Number,
            required: true
        }
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
        minlength: 10
    },
    fecha_hora: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: String,
        enum: ['activo', 'resuelto', 'pendiente'],
        default: 'activo',
        lowercase: true
    },
    fecha_resolucion: {
        type: Date
    },
    nivel_gravedad: {
        type: String,
        enum: ['bajo', 'medio', 'alto'],
        default: 'medio',
        lowercase: true
    },
    imagen: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Métodos estáticos
incidenteSchema.statics = {
    async buscarPorTipo(tipo) {
        return this.find({ tipo: tipo.toLowerCase() });
    },
    async buscarPorEstado(estado) {
        return this.find({ estado: estado.toLowerCase() });
    },
    async buscarPorGravedad(gravedad) {
        return this.find({ nivel_gravedad: gravedad.toLowerCase() });
    }
};

// Métodos de instancia
incidenteSchema.methods = {
    marcarComoResuelto() {
        this.estado = 'resuelto';
        this.fecha_resolucion = new Date();
        return this.save();
    }
};

// Validaciones personalizadas
incidenteSchema.path('nivel_gravedad').validate(function(value) {
    if (this.tipo === 'accidente' && value === 'bajo') {
        return false;
    }
    return true;
}, 'Los accidentes no pueden tener nivel de gravedad bajo');

export default mongoose.model('Incidente', incidenteSchema);
