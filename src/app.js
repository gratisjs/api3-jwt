require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { testDbConnection } = require('./config/database');

const app = express();

// Middleware
app.use(express.json());

// **MODIFICACIÓN AQUÍ para CORS**
// Reemplaza la línea app.use(cors()); con esto:
app.use(cors({
  origin: ['http://localhost:5173', 'https://tu-dominio-frontend-desplegado.com'], // <-- ¡IMPORTANTE: Reemplaza con el dominio real de tu frontend cuando lo despliegues!
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permite los métodos HTTP que vas a usar
  credentials: true, // Esto es necesario si manejas cookies o headers de autorización (como el JWT)
  optionsSuccessStatus: 204 // Para pre-vuelos OPTIONS que algunos navegadores envían
}));

// Prueba la conexión a la base de datos al iniciar la aplicación
testDbConnection();

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Autenticación funcionando!');
});

module.exports = app;
