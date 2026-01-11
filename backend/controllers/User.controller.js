const jwt = require('jsonwebtoken');

// controllers/User.controller.js
class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  // Create a new user
  async create(req, res) {
    try {
      console

      const { username, email, password } = req.body;

      // Validate required fields
      if (!username || !email || !password) {
        return res.status(400).json({ 
          error: 'Missing required fields: username, email, password' 
        });
      }

      // calls the userService 'create' function
      const user = await this.userService.create({ username, email, password });

      // create and sign JWT token here
      const id = user.id;
      const token = jwt.sign({ userId: id}, process.env.JWT_SECRET, { expiresIn: '1d' });

      // create cookie with the token to use for authentication
      // Set HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,                                                   // dont allow js to access, only http
        secure: process.env.NODE_ENV === "production",                    // only http in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // use none for production and lax (between strict and none) for dev
        maxAge: 24 * 60 * 60 * 1000                                       // 1 day cookie lifetime, change if needed
      });

      
      res.status(201).json({
        message: 'User created successfully',
        user: user
      });
    } catch (error) {
      console.error('Error creating user:', error);
      
      if (error.message.includes('already exists') || 
          error.message.includes('must be at least')) {
        return res.status(400).json({ error: error.message });
      }
      
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  // Get user by ID - completed (double check if correctly implemented)
  async getById(req, res) {
    try {
      const id  = req.params.id;

      // validate the id 
      if (!id) {
        return res.status(400).json({ 
          error: 'User ID is required' 
        });
      }
      
      // calls the userService 'getById' function, passing validated ID
      const user = await this.userService.getById(id);

      res.status(200).json(user);

    } catch (error) {
      console.error('Error fetching the user by ID:', error);

      if (error.message.includes('not found')) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get profile - from JWT token with authMiddleware
  async getProfile(req, res) {
    try {
      const id = req.user.id; // get userId from authMiddleware
    
      if (!id) {
        return res.status(400).json({ 
          error: 'User ID not found in token' 
        });
      }
    
      const user = await this.userService.getById(id);
      res.status(200).json(user);

    } catch (error) {
      console.error('Error fetching user profile:', error);

      if (error.message.includes('not found')) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(500).json({ error: 'Internal server error' });
    }
  }


  // Login user 
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Validate required fields
      if (!username || !password) {
        return res.status(400).json({ 
          error: 'Missing required fields: username, password' 
        });
      }
      
      // calls the userService 'login' function
      const user = await this.userService.login(username, password);

      // create and sign JWT token here - same process as in 'create' method
      const id = user.id;
      const token = jwt.sign({ userId: id}, process.env.JWT_SECRET, { expiresIn: '1d' });

      // create cookie with the token to use for authentication
      // Set HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,                                                   // dont allow js to access, only http
        secure: process.env.NODE_ENV === "production",                    // only http in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // use none for production and lax (between strict and none) for dev
        maxAge: 24 * 60 * 60 * 1000                                       // 1 day cookie lifetime, change if needed
      });
      
      res.status(200).json(user);
    } catch (error) {
      console.error('Error logging in user:', error);

      if (error.message.includes('Invalid')) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Additional methods (e.g., update, delete) can be added here

  // Logout user - remove cookie when logging out
  async logout(req, res) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    res.status(200).json({ message: 'Logged out successfully'
    })
  };

}
module.exports = UserController;
