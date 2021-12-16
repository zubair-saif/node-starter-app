const mongoose = require("mongoose");
const joi = require("joi");

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required:true
    },
    telephone: {
      type: String,
    },
    mobile: {
        type: String,
      },
  },
  { versionKey: false, timestamps: true }
);

const UsersAdress = mongoose.model("User_Adress", schema);
module.exports.validate = validate;
module.exports.UsersAdress = UsersAdress;
