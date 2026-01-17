// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares - These MUST be before your routes
app.use(cors());
app.use(express.json()); 

// Import your Job model
const Job = require('./models/Job');

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected! ✅"))
  .catch(err => console.error("MongoDB Error:", err));

// --- API ROUTES ---

// 1. Route to get all jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find(); // This pulls data from MongoDB
    res.json(jobs); // This sends it to React
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. THIS IS FOR ADDING NEW JOBS
app.post('/api/jobs', async (req, res) => {
  console.log("POST /api/jobs hit", req.body); // 👈 ADD THIS

  try {
    const newJob = new Job({
      title: req.body.title,
      company: req.body.company
    });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));