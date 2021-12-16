const mongoose = require("mongoose");
const joi = require("joi");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description:{
        type: String,
    },
    discount:{
        type: Number,
    },
    active:{
        type:Boolean
    }
    
  },
  { versionKey: false, timestamps: true }
);

const Discount = mongoose.model("Discount", schema);
// module.exports.validate = validate;
module.exports.Category = Discount;
