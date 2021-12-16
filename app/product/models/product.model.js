const mongoose = require("mongoose");
const joi = require("joi");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    itemImage: {
        type: String,
      },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    inventory: {
      type: Number,
    //   ref: "Inventory",
    },
    // discount: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Discount",
    //   },
    
  },
  { versionKey: false, timestamps: true }
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
