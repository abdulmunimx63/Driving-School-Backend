const express = require("express");
const router = express.Router();
const videos = require("../controllers/VideosController");
const auth = require("../middlewares/auth");

// Create a new lesson
router.post("/create", videos.create);
router.get("/view/:id", videos.view);
router.get("/viewuser/:id", videos.view);
router.get("/getVideoViewsByUser", auth, videos.getVideoViewsByUser);
router.get("/getLockedVideosByUser/:user", videos.getLockedVideosByUser);
router.get("/unlockWatchedVideo/:id", videos.unlockWatchedVideo);

module.exports = router;
