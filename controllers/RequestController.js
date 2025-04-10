// controllers/requestController.js
const Request = require("../models/Request");
const userModel = require("../models/userModel");
const { sendRequesttEmail } = require("../utils/email");

exports.createRequest = async (req, res) => {
  try {
    console.log(req.body);
    
    const request = new Request(req.body);
    await request.save();

    const users=await userModel.find()

    users.map(async (user)=>{
      await sendRequesttEmail(user.email,request)
    })


    res.status(201).json(request);
  } catch (error) {
    console.log(error);
    
    res.status(400).json({ error: error.message });
  }
};


exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Request.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
