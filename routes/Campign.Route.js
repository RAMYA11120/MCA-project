// routes/campaignRoutes.js
const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campignController");
// Organization creates campaign
router.post("/",   campaignController.createCampaign);

// Get all campaigns (Admin, Donor, etc.)
router.get("/", campaignController.getAllCampaigns);

// Get campaigns by logged-in organization
router.get("/my-campaigns/:id",   campaignController.getCampaignsByOrg);

// Update campaign
router.put("/:id",  campaignController.updateCampaign);

// Delete campaign
router.delete("/:id",  campaignController.deleteCampaign);

module.exports = router;
