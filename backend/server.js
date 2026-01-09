// load environment variables from .env file
require('dotenv').config();

// backend/server.js
const express = require("express");
// const cors = require("cors"); 
const pool = require("./config/database");

// Import repositories
const UserRepository = require("./repositories/User.repository");
// const DocumentRepository = require("./repositories/Document.repository");

// Import services
const UserService = require("./services/User.service");
// const DocumentService = require("./services/Document.service");

// Import controllers
const UserController = require("./controllers/User.controller");
// const DocumentController = require("./controllers/Document.controller");



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware (for development) -- commented out by johnny after using cors package
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Initialize repositories
const userRepository = new UserRepository();
// const documentRepository = new DocumentRepository();

// Initialize services
const userService = new UserService(userRepository);
// const documentService = new DocumentService(documentRepository);

// Initialize controllers
const userController = new UserController(userService);
// const documentController = new DocumentController(documentService);

// Health check route
app.get("/", (req, res) => {
  res.json({ 
    message: "CoLabCode API Server",
    status: "running",
    timestamp: new Date().toISOString()
  });
});

// Database health check
app.get("/health", async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.json({ 
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: "unhealthy",
      database: "disconnected",
      error: error.message
    });
  }
});

// ===== USER ROUTES =====
app.post("/api/users", (req, res) => userController.create(req, res));
app.get("/api/users/:id", (req, res) => userController.getById(req, res)); // implemented - 01/01/2026
app.post("/api/users/login", (req, res) => userController.login(req, res)); // implemented - 01/06/2026

// // ===== DOCUMENT ROUTES =====
// app.post("/api/documents", (req, res) => documentController.create(req, res));
// app.get("/api/documents/:id", (req, res) => documentController.getById(req, res));
// app.get("/api/users/:ownerId/documents", (req, res) => documentController.getByOwnerId(req, res));
// app.put("/api/documents/:id/title", (req, res) => documentController.updateTitle(req, res));
// app.put("/api/documents/:id/access", (req, res) => documentController.updateLastAccessed(req, res));
// app.delete("/api/documents/:id", (req, res) => documentController.delete(req, res));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Database: ${process.env.DATABASE_URL ? 'Configured' : 'Not configured'}`);
});
