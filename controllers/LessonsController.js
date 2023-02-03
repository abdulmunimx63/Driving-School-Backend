const Lesson = require("../models/Lesson");
const Chapter = require("../models/Chapter");
const {
  uploadFile,
  uploadFileFromStorage,
  getUrl,
} = require("../utils/fileUpload");
const thumbsupply = require("thumbsupply");

// Create and Save a new lesson
exports.create = async (req, res) => {
  const { name, description } = req.body;

  try {
    // let result = await uploadFile(req.files.video);

    // let url = await getUrl(req.files.video.name);

    // thumbsupply
    //   .generateThumbnail(url, {
    //     size: thumbsupply.ThumbSize.MEDIUM,
    //     timestamp: "10%",
    //     forceCreate: true,
    //     mimetype: "video/mp4",
    //   })
    //   .then(async (thumb) => {
    //     let result = await uploadFileFromStorage(
    //       thumb,
    //       req.files.video.name + ".jpeg"
    //     );
    //   })
    //   .catch((err) => {
    //     console.log("error", err);
    //   });

    const lesson = new Lesson({
      name,
      description,
      video: req.body.video,
      thumbnail: req.body.video + ".jpeg",
      chapter: req.body.chapterId,
    });
    const newLesson = await lesson.save();

    await Chapter.findByIdAndUpdate(
      req.body.chapterId,
      { $push: { lessons: newLesson._id } },
      { new: true, useFindAndModify: false }
    );

    res.status(200).json({
      message: "Lesson created successfully!",
      data: newLesson,
    });
  } catch (error) {
    console.log("errorrrrr: ", error);
    res.status(400).json({
      error: error,
    });
  }
};

// Retrieve all lessons from the database.
exports.index = async (req, res) => {
  try {
    let lessons = await Lesson.find().populate({
      path: "chapter",
      populate: {
        path: "course",
      },
    });

    const processedLessons = [];

    for (let i = 0; i < lessons.length; i++) {
      let url = await getUrl(lessons[i].video);
      let thumb = await getUrl(lessons[i].thumbnail);
      lessons[i].video = url;
      lessons[i].thumbnail = thumb;
      processedLessons.push(lessons[i]);
    }

    res.status(200).json({
      message: "Lessons fetched successfully!",
      data: processedLessons,
    });
  } catch (err) {
    console.log("error", err);
    res.status(400).json({
      error: err,
    });
  }
};

// Find a single lesson with an id
exports.view = async (req, res) => {
  try {
    let lesson = await Lesson.findById(req.params.id).populate({
      path: "chapter",
      populate: {
        path: "course",
      },
    });
    res.status(200).json({
      message: "Lesson fetched successfully!",
      data: lesson,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

// Update a lesson by the id in the request
exports.update = async (req, res) => {
  try {
    let update = {};
    if (req.body.name) update.name = req.body.name;
    if (req.body.description) update.description = req.body.description;
    if (req.body.video) update.video = req.body.video;
    if (req.body.video) update.thumbnail = req.body.video + ".jpeg";
    if (req.body.chapter) update.chapter = req.body.chapterId;

    let updatedLesson = await Lesson.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    if (!updatedLesson) {
      return res.status(404).send({
        message: "Lesson not found with id " + req.params.id,
      });
    } else {
      res.status(200).json({
        data: updatedLesson,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err,
    });
  }
};

// Delete a lesson with the specified id in the request
exports.delete = async (req, res) => {
  try {
    let lesson = await Lesson.findByIdAndRemove(req.params.id);
    if (!lesson) {
      return res.status(404).send({
        message: "Lesson not found with id " + req.params.id,
      });
    }
    res.send({ message: "Lesson deleted successfully!" });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};
