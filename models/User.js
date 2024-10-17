// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true // This ensures usernames are stored in lowercase
  },
  password: { type: String, required: true },
  flatNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  isAdmin: { type: Boolean, default: false },
  loginCount: { type: Number, default: 0 },
  totalDuration: { type: Number, default: 0 }, // in seconds
  lastLogin: { type: Date },
  issuesRaised: { type: Number, default: 0 },
  upvotesDone: { type: Number, default: 0 },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
