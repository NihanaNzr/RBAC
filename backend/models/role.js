import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    permissions: { type: [String], default: [] }, // Array of permission strings
  });
  

export default mongoose.model('Role', RoleSchema);
