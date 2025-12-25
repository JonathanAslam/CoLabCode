// repositories/Document.repository.js
const pool = require('../config/database');
const Document = require('../models/Document.entity');

class DocumentRepository {
  async create(document) {
    const query = `
      INSERT INTO documents (id, title, owner_id)
      VALUES ($1, $2, $3)
      RETURNING id, title, owner_id, created_at, updated_at, last_accessed
    `;
    
    const values = [document.id, document.title, document.ownerId];
    
    try {
      const result = await pool.query(query, values);
      const row = result.rows[0];
      
      return new Document({
        id: row.id,
        title: row.title,
        ownerId: row.owner_id,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        lastAccessed: row.last_accessed
      });
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    const query = `
      SELECT id, title, owner_id, created_at, updated_at, last_accessed
      FROM documents
      WHERE id = $1
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const row = result.rows[0];
    return new Document({
      id: row.id,
      title: row.title,
      ownerId: row.owner_id,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      lastAccessed: row.last_accessed
    });
  }

  async findByOwnerId(ownerId) {
    const query = `
      SELECT id, title, owner_id, created_at, updated_at, last_accessed
      FROM documents
      WHERE owner_id = $1
      ORDER BY created_at DESC
    `;
    
    const result = await pool.query(query, [ownerId]);
    
    return result.rows.map(row => new Document({
      id: row.id,
      title: row.title,
      ownerId: row.owner_id,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      lastAccessed: row.last_accessed
    }));
  }

  async update(id, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (updates.title !== undefined) {
      fields.push(`title = $${paramCount}`);
      values.push(updates.title);
      paramCount++;
    }
    
    if (updates.lastAccessed !== undefined) {
      fields.push(`last_accessed = $${paramCount}`);
      values.push(updates.lastAccessed);
      paramCount++;
    }

    // Always update updated_at
    fields.push(`updated_at = CURRENT_TIMESTAMP`);

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);
    const query = `
      UPDATE documents
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, title, owner_id, created_at, updated_at, last_accessed
    `;

    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return new Document({
      id: row.id,
      title: row.title,
      ownerId: row.owner_id,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      lastAccessed: row.last_accessed
    });
  }

  async updateLastAccessed(id) {
    const query = `
      UPDATE documents
      SET last_accessed = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING id, title, owner_id, created_at, updated_at, last_accessed
    `;

    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return new Document({
      id: row.id,
      title: row.title,
      ownerId: row.owner_id,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      lastAccessed: row.last_accessed
    });
  }

  async delete(id) {
    const query = 'DELETE FROM documents WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    return result.rows.length > 0;
  }
}

module.exports = DocumentRepository;
