const { Product, validate } = require("../models/product.model");
const { Cart } = require("../models/cart.model");

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
        try {
            const productId = req.body.productId;
            const quantity = Number.parseInt(req.body.quantity);
            let productDetails = await Product.findById(productId);
            if (!productDetails) {
                return res.status(500).json({
                    type: "Not Found",
                    msg: "Invalid request"
                })
            }
            const carts = await this.cartAll();
            if (carts) {
                const indexFound = carts.items.findIndex(item => item.productId == productId);
                /**
                 *  this removes an item from the the cart if the quantity is set to zero,
                 *  We can use this method to remove an item from the list 
                 */
                if (indexFound !== -1 && quantity <= 0) {
                    carts.items.splice(indexFound, 1);
                    if (carts.items.length == 0) {
                        carts.subTotal = 0;
                    } else {
                        carts.subTotal = carts.items.map(item => item.total).reduce((acc, next) => acc + next);
                    }
                }

                /**
                 * check if product exist,just add the previous quantity with the new quantity and update the total price
                */
                else if (indexFound !== -1) {
                    carts.items[indexFound].quantity = carts.items[indexFound].quantity + quantity;
                    carts.items[indexFound].total = carts.items[indexFound].quantity * productDetails.price;
                    carts.items[indexFound].price = productDetails.price
                    carts.subTotal = carts.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //Check if Quantity is Greater than 0 then add item to items Array ----
                else if (quantity > 0) {
                    carts.items.push({
                        productId: productId,
                        quantity: quantity,
                        price: productDetails.price,
                        total: parseInt(productDetails.price * quantity)
                    })
                    carts.subTotal = carts.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //if quantity of price is 0 throw the error
                // else {
                //     return res.status(400).json({
                //         type: "Invalid",
                //         msg: "Invalid request"
                //     })
                // }
                let data = await carts.save();
                res.status(200).json({
                    type: "success",
                    mgs: "Process Successful",
                    data: data
                });
            }
            //if there is no user with a cart...it creates a new cart and then adds the item to the cart that has been created

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
                let cartItem = await Cart.create(cartData)
                // let data = await cart.save();
                res.json(cartItem);
            }

        } catch (e) {
            res.json({ message: "Something went wrong " + e });
        }

    };

    emptyCart = async (req, res) => {
        try {
            let cart = await this.cartFind();
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