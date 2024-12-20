import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js'; // Ensure this is the correct path
import adminAddedUsersRoute from "./routes/adminAddedUsers.js";
import roleRoutes from './routes/role.js'; 
import permissionsRouter from "./routes/permissions.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI) 
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes); // This sets up the correct API route for auth
app.use("/api/users", adminAddedUsersRoute);
app.use("/api/roles", roleRoutes);
app.use("/api/permissions", permissionsRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
