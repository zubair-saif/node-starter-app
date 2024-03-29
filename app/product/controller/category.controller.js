const { Category, validate } = require("../models/category.model");

class CategoryController {
  constructor() { }

  create = async (req, res) => {
    try {
      const create = await Category.create({
        name: req.body.name,
        description: req.body.description,
      });
      await create.save();
      res.json({ data: create });
    } catch (e) {
      res.json({ message: "Something went wrong " + e });
    }
  };

  getByCategory = async (req, res) => {
    try {
      const getByCategory = await Category.find({}).limit(10).exec();
      res.json({ getByCategory });
    } catch (e) {
      res.json({ message: "Something went wrong " + e });
    }
  };

  getAllCategoryProduct = async (req, res) => {
    try {
      const categories = await Category.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "category",
            as: "products",
          },
        },
        {
          $project: {
            _id: 1,
            category: 1,
            totalProducts: { $size: "$products" },
            products: "$products._id",
          },
        },
      ]);
      if (!categories) {
        res.json({ message: "item not found" });
      }
      return res.json({ data: categories });
    } catch (e) {
      res.json({ message: "Something went wrong " + e });
    }
  };
}

module.exports = new CategoryController();
