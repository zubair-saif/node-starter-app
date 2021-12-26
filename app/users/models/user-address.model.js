const mongoose = require("mongoose");
const joi = require("joi");

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    zipCode: {
      type: Number,
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false
    },
    updated: Date,
    created: {
      type: Date,
      default: Date.now
    }
  },
  // { versionKey: false, timestamps: true }
);

const UsersAddress = mongoose.model("Address", schema);
module.exports.validate = validate;
module.exports.UsersAddress = UsersAddress;
