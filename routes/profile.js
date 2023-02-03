const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const profileController = require("../controllers/ProfileController");

router.put("/updateProfile", auth, profileController.updateProfile);
router.put("/updatePassword", auth, profileController.updatePassword);
router.put("/updateProfilePhoto", auth, profileController.updateProfilePhoto);

module.exports = router;
