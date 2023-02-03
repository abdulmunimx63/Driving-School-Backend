const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    surName: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    dob: {
      type: String,
      required: false,
    },
    licenseCategory: {
      type: String,
      required: false,
    },
    nativeLanguage: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      default: null,
    },
    contactNo: {
      type: String,
      required: false,
    },
    whatsappNo: {
      type: String,
      required: false,
    },
    role: {
      type: Number,
      default: 2,
    },
    password: {
      type: String,
      required: false,
      default: null,
    },
    isActive: {
      type: Number,
      default: 1
    },
    profilePhoto: {
      type: String,
      required: false,
      default: null,
    },
    chapters: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
