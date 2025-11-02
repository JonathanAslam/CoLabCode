// controllers/User.controller.js
class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  // Create a new user
  async create(req, res) {
    try {
      const { username, email, password } = req.body;

      // Validate required fields
      if (!username || !email || !password) {
        return res.status(400).json({ 
          error: 'Missing required fields: username, email, password' 
        });
      }

      const user = await this.userService.create({ username, email, password });
      
      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      
      if (error.message.includes('already exists') || 
          error.message.includes('must be at least')) {
        return res.status(400).json({ error: error.message });
      }
      
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = UserController;
