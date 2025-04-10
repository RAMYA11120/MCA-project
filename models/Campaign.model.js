// models/Campaign.js
const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  campaignName: { type: String, required: true },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  expectedDonors: { type: Number },
  collectedUnits: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
    default: "Upcoming",
  },
  description: { type: String },
}, { timestamps: true });
const Campaign= mongoose.model("Campaign", campaignSchema);
module.exports = Campaign
