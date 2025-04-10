// controllers/campaignController.js
const Campaign = require("../models/Campaign.model");
const userModel = require("../models/userModel");
const { sendCampigntEmail } = require("../utils/email");
const { loginController } = require("./authController");

// Create a new campaign (Organization Panel)
exports.createCampaign = async (req, res) => {
    try {
        const { campaignName, location, date } = req.body;

        const existing = await Campaign.findOne({ campaignName, location, date });
        if (existing) {
            return res.status(409).json({ message: "Campaign already exists." });
        }
        const newCampaign = new Campaign({
            ...req.body,
        });

        const saved = await newCampaign.save();

        const users= await userModel.find()
        users.map(async (users) => {
          await  sendCampigntEmail(users.email,saved)
            
        })

        res.status(201).json(saved);
    } catch (err) {
        console.log(err);
        
        res.status(500).json({ error: "Failed to create campaign", message: err.message });
    }
};

// Get all campaigns
exports.getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find()
        console.log(campaigns);

        res.status(200).json(campaigns);
    } catch (err) {
        console.log(err);

        res.status(500).json({ error: "Failed to fetch campaigns", message: err.message });
    }
};

// Get campaigns by organization
exports.getCampaignsByOrg = async (req, res) => {
    try {
        const campaigns = await Campaign.find({ organizerId: req.params.id });
        res.status(200).json(campaigns);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch organization campaigns" });
    }
};

// Update campaign (only by org or admin)
exports.updateCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) return res.status(404).json({ error: "Campaign not found" });

        // Optional: verify org ownership or admin
        campaign.set(req.body);
        const updated = await campaign.save();
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: "Failed to update campaign" });
    }
};

// Delete campaign
exports.deleteCampaign = async (req, res) => {
    try {
        await Campaign.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Campaign deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete campaign" });
    }
};
