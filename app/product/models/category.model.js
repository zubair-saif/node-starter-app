const mongoose = require("mongoose");
const joi = require("joi");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    image: {
      contentType: String,
      data: Buffer,
    },
    description:{
        type: String,
        trim: true,
    },
    isActive: {
      type: Boolean,
      default: true
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
      }
    ],
    updated: Date,
    created: {
      type: Date,
      default: Date.now
    }
  },
  // { versionKey: false, timestamps: true }
);

const Category = mongoose.model("Category", schema);
// module.exports.validate = validate;
module.exports.Category = Category;
