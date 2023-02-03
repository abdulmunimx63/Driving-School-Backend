const Video = require("../models/Video");

exports.create = async (req, res) => {
  const { videoID, userID } = req.body;
  let video = await Video.findOne({ lesson: videoID });
  try {
    if (video) {
      const updatedVideo = await Video.findByIdAndUpdate(
        video._id,
        {
          count: video.count + 1,
        },
        { new: true }
      );
      res.status(200).json({
        message: "Video updated successfully!",
        data: updatedVideo,
      });
    } else {
      const video = new Video({
        lesson: videoID,
        user: userID,
      });
      const newVideo = await video.save();
      res.status(200).json({
        message: "Video created successfully!",
        data: newVideo,
      });
    }
  } catch (error) {
    console.log("errorrrrr: ", error);
    res.status(400).json({
      error: error,
    });
  }
};

exports.view = async (req, res) => {
  console.log(req.params.id);
  try {
    let video = await Video.findOne({ videoID: req.params.id });
    res.status(200).json({
      message: "Video updated successfully!",
      data: video,
    });
  } catch (error) {
    console.log("errorrrrr: ", error);
    res.status(400).json({
      error: error,
    });
  }
};

exports.getVideoViewsByUser = async (req, res) => {
  console.log(req.user);
  try {
    let videos = await Video.find({ user: req.user.id })
      .populate("lesson")
      .populate("user");

    res.status(200).json({
      message: "Video updated successfully!",
      data: videos,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

exports.getLockedVideosByUser = async (req, res) => {
  try {
    let video = await Video.find({ user: req.params.user, count: { $gte: 4 } })
      .populate({
        path: "lesson",
        populate: {
          path: "chapter",
          populate: {
            path: "course",
          },
        },
      })
      .populate("user");

    res.status(200).json({
      message: "Video updated successfully!",
      data: video,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

exports.unlockWatchedVideo = async (req, res) => {
  try {
    let video = await Video.findOne({ _id: req.params.id });

    console.log("db id: ", video);

    let updatedVideo = await Video.findByIdAndUpdate(
      video._id,
      {
        count: 0,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Video updated successfully!",
      data: updatedVideo,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      error: error,
    });
  }
};

exports.viewuser = async (req, res) => {
  console.log(req.params.id);
  try {
    let video = await Video.findOne({ userID: req.params.id });
    console.log(video);
    res.status(200).json({
      message: "Video updated successfully!",
      data: video,
    });
  } catch (error) {
    console.log("errorrrrr: ", error);
    res.status(400).json({
      error: error,
    });
  }
};
