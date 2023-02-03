const mongoose = require("mongoose");

const PasswordResetSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    passwordResetToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("passwordReset", PasswordResetSchema);
