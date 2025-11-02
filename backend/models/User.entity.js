// models/User.entity.js
class User {
  constructor({ id, username, email, passwordHash, createdAt }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = createdAt || new Date();
  }

  // Method to get user without sensitive data
  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      createdAt: this.createdAt
    };
  }
}

module.exports = User;
