import mongoose from 'mongoose';

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    },
    password: {
    type: String,
    required: true,
    },
    createdAt: {    
    type: Date,
    default: Date.now,
    },
});
export default mongoose.model('Login', loginSchema);