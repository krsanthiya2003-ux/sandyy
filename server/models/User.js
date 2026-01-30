//server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // Unique ID like JS-1001 or EMP-1001
  userId: { 
    type: String, 
    unique: true, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['seeker', 'employer'], 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  // Employer Specific Field
  companyName: { 
    type: String 
  },
  // Seeker Specific Fields
  skills: [String],
  appliedJobs: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Job' 
  }]
});

module.exports = mongoose.model('User', UserSchema);