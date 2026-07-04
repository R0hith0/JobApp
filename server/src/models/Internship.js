const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true
  },

  role: {
    type: String,
    required: true,
    trim: true
  },

  qualification: {
    type: String,
    required: true
  },

  experienceRequired: {
    type: String,
    default: "Fresher"
  },

  stipend: {
    type: String
  },

  description: {
  type: String,
  trim: true
},

  workMode: {
    type: String,
    enum: ["REMOTE", "HYBRID", "ONSITE"],
    default: "REMOTE"
  },

  duration: {
    type: String
  },

  appliedOn: {
    type: Date,
    default: Date.now
  },

  deadline: {
    type: Date
  },

  workingHours: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Internship", internshipSchema);