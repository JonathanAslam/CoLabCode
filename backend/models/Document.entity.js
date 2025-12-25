// models/Document.entity.js
class Document {
  constructor({ id, title, ownerId, createdAt, updatedAt, lastAccessed }) {
    this.id = id;
    this.title = title;
    this.ownerId = ownerId;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
    this.lastAccessed = lastAccessed || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      ownerId: this.ownerId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      lastAccessed: this.lastAccessed
    };
  }
}

module.exports = Document;
