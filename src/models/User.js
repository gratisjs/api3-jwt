const { pool } = require('../config/database');

class User {
  // Encuentra un usuario por su nombre de usuario
  static async findByUsername(username) {
    try {
      const [rows] = await pool.query('SELECT * FROM usuarios WHERE username = ?', [username]);
      return rows[0]; // Retorna el primer usuario encontrado (o undefined si no hay)
    } catch (error) {
      console.error('Error al buscar usuario por nombre de usuario:', error);
      throw error;
    }
  }

  // Crea un nuevo usuario en la base de datos
  static async create(username, password_hash, rol = 'user') {
    try {
      const [result] = await pool.query(
        'INSERT INTO usuarios (username, password_hash, rol) VALUES (?, ?, ?)',
        [username, password_hash, rol]
      );
      // Retorna el ID del usuario recién creado
      return { id: result.insertId, username, rol};
    } catch (error) {
      console.error('Error al crear nuevo usuario:', error);
      throw error;
    }
  }

  // Puedes añadir otros métodos aquí si los necesitas, ej:
  // static async findById(id) { ... }
  // static async updatePassword(id, newPasswordHash) { ... }
}

module.exports = User;