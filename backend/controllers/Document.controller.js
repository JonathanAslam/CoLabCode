// controllers/Document.controller.js
class DocumentController {
  constructor(documentService) {
    this.documentService = documentService;
  }

  // Create a new document
  async create(req, res) {
    try {
      const { title, ownerId } = req.body;

      // Validate required fields
      if (!title || !ownerId) {
        return res.status(400).json({ 
          error: 'Missing required fields: title, ownerId' 
        });
      }

      const document = await this.documentService.create({ title, ownerId });
      
      res.status(201).json(document);
    } catch (error) {
      console.error('Error creating document:', error);
      
      if (error.message.includes('is required')) {
        return res.status(400).json({ error: error.message });
      }
      
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get document by ID
  async getById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'Document ID is required' });
      }

      const document = await this.documentService.getById(id);

      if (!document) {
        return res.status(404).json({ error: 'Document not found' });
      }

      res.json(document);
    } catch (error) {
      console.error('Error fetching document:', error);
      
      if (error.message.includes('Invalid document ID')) {
        return res.status(400).json({ error: error.message });
      }
      
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get all documents for a user
  async getByOwnerId(req, res) {
    try {
      const { ownerId } = req.params;

      if (!ownerId) {
        return res.status(400).json({ error: 'Owner ID is required' });
      }

      const documents = await this.documentService.getByOwnerId(parseInt(ownerId));

      res.json(documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Update document title
  async updateTitle(req, res) {
    try {
      const { id } = req.params;
      const { title } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Document ID is required' });
      }

      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      const document = await this.documentService.updateTitle(id, title);

      if (!document) {
        return res.status(404).json({ error: 'Document not found' });
      }

      res.json(document);
    } catch (error) {
      console.error('Error updating document:', error);
      
      if (error.message.includes('Invalid document ID') || 
          error.message.includes('is required')) {
        return res.status(400).json({ error: error.message });
      }
      
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Update last accessed timestamp
  async updateLastAccessed(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'Document ID is required' });
      }

      const document = await this.documentService.updateLastAccessed(id);

      if (!document) {
        return res.status(404).json({ error: 'Document not found' });
      }

      res.json(document);
    } catch (error) {
      console.error('Error updating document access time:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Delete document
  async delete(req, res) {
    try {
      const { id } = req.params;
      const { ownerId } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Document ID is required' });
      }

      if (!ownerId) {
        return res.status(400).json({ error: 'Owner ID is required' });
      }

      const deleted = await this.documentService.delete(id, parseInt(ownerId));

      if (!deleted) {
        return res.status(404).json({ error: 'Document not found' });
      }

      res.json({ message: 'Document deleted successfully' });
    } catch (error) {
      console.error('Error deleting document:', error);
      
      if (error.message.includes('Unauthorized')) {
        return res.status(403).json({ error: error.message });
      }
      
      if (error.message.includes('Invalid document ID')) {
        return res.status(400).json({ error: error.message });
      }
      
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = DocumentController;
