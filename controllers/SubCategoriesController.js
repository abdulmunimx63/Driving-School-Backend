const SubCategory = require("../models/SubCategory");

// Create and Save a new sub category
exports.create = async (req, res) => {
  const { name, description } = req.body;

  try {
    const subCategory = new SubCategory({
      name,
      description,
      category: req.body.categoryId,
    });
    const newSubCategory = await subCategory.save();
    res.status(200).json({
      message: "Sub category created successfully!",
      data: newSubCategory,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

// Retrieve all sub categories from the database.
exports.index = async (req, res) => {
  try {
    let subCategories = await SubCategory.find().populate("category");
    res.status(200).json({
      message: "Sub categories fetched successfully!",
      data: subCategories,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

// Retrieve all sub categories from the database by category.
exports.getByCategory = async (req, res) => {
  try {
    console.log(req.params.id);
    let subCategories = await SubCategory.find({
      category: req.params.id,
    }).populate("category");
    res.status(200).json({
      message: "Sub categories fetched successfully!",
      data: subCategories,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

// Find a single sub category with an id
exports.view = async (req, res) => {
  try {
    let subCategory = await SubCategory.findById(req.params.id).populate(
      "category"
    );
    res.status(200).json({
      message: "Sub category fetched successfully!",
      data: subCategory,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

// Update a sub category by the id in the request
exports.update = async (req, res) => {
  try {
    let updatedSubCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        category: req.body.categoryId,
      },
      { new: true }
    );

    if (!updatedSubCategory) {
      return res.status(404).send({
        message: "Sub category not found with id " + req.params.id,
      });
    } else {
      res.status(200).json({
        data: updatedSubCategory,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err,
    });
  }
};

// Delete a sub-category with the specified id in the request:
exports.delete = async (req, res) => {
  try {
    let subCategory = await SubCategory.findByIdAndRemove(req.params.id);
    if (!subCategory) {
      return res.status(404).send({
        message: "Sub Category not found with id " + req.params.id,
      });
    }
    res.send({ message: "Sub Category deleted successfully!" });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};
