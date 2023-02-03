const Chapter = require("../models/Chapter");
const User = require("../models/User");
const { getUrl } = require("../utils/fileUpload");

// Create and Save a new chapter
exports.create = async (req, res) => {
  const { name, description } = req.body;

  try {
    const chapter = new Chapter({
      name,
      description,
      course: req.body.courseId,
    });
    const newChapter = await chapter.save();
    res.status(200).json({
      message: "Chapter created successfully!",
      data: newChapter,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

// Retrieve all chapters from the database.
exports.index = async (req, res) => {
  try {
    let chapters = await Chapter.find().populate("course");
    res.status(200).json({
      message: "Chapters fetched successfully!",
      data: chapters,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

// Retrieve all chapters with lessons from the database.
exports.getAllChaptersWithLessonsByCourse = async (req, res) => {
  try {
    let chapters = await Chapter.find({ course: req.params.id })
      .populate("course")
      .populate("lessons");

    const processedChapters = [];
    const result = await User.findOne({ _id: req.user.id });

    for (let i = 0; i < chapters.length; i++) {
      const found = result.chapters.find(
        (element) => element == chapters[i]._id
      );

      if (found) {
        chapters[i].unlocked = true;
      } else {
        chapters[i].unlocked = false;
      }
      for (let j = 0; j < chapters[i].lessons.length; j++) {
        let thumb = await getUrl(chapters[i].lessons[j].thumbnail);
        chapters[i].lessons[j].video = chapters[i].lessons[j].video;
        chapters[i].lessons[j].thumbnail = thumb;
      }
      processedChapters.push(chapters[i]);
    }

    res.status(200).json({
      message: "Chapters fetched successfullyyyy!",
      data: chapters,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// Find a single chapter with an id
exports.view = async (req, res) => {
  try {
    let chapter = await Chapter.findById(req.params.id).populate("course");
    res.status(200).json({
      message: "Campaign fetched successfully!",
      data: chapter,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

// Update a chapter by the id in the request
exports.update = async (req, res) => {
  try {
    let updatedChapter = await Chapter.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        course: req.body.courseId,
      },
      { new: true }
    );

    if (!updatedChapter) {
      return res.status(404).send({
        message: "Chapter not found with id " + req.params.id,
      });
    } else {
      res.status(200).json({
        data: updatedChapter,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err,
    });
  }
};

// Delete a chapter with the specified id in the request
exports.delete = async (req, res) => {
  try {
    let chapter = await Chapter.findByIdAndRemove(req.params.id);
    if (!chapter) {
      return res.status(404).send({
        message: "Chapter not found with id " + req.params.id,
      });
    }
    res.send({ message: "Chapter deleted successfully!" });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

// Retrieve all chapters by lesson from the database.
exports.getAllChaptersByCourse = async (req, res) => {
  try {
    let chapters = await Chapter.find({ course: req.params.id })
      .populate("course")
      .populate("lessons");

    res.status(200).json({
      message: "Chapters fetched successfully!",
      data: chapters,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
