const VideosWatchTime = require("../models/VideosWatchTime");

exports.create = async (req, res) => {
  const { videoID, userID, time } = req.body;

  const videoWatchTime = await VideosWatchTime.findOne({
    $and: [{ lesson: videoID }, { user: userID }],
  })
    .sort({ $natural: -1 })
    .limit(1);

  if (videoWatchTime) {
    console.log("video watch time", videoWatchTime.time);
    console.log("incomming watch time", time);
  }

  try {
    if (videoWatchTime && videoWatchTime.time < time) {
      const updatedVideoWatchTime = await VideosWatchTime.findByIdAndUpdate(
        videoWatchTime._id,
        {
          time: time,
        },
        { new: true }
      );

      res.status(200).json({
        message: "Video watch time updated successfully!",
        data: updatedVideoWatchTime,
      });
    } else {
      const newVideoWatchTime = new VideosWatchTime({
        time: time,
        lesson: videoID,
        user: userID,
      });
      const newCreatedVideoWatchTime = await newVideoWatchTime.save();
      res.status(200).json({
        message: "Video watch time created successfully!",
        data: newCreatedVideoWatchTime,
      });
    }
  } catch (error) {
    console.log("errorrrrr: ", error);
    res.status(400).json({
      error: error,
    });
  }
};

exports.getVideosByUser = async (req, res) => {
  try {
    let video = await VideosWatchTime.find({ user: req.params.user })
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
