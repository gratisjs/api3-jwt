require('dotenv').config(); // Carga las variables de entorno desde .env
const app = require('./src/app'); // Importa la configuración de la app desde src/app.js

const PORT = process.env.PORT || 5009; // Usa el puerto del .env o 5000 por defecto

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor de autenticación escuchando en el puerto ${PORT}`);
});
