// db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.log('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process if there's an error
  }
};

module.exports = connectDB; // Export the connection function
