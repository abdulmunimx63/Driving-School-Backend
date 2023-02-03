const express = require("express");
const router = express.Router();
const categories = require("../controllers/CategoriesController");

// Create a new category
router.post("/create", categories.create);

// Retrieve all categories
router.get("/index", categories.index);

// Retrieve all categories by type
router.get("/getByType", categories.getByType);

// Retrieve a single category with id
router.get("/view/:id", categories.view);

// Update a category with id
router.put("/update/:id", categories.update);

// Delete a category with id
router.delete("/delete/:id", categories.delete);

module.exports = router;
