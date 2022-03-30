const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller");
const categoryController = require("../controller/category.controller");
const cartController = require("../controller/cart.controller");
const multer = require("multer");
let storage = multer.diskStorage({
  destination: "./public/program",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
let upload = multer({ storage: storage }).single("programIcon");

router.post("/create-product", upload, productController.create);
router.post("/create-category", categoryController.create);
router.get("/all-category", categoryController.getByCategory);
router.get("/get-allcategory-product", categoryController.getAllCategoryProduct);
router.get("/", productController.getAllProducts);

router.post("/addtocart", cartController.cart);
router.get("/get-cart", cartController.cartFind);
router.get("/emptycart", cartController.emptyCart);

module.exports = router;
