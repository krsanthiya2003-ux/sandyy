// serve/models/Job.js
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  skillsRequired: { type: String, required: true }, // New Field
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);