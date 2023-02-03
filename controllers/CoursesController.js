const Course = require("../models/Course");
const User = require("../models/User");
const { uploadFile, getUrl } = require("../utils/fileUpload");

// Create and Save a new course
exports.create = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    let url = await uploadFile(req.files.thumbnail);

    const course = new Course({
      name,
      description,
      price,
      thumbnail: req.files.thumbnail.name,
      category: req.body.categoryId,
      subCategory: req.body.subCategoryId == "" ? null : req.body.subCategoryId,
    });
    const newCourse = await course.save();
    res.status(200).json({
      message: "Course created successfully!",
      data: newCourse,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

// Unlock course
exports.unlock = async (req, res) => {
  const { chapter, user } = req.body;

  try {
    const result = await User.findOne({ _id: user });
    const found = result.chapters.find((element) => element == chapter);
    if (found) {
      res.status(400).json({
        error: "Chapter already unlocked!",
      });
      return;
    }

    await User.findByIdAndUpdate(
      user,
      { $push: { chapters: chapter } },
      { new: true, useFindAndModify: false }
    );

    res.status(200).json({
      message: "Chapter unlocked successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Lock course
exports.lock = async (req, res) => {
  const { chapter, user } = req.body;

  try {

    await User.findByIdAndUpdate(
      user,
      { $pull: { chapters: chapter } },
      { new: true, useFindAndModify: false }
    );

    res.status(200).json({
      message: "Chapter locked successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Check Lock or Unlock course
exports.checkLockOrUnlock = async (req, res) => {
  const { chapter, user } = req.body;

  try {
    const result = await User.findOne({ _id: user });
    const found = result.chapters.find((element) => element == chapter);
    if (found) {
      res.status(200).json({
        message: "Chapter already unlocked!",
      });
      return;
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Retrieve all courses from the database.
exports.index = async (req, res) => {
  try {
    let courses = await Course.find()
      .populate("category")
      .populate("subCategory");
    res.status(200).json({
      message: "Courses fetched successfully!",
      data: courses,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

// Retrieve all courses from the database by category.
exports.getByCategory = async (req, res) => {
  try {

    let courses = await Course.find({ category: req.params.id });
    const processedCourses = [];

    for (let i = 0; i < courses.length; i++) {
      let url = await getUrl(courses[i].thumbnail);
      courses[i].thumbnail = url;
      processedCourses.push(courses[i]);
    }

    res.status(200).json({
      message: "Courses fetched successfully!",
      data: processedCourses,
    });
  } catch (err) {
    console.log('error', err)
    res.status(400).json({
      error: err,
    });
  }
};

// Find a single course with an id
exports.view = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);
    res.status(200).json({
      message: "Course fetched successfully!",
      data: course,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

// Update a course by the id in the request
exports.update = async (req, res) => {
  try {
    let updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).send({
        message: "Course not found with id " + req.params.id,
      });
    } else {
      res.status(200).json({
        data: updatedCourse,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err,
    });
  }
};

// Delete a course with the specified id in the request
exports.delete = async (req, res) => {
  try {
    let course = await Course.findByIdAndRemove(req.params.id);
    if (!course) {
      return res.status(404).send({
        message: "Course not found with id " + req.params.id,
      });
    }
    res.send({ message: "Course deleted successfully!" });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};
