// repositories/User.repository.js
const pool = require('../config/database');
const User = require('../models/User.entity');

class UserRepository {
  async create(user) {
    const query = `
      INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, password_hash, created_at
    `;
    
    const values = [user.username, user.email, user.passwordHash];
    
    try {
      const result = await pool.query(query, values);
      const row = result.rows[0];
      
      return new User({
        id: row.id,
        username: row.username,
        email: row.email,
        passwordHash: row.password_hash,
        createdAt: row.created_at
      });
    } catch (error) {
      // Handle duplicate username/email
      if (error.code === '23505') {
        if (error.constraint === 'users_username_key') {
          throw new Error('Username already exists');
        }
        if (error.constraint === 'users_email_key') {
          throw new Error('Email already exists');
        }
      }
      throw error;
    }
  }

  async findById(id) {
    const query = `
      SELECT id, username, email, password_hash, created_at
      FROM users
      WHERE id = $1
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const row = result.rows[0];
    return new User({
      id: row.id,
      username: row.username,
      email: row.email,
      passwordHash: row.password_hash,
      createdAt: row.created_at
    });
  }

  async findByEmail(email) {
    const query = `
      SELECT id, username, email, password_hash, created_at
      FROM users
      WHERE email = $1
    `;
    
    const result = await pool.query(query, [email]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const row = result.rows[0];
    return new User({
      id: row.id,
      username: row.username,
      email: row.email,
      passwordHash: row.password_hash,
      createdAt: row.created_at
    });
  }

  async findByUsername(username) {
    const query = `
      SELECT id, username, email, password_hash, created_at
      FROM users
      WHERE username = $1
    `;
    
    const result = await pool.query(query, [username]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const row = result.rows[0];
    return new User({
      id: row.id,
      username: row.username,
      email: row.email,
      passwordHash: row.password_hash,
      createdAt: row.created_at
    });
  }

  async update(id, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (updates.username !== undefined) {
      fields.push(`username = $${paramCount}`);
      values.push(updates.username);
      paramCount++;
    }
    
    if (updates.email !== undefined) {
      fields.push(`email = $${paramCount}`);
      values.push(updates.email);
      paramCount++;
    }
    
    if (updates.passwordHash !== undefined) {
      fields.push(`password_hash = $${paramCount}`);
      values.push(updates.passwordHash);
      paramCount++;
    }

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);
    const query = `
      UPDATE users
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, username, email, password_hash, created_at
    `;

    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return new User({
      id: row.id,
      username: row.username,
      email: row.email,
      passwordHash: row.password_hash,
      createdAt: row.created_at
    });
  }

  async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    return result.rows.length > 0;
  }
}

module.exports = UserRepository;
