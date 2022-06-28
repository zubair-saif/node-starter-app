const mongoose = require("mongoose");
const joi = require("joi");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", schema);
module.exports.Category = Category;
