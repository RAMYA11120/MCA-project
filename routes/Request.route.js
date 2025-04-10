// routes/requestRoutes.js
const express = require("express");
const router = express.Router();
const requestController = require("../controllers/RequestController");

router.post("/", requestController.createRequest);
router.get("/", requestController.getAllRequests);
router.put("/:id/status", requestController.updateRequestStatus);

module.exports = router;
