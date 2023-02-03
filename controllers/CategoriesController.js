const Category = require("../models/Category");

// Create and Save a new category
exports.create = async (req, res) => {
  const { name, description, type } = req.body;

  try {
    const category = new Category({
      name,
      description,
      type,
    });
    const newCategory = await category.save();
    res.status(200).json({
      message: "Category created successfully!",
      data: newCategory,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

// Retrieve all categories from the database.
exports.index = async (req, res) => {
  try {
    let categories = await Category.find();
    res.status(200).json({
      message: "Categories fetched successfully!",
      data: categories,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

// Retrieve all categories from the database by type.
exports.getByType = async (req, res) => {
  try {
    let categories = await Category.find({ type: req.query.type });
    res.status(200).json({
      message: "Categories fetched successfully!",
      data: categories,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

// Find a single category with an id
exports.view = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    res.status(200).json({
      message: "Category fetched successfully!",
      data: category,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

// Update a category by the id in the request
exports.update = async (req, res) => {
  console.log(req.body);
  try {
    const { name, description, type } = req.body;
    console.log("name", name, "description", description);

    let updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        type,
      },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).send({
        message: "Category not found with id " + req.params.id,
      });
    } else {
      res.status(200).json({
        data: updatedCategory,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err,
    });
  }
};

// Delete a category with the specified id in the request:
exports.delete = async (req, res) => {
  try {
    let category = await Category.findByIdAndRemove(req.params.id);
    if (!category) {
      return res.status(404).send({
        message: "Category not found with id " + req.params.id,
      });
    }
    res.send({ message: "Category deleted successfully!" });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};
