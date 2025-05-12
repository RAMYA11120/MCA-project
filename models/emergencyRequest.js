// ===================== models/EmergencyRequest.js =====================
const mongoose = require("mongoose");

const emergencyRequestSchema = new mongoose.Schema({
  patientName: String,
  hospitalName: String,
  location: String,
  bloodGroup: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]
  },
  unitsNeeded: Number,
  contactNumber: String,
  status: {
    type: String,
    enum: ["Pending", "Notified", "Completed"],
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("EmergencyRequest", emergencyRequestSchema);