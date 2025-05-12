const express = require("express");
const router = express.Router();
const EmergencyRequest = require("../models/emergencyRequest");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const moment = require("moment");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});

// ➕ Submit emergency request and notify eligible donors
router.post("/submit", async (req, res) => {
    try {
        const { patientName, hospitalName, location, bloodGroup, unitsNeeded, contactNumber } = req.body;

        const newRequest = await EmergencyRequest.create({
            patientName,
            hospitalName,
            location,
            bloodGroup,
            unitsNeeded,
            contactNumber
        });

        const ninetyDaysAgo = moment().subtract(90, 'days').toDate();
        const donors = await User.find({
            bloodGroup,
            role: 'donor',
            lastDonated: { $lte: ninetyDaysAgo }
        });

        for (let donor of donors) {
            const mailOptions = {
                from: process.env.EMAIL,
                to: donor.email,
                subject: '⛑ Urgent Blood Needed - Please Help!',
                text: `Dear ${donor.name},\n\nAn emergency request has been made for ${bloodGroup} blood.\nPatient: ${patientName}\nHospital: ${hospitalName}, ${location}\nUnits Needed: ${unitsNeeded}\nContact: ${contactNumber}\n\nPlease help if you can.\nThank you.`,
                html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; padding: 20px;">
            <h2 style="color: red; text-align: center;">⛑ Urgent Blood Needed</h2>
            <p>Dear <strong>${donor.name}</strong>,</p>
            <p>An emergency request has been made for <strong style="color: darkred;">${bloodGroup}</strong> blood. Your donation could help save a life.</p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <tr><td><strong>🧍‍♂️ Patient:</strong></td><td>${patientName}</td></tr>
                <tr><td><strong🏥 Hospital:</strong></td><td>${hospitalName}</td></tr>
                <tr><td><strong>📍 Location:</strong></td><td>${location}</td></tr>
                <tr><td><strong>🩸 Blood Group:</strong></td><td>${bloodGroup}</td></tr>
                <tr><td><strong>🔢 Units Needed:</strong></td><td>${unitsNeeded}</td></tr>
                <tr><td><strong>📞 Contact:</strong></td><td>${contactNumber}</td></tr>
            </table>

            <p style="margin-top: 20px;">If you are eligible to donate, please consider helping. Every drop counts!</p>
            <p>Thank you for being a hero. ❤️</p>

            <div style="text-align: center; margin-top: 30px;">
                <a href="tel:${contactNumber}" style="padding: 10px 20px; background-color: red; color: white; text-decoration: none; border-radius: 5px;">Call Now</a>
            </div>

            <p style="font-size: 12px; margin-top: 20px; color: gray;">You are receiving this email because you are a registered donor with matching blood group.</p>
        </div>
    `
            };

            await transporter.sendMail(mailOptions);
        }

        newRequest.status = "Notified";
        await newRequest.save();

        res.status(200).json({ message: "Donors notified successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to process emergency request." });
    }
});

// 📄 List all emergency requests
router.get("/all", async (req, res) => {
    try {
        const requests = await EmergencyRequest.find().sort({ createdAt: -1 });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: "Error fetching requests" });
    }
});

// ✏️ Update an emergency request
router.put("/update/:id", async (req, res) => {
    try {
        const updatedRequest = await EmergencyRequest.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(500).json({ message: "Failed to update request" });
    }
});

// 🔁 Update only the status
router.patch("/status/:id", async (req, res) => {
    try {
        const { status } = req.body;
        const updated = await EmergencyRequest.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: "Failed to update status" });
    }
});

// ❌ Delete an emergency request
router.delete("/delete/:id", async (req, res) => {
    try {
        await EmergencyRequest.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Request deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete request" });
    }
});

module.exports = router;
