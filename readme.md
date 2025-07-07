# Proyecto backend# API de Incidentes Viales

## Descripción
API REST para el manejo de incidentes viales, incluyendo accidentes, desvíos, reparaciones y mantenimiento de vías. La API permite la gestión completa de incidentes, desde su creación hasta su resolución.

## Tecnologías Utilizadas
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- Morgan

## Funcionalidades
- CRUD completo de incidentes viales
- Búsqueda por tipo, estado y nivel de gravedad
- Actualización de estado de incidentes
- Registro de ubicación geográfica
- Manejo de niveles de gravedad

## Endpoints
- **GET /api/incidentes** - Obtener todos los incidentes
- **GET /api/incidentes/:id** - Obtener un incidente específico
- **POST /api/incidentes** - Crear un nuevo incidente
- **PUT /api/incidentes/:id** - Actualizar un incidente
- **DELETE /api/incidentes/:id** - Eliminar un incidente
- **PUT /api/incidentes/:id/resolver** - Marcar incidente como resuelto
- **GET /api/incidentes/tipo/:tipo** - Buscar por tipo de incidente
- **GET /api/incidentes/estado/:estado** - Buscar por estado
- **GET /api/incidentes/gravedad/:gravedad** - Buscar por nivel de gravedad

## Autor
Luis Carlos Escorcia Manga