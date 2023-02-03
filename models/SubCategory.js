const mongoose = require("mongoose");

const SubCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: { type: mongoose.Types.ObjectId, ref: "category" },
}, {
  timestamps: true
});

module.exports = mongoose.model("subCategory", SubCategorySchema);