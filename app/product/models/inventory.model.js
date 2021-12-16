const mongoose = require("mongoose");
const joi = require("joi");

const schema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true }
);

const Inventory = mongoose.model("Inventory", schema);
// module.exports.validate = validate;
module.exports.Inventory = Inventory;
