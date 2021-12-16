const mongoose = require("mongoose");
const joi = require("joi");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description:{
        type: String,
    }
  },
  { versionKey: false, timestamps: true }
);

const Category = mongoose.model("Category", schema);
// module.exports.validate = validate;
module.exports.Category = Category;
