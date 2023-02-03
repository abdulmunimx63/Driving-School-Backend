const express = require("express");
const router = express.Router();
const videosWatchTime = require("../controllers/videosWatchTimeController");

router.post("/create", videosWatchTime.create);
router.get("/getVideosByUser/:user", videosWatchTime.getVideosByUser);

module.exports = router;
