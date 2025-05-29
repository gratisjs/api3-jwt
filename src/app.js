require('dotenv').config(); // Asegúrate de que esto esté al principio
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { testDbConnection } = require('./config/database'); // Importa la función de prueba de conexión

const app = express();

// OJO: Este dbConfig no se está usando directamente aquí en app.js
// Asumo que tu función testDbConnection en database.js es la que realmente lo necesita.
// Si no lo estás pasando a database.js, esta declaración aquí no es útil para la conexión.
// Sin embargo, corregiremos la sintaxis por ahora.
const dbConfig = {
    database: process.env.DB_DATABASE,   // Variable de entorno de Render
    host: process.env.DB_HOST,           // Variable de entorno de Render
    password: process.env.DB_PASSWORD,   // Variable de entorno de Render
    port: process.env.DB_PORT,           // <--- ¡AÑADE ESTA COMA!
    user: process.env.DB_USER,           // Variable de entorno de Render
};

// Middleware
app.use(express.json());

// Configuración de CORS
// ¡Recuerda usar la configuración CORS completa que te di anteriormente para localhost!
// app.use(cors({
//   origin: ['http://localhost:5173', 'https://tu-dominio-frontend-desplegado.com'],
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   optionsSuccessStatus: 204
// }));
// Por ahora, para arreglar el SyntaxError, mantendré app.use(cors()) simple,
// pero recuerda el otro si el CORS del navegador vuelve a ser un problema.
app.use(cors());


// Prueba la conexión a la base de datos al iniciar la aplicación
// Asegúrate de que testDbConnection en database.js use las variables de entorno directamente
// o que se le pase este dbConfig si lo necesitas allí.
testDbConnection();

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de Autenticación funcionando!');
});

module.exports = app; // Exporta la instancia de app para que server.js la use
