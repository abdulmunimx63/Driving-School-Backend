const express = require("express");
const router = express.Router();
const lessons = require("../controllers/LessonsController");

// Create a new lesson
router.post("/create", lessons.create);

// Retrieve all lessons
router.get("/index", lessons.index);

// Retrieve a single lesson with Id
router.get("/view/:id", lessons.view);

// Update a lesson with Id
router.put("/update/:id", lessons.update);

// Delete a lesson with Id
router.delete("/delete/:id", lessons.delete);

module.exports = router;
