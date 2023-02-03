const express = require("express");
const router = express.Router();
const passwordReset = require("../controllers/PasswordReset.controller");

// Forgot password
router.post("/forget", passwordReset.forgotPassword);
// Reset password
router.post(
  "/resetPassword/:email/:passwordResetToken",
  passwordReset.resetPassword
);

module.exports = router;
