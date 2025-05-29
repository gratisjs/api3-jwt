require('dotenv').config(); // Asegúrate de que esto esté al principio
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { testDbConnection } = require('./config/database'); // Importa la función de prueba de conexión

const app = express();
const dbConfig = {
     database: process.env.DB_DATABASE,    // Variable de entorno de Render
     host: process.env.DB_HOST,         // Variable de entorno de Render
     password: process.env.DB_PASSWORD,  // Variable de entorno de Render
     port: process.env.DB_PORT        // Variable de entorno de Render
     user: process.env.DB_USER,        // Variable de entorno de Render
 
   
   
};

// Middleware
app.use(express.json());
app.use(cors());

// Prueba la conexión a la base de datos al iniciar la aplicación
testDbConnection();

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Autenticación funcionando!');
});

module.exports = app; // Exporta la instancia de app para que server.js la use
