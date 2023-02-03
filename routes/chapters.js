const express = require("express");
const router = express.Router();
const chapters = require("../controllers/ChaptersController");
const auth = require("../middlewares/auth");

// Create a new chapter
router.post("/create", chapters.create);

// Retrieve all chapters
router.get("/index", chapters.index);

// Retrieve all chapters with lessons
router.get("/getAllChaptersWithLessonsByCourse/:id", auth, chapters.getAllChaptersWithLessonsByCourse);

// Retrieve all chapters by course
router.get("/getAllChaptersByCourse/:id", chapters.getAllChaptersByCourse);

// Retrieve a single chapter with id
router.get("/view/:id", chapters.view);

// Update a chapter with id
router.put("/update/:id", chapters.update);

// Delete a chapter with Id
router.delete("/delete/:id", chapters.delete);

module.exports = router;
