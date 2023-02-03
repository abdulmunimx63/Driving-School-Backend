const User = require("../models/User");
const PasswordReset = require("../models/PasswordReset");
const { sendEmail } = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

exports.forgotPassword = async (req, res) => {
  try {
    console.log("Email:", req.body.email);
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user != null) {
      const resetToken = crypto.randomBytes(8).toString("hex");

      const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      const allPasswordReset = await PasswordReset.remove({
        email: req.body.email,
      });

      const passwordReset = new PasswordReset({
        email: req.body.email,
        passwordResetToken: hashedToken,
      });

      const newPasswordReset = passwordReset.save();

      sendEmail(req.body.email, "Password reset", hashedToken);
    }
    res.status(200).send({
      status: "success",
      message:
        "If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const passwordReset = await PasswordReset.findOne({
      $and: [
        { email: req.params.email },
        { passwordResetToken: req.params.passwordResetToken },
      ],
    });

    if (!passwordReset) {
      return res.status(500).send({
        status: "false",
        message: "Verification link expired.",
      });
    }

    const user = await User.findOne({
      email: req.params.email,
    });

    if (user) {
      await PasswordReset.findOneAndRemove({
        email: req.params.email,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);

      await user.save();

      res.status(200).send({
        status: "success",
        message: "Password updated successfully",
      });
    } else {
      res.status(500).send({
        status: "false",
        message: "User not found.",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
