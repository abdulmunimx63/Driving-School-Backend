const express = require("express");
const router = express.Router();
const subCategories = require("../controllers/SubCategoriesController");

// Create a new sub category
router.post("/create", subCategories.create);

// Retrieve all subCategories
router.get("/index", subCategories.index);

// Retrieve all subCategories by category
router.get("/getByCategory/:id", subCategories.getByCategory);

// Retrieve a single sub category with id
router.get("/view/:id", subCategories.view);

// Update a sub category with id
router.put("/update/:id", subCategories.update);

// Update a sub category with id
router.delete("/delete/:id", subCategories.delete);

module.exports = router;
