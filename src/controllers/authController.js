const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Importa modelo de usuario 
const { generateToken } = require('../utils/jwt');

const registerUser = async (req, res) => {
  const { username, password, rol } = req.body; //permitir que se envíe un rol
  if (!username || !password) {
    return res.status(400).json({ message: 'Se requiere nombre de usuario y contraseña.' });
  }

  try {
    // 1. Verificar si el usuario ya existe
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: 'El nombre de usuario ya existe.' });
    }

    // 2. Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Crear el nuevo usuario en la DB
    await User.create(username, hashedPassword, rol); // Usa el método create del modelo

    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    console.error('Error en el registro de usuario:', error);
    res.status(500).json({ message: 'Error en el servidor al registrar el usuario.' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Buscar al usuario en la DB
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // 2. Comparar la contraseña ingresada con el hash almacenado
    const isPasswordValid = await bcrypt.compare(password, user.password_hash); // Compara con password_hash
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // 3. Si las credenciales son válidas, generar un token JWT
    // Incluye el rol del usuario en el token si lo necesitas en el frontend
    const token = generateToken({ id: user.id, username: user.username, rol: user.rol });
    res.json({ token, message: 'Inicio de sesión exitoso.', user: { id: user.id, username: user.username, rol: user.rol } });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el servidor al iniciar sesión.' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};