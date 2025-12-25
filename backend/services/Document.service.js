// services/Document.service.js
const { v4: uuidv4 } = require('uuid');
const Document = require('../models/Document.entity');

class DocumentService {
  constructor(documentRepository) {
    this.documentRepository = documentRepository;
  }

  async create(input) {
    // Validate input
    if (!input.title || input.title.trim().length === 0) {
      throw new Error('Document title is required');
    }

    if (!input.ownerId) {
      throw new Error('Owner ID is required');
    }

    // Generate UUID for document
    const documentId = uuidv4();

    // Create document entity
    const document = new Document({
      id: documentId,
      title: input.title.trim(),
      ownerId: input.ownerId
    });

    // Save to database
    const savedDocument = await this.documentRepository.create(document);

    return savedDocument.toJSON();
  }

  async getById(id) {
    // Validate UUID format
    if (!this.isValidUUID(id)) {
      throw new Error('Invalid document ID format');
    }

    const document = await this.documentRepository.findById(id);
    
    if (!document) {
      return null;
    }

    return document.toJSON();
  }

  async getByOwnerId(ownerId) {
    if (!ownerId) {
      throw new Error('Owner ID is required');
    }

    const documents = await this.documentRepository.findByOwnerId(ownerId);
    
    return documents.map(doc => doc.toJSON());
  }

  async updateTitle(id, title) {
    if (!this.isValidUUID(id)) {
      throw new Error('Invalid document ID format');
    }

    if (!title || title.trim().length === 0) {
      throw new Error('Document title is required');
    }

    const updatedDocument = await this.documentRepository.update(id, {
      title: title.trim()
    });

    if (!updatedDocument) {
      return null;
    }

    return updatedDocument.toJSON();
  }

  async updateLastAccessed(id) {
    if (!this.isValidUUID(id)) {
      throw new Error('Invalid document ID format');
    }

    const updatedDocument = await this.documentRepository.updateLastAccessed(id);

    if (!updatedDocument) {
      return null;
    }

    return updatedDocument.toJSON();
  }

  async delete(id, ownerId) {
    if (!this.isValidUUID(id)) {
      throw new Error('Invalid document ID format');
    }

    // Verify ownership before deleting
    const document = await this.documentRepository.findById(id);
    
    if (!document) {
      return false;
    }

    if (document.ownerId !== ownerId) {
      throw new Error('Unauthorized: You can only delete your own documents');
    }

    return await this.documentRepository.delete(id);
  }

  // Helper method to validate UUID
  isValidUUID(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }
}

module.exports = DocumentService;
