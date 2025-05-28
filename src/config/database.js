const mysql = require('mysql2/promise'); // Usamos la versión de promesas de mysql2

const dbConfig = {
    host: process.env.DB_HOST,           // Variable de entorno de Render
    user: process.env.DB_USER,          // Variable de entorno de Render
    password: process.env.DB_PASSWORD,  // Variable de entorno de Render
    database: process.env.DB_NAME,    // Variable de entorno de Render
    port: process.env.DB_PORT          // Variable de entorno de Render
};

// Crear un pool de conexiones para manejar múltiples conexiones de forma eficiente
const pool = mysql.createPool(dbConfig);

const testDbConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos MariaDB exitosa!');
    connection.release(); // Liberar la conexión al pool
  } catch (error) {
    console.error('Error al conectar a la base de datos MariaDB:', error.message);
    process.exit(1); // Salir de la aplicación si no se puede conectar a la DB
  }
};

module.exports = {
  pool,
  testDbConnection
};
