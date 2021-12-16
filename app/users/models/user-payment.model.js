const mongoose = require("mongoose");
const joi = require("joi");

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    paymentType: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
    },
    accountNumber: {
      type: Number,
      required: true,
    },
    expiry: {
      type: Date,
      required:true
    },
   
    
  },
  { versionKey: false, timestamps: true }
);

const UsersPayment = mongoose.model("User_Payment", schema);
module.exports.validate = validate;
module.exports.UsersPayment = UsersPayment;
