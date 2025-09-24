// User.model.js
const database = null; // Placeholder for database connection. Besure to require appropriate database library (e.g., mongo).

const userSchema = new database.Schema({
    username: {
        type: String, // Delegate uuid generation to the database
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = database.model('User', userSchema);