const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const courses = require("../controllers/CoursesController");

// Create a new course
router.post("/create", courses.create);

// Unlock course
router.post("/unlock", courses.unlock);

// Check Lock or Unlock course
router.post("/checkLockOrUnlock", courses.checkLockOrUnlock);

// Lock course
router.post("/lock", courses.lock);

// Retrieve all courses
router.get("/index", courses.index);

// Retrieve all courses by category
router.get("/getByCategory/:id", courses.getByCategory);

// Retrieve a single course with Id
router.get("/view/:id", courses.view);

// Update a course with Id
router.put("/update/:id", courses.update);

// Delete a course with Id
router.delete("/delete/:id", courses.delete);

module.exports = router;
