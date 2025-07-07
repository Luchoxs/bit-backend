import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import incidentesRoutes from './routes/incidentes.routes.js';
import connectDB from './config/db.js';

// Configurar variables de entorno
dotenv.config();

// Inicializar aplicación
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/incidentes', incidentesRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'API de Incidentes Viales' });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : {} 
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 4100;

const startServer = async () => {
    try {
        // Conectar a la base de datos
        await connectDB();
        
        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();