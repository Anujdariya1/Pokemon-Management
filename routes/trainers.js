const express = require("express");
const router = express.Router();
const trainerController = require("../controllers/trainerController");

// List all trainers
router.get("/", trainerController.getAllTrainers);

// Show form to add a trainer
router.get("/add", trainerController.showAddTrainerForm);

// Handle form submission to add a trainer
router.post("/add", trainerController.addTrainer);

// Delete a trainer
router.post("/delete/:id", trainerController.deleteTrainer);

module.exports = router;
