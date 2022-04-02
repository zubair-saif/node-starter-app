const { Product, validate } = require("../models/product.model");
const { Cart } = require("../models/cart.model");
class ProductController {
  constructor() { }

  create = async (req, res) => {

    try {

      const create = await Product.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        inventory: req.body.inventory,
        category: req.body.category,
        image: req.file.path,
        rating: req.body.rating,
        // discount: req.body.discount,
      });
      await create.save();
      res.json({ message: "Successfully created", data: create });
    } catch (e) {
      res.json({ message: "Something went wrong " + e });
    }
  };

  update = async (req, res) => {
    try {
      const update = await Product.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        inventory: req.body.inventory,
        category: req.body.category,
        image: req.body.image,
        discount: req.body.discount,
      });
      await update.save();
      res.json({ message: "Successfully updated" });
    } catch (e) {
      res.json({ message: "Something went wrong " + e });
    }
  };
  getAllProducts = async (req, res) => {
    try {
      const product = await Product.find()
        .populate({
          path: "category",
          select: "name -_id",
        })
        .exec();
      res.send({ message: "Successfully fetched", product });
    } catch (e) {
      res.json({ message: "Something went wrong " + e });
    }
  };

  getSingleProduct = async (req, res) => {
    try {

      let productDetails = await Product.findById(req.params.id);
      if (!productDetails) {
        return res.status(500).json({
          type: "Not Found",
          msg: "Invalid request"
        });
      }
      return productDetails;

    } catch (error) {
      res.json({ message: "Something went wrong " + error });
    }
  }



}



module.exports = new ProductController();
