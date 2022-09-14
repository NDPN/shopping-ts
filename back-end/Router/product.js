const express = require("express");
const { upload } = require("../common-middleware/index.js");
const {
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  uploadImg,
  getOneProduct,
} = require("../Operetion/Product.js");

const router = express.Router();

router.post("/product/get", upload.none(), getProduct);

router.post("/product/create", upload.single("Img"), createProduct);

router.post("/product/delete", upload.none(), deleteProduct);

router.post("/product/update", upload.none(), updateProduct);

router.post("/product/uploadImg", upload.single("Img"), uploadImg);

router.post("/product/getOne", upload.none(), getOneProduct);

module.exports = router;
