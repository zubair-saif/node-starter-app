const { Product, validate } = require("../models/product.model");

class ProductController {
  constructor() {}

  create = async (req, res) => {
    console.log("req.body", req);
    const url = req.protocol + "://" + req.get("host");
    try {
      const create = await Product.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        inventory: req.body.inventory,
        category: req.body.category,
        image: url + "/public/program/" + req.file.filename,
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
      const product = await Product.find({});
      res.send({ message: "Successfully fetched", data: product });
    } catch (e) {
      res.json({ message: "Something went wrong " + e });
    }
  };
}

module.exports = new ProductController();
