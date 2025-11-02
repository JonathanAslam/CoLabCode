// services/User.service.js
const bcrypt = require('bcryptjs');
const User = require('../models/User.entity');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create(input) {
    // Validate input
    if (!input.username || input.username.length < 5) {
      throw new Error('Username must be at least 5 characters long');
    }
    
    if (!input.email || !this.isValidEmail(input.email)) {
      throw new Error('Valid email is required');
    }
    
    if (!input.password || input.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    // Check if username or email already exists
    const existingUsername = await this.userRepository.findByUsername(input.username);
    if (existingUsername) {
      throw new Error('Username already exists');
    }

    const existingEmail = await this.userRepository.findByEmail(input.email);
    if (existingEmail) {
      throw new Error('Email already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(input.password, 12);

    // Create user entity
    const user = new User({
      username: input.username,
      email: input.email,
      passwordHash: passwordHash
    });

    // Save to database
    const savedUser = await this.userRepository.create(user);

    // Return user without password
    return savedUser.toJSON();
  }

  // Helper method to validate email
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

module.exports = UserService;
