const { Product, validate } = require("../models/product.model");
const { Cart } = require("../models/cart.model");
const Mongoose = require('mongoose')
const ObjectId = Mongoose.Types.ObjectId;
class CartController {
    constructor() { }
    cartFind = async (req, res) => {
        try {
            const carts = await Cart.find({}).populate({
                path: "items.productId",
                select: "title price total"
            });
            return res.json(carts[0]);;

        } catch (e) {
            res.json({ message: "Something went wrong " + e });
        }
    }
    cartAll = async (req, res) => {
        try {
            const carts = await Cart.find({}).populate({
                path: "items.productId",
                select: "title price total"
            });
            return carts[0];

        } catch (e) {
            res.json({ message: "Something went wrong " + e });
        }
    }
    cart = async (req, res) => {
        const {
            productId
        } = req.body;
        const quantity = Number.parseInt(req.body.quantity);
        try {
            let cart = await this.cartAll();
            let productDetails = await Product.findById(productId);
            if (!productDetails) {
                return res.status(500).json({
                    type: "Not Found",
                    msg: "Invalid request"
                })
            }
            //If Cart Exists
            if (cart) {
                // check if index exists
                const indexFound = cart.items.findIndex(item => item.productId._id == productId);
                //this removes an item from the the cart if the quantity is set to zero,We can use this method to remove an item from the list  -------
                if (indexFound !== -1 && quantity <= 0) {
                    cart.items.splice(indexFound, 1);
                    if (cart.items.length == 0) {
                        cart.subTotal = 0;
                    } else {
                        cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                    }
                }
                //check if product exist,just add the previous quantity with the new quantity and update the total price
                else if (indexFound !== -1) {
                    cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                    cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                    cart.items[indexFound].price = productDetails.price
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //Check if Quantity is Greater than 0 then add item to items Array 
                else if (quantity > 0) {
                    cart.items.push({
                        productId: productId,
                        quantity: quantity,
                        price: productDetails.price,
                        total: parseInt(productDetails.price * quantity)
                    })
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //if quantity of price is 0 throw the error 
                else {
                    return res.status(400).json({
                        type: "Invalid",
                        msg: "Invalid request"
                    })
                }
                let data = await cart.save();
                res.status(200).json({
                    type: "success",
                    mgs: "Process Successful",
                    data: data
                })
            }
            // if there is no user with a cart...it creates a new cart and then adds the item to the cart that has been created
            else {
                const cartData = {
                    items: [{
                        productId: productId,
                        quantity: quantity,
                        total: parseInt(productDetails.price * quantity),
                        price: productDetails.price
                    }],
                    subTotal: parseInt(productDetails.price * quantity)
                }
                cart = await Cart.create(cartData)
                // let data = await cart.save();
                res.json(cart);
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something Went Wrong",
                err: err
            })
        }


    };

    emptyCart = async (req, res) => {
        try {
            let cart = await Cart.find({});
            cart.items = [];
            cart.subTotal = 0
            let data = await cart.save();
            res.status(200).json({
                type: "success",
                mgs: "Cart Has been emptied",
                data: data
            })
        } catch (err) {
            res.status(400).json({
                type: "Invalid",
                msg: "Something Went Wrong",
                err: err
            })
        }
    }

}

module.exports = new CartController();