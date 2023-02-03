const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    unlocked: {
      type: Boolean,
      required: false,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    category: { type: mongoose.Types.ObjectId, ref: "category" },
    subCategory: { type: mongoose.Types.ObjectId, ref: "subCategory" },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("course", CourseSchema);
