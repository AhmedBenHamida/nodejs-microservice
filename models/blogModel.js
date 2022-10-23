const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    videoUrl: {
      type: String,
    },
    imageUrl: {
      type: String,
    },

    content: {
      type: String,
      maxlength: 500,
    },
    hidden: {
      type: Boolean,
    },
    tags: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("blogs", BlogSchema);
