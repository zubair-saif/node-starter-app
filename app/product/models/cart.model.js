const mongoose = require("mongoose");
const joi = require("joi");

const itemSchema = new mongoose.Schema({
  _id: false,
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity can not be less then 1.']
  },
  price: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true,
  }
}, {
  timestamps: false
});
const CartSchema = new mongoose.Schema({
  items: [itemSchema],
  subTotal: {
    default: 0,
    type: Number
  }
}, {
  timestamps: true
})
const Cart = mongoose.model("Cart", CartSchema);
// module.exports.validate = validate;
module.exports.Cart = Cart;
