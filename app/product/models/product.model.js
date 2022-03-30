const mongoose = require("mongoose");
// const joi = require("joi");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
    },
    image: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    taxable: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    qty: {
      type: Number,
      //   ref: "Inventory",
    },
    // discount: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Discount",
    //   },
    updated: Date,
    created: {
      type: Date,
      default: Date.now,
    },
  }
  // { versionKey: false, timestamps: true }
);

// function validate(users) {
//   const schema = joi.object({
//     name: joi.string().required(),
//     email: joi.string().required(),
//     password: joi.string().required(),
//     bio: joi.string().optional(),
//     profilePic: joi.string().optional(),
//   });
//   return schema.validate(users);
// }

const Product = mongoose.model("Product", schema);
// module.exports.validate = validate;
module.exports.Product = Product;
