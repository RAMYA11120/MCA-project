// models/Request.js
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  requesterName: String,
  requesterType: { type: String, enum: ["hospital","organisation"], required: true },
  email:String,
  contactNumber: String,
  bloodGroup: String,
  units: Number,
  reason: String,
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

const Request=mongoose.model("Request", requestSchema);

module.exports = Request
