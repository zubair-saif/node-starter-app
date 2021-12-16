const { Category, validate } = require("../models/category.model");

exports.create = async (req, res) => {
  try {
    const create = await Category.create({
      name: req.body.name,
      description: req.body.description,
    });
    await create.save();
    res.json({ message: "Successfully created" });
  } catch (e) {
    res.json({ message: "Something went wrong " + e });
  }
};

exports.getByCategory = async (req, res) => {
  try {
    const create = await Category.find({});
    // await create.save();
    res.json({ message: "Successfully ", create });
  } catch (e) {
    res.json({ message: "Something went wrong " + e });
  }
};

exports.getAllCategoryProduct = async (req, res) => {
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
          products: "$products",
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
