//server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// IMPORT MODELS - Ensure these files exist in the /models folder
const User = require('./models/User'); 
const Job = require('./models/Job');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); 

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected! ✅"))
  .catch(err => console.error("MongoDB Error:", err));

// --- AUTH ROUTES ---

// 1. Registration with Unique ID Generation
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, role, companyName } = req.body;
    
    // Generate Unique ID based on count
    const count = await User.countDocuments({ role });
    const prefix = role === 'seeker' ? 'JS' : 'EMP';
    const uniqueId = `${prefix}-${1000 + count + 1}`;

    const newUser = new User({
      userId: uniqueId,
      name,
      email,
      password, // Note: Use bcrypt in a real app for security
      role,
      companyName: role === 'employer' ? companyName : undefined
    });

    await newUser.save();
    res.status(201).json({ message: "Registration Successful", userId: uniqueId });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 2. Login with Unique ID
app.post('/api/login', async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await User.findOne({ userId, password });
    if (!user) return res.status(401).json({ message: "Invalid ID or Password" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- JOB ROUTES ---

app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/jobs', async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));