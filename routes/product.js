const express = require("express");
const router = express.Router();
const { verifyToken, adminCheck } = require("../middleware/JWT&Admin");
const {
  getAll,
  getAllFromCategory,
  getOne,
  post,
  remove,
  put,
} = require("../controllers/product");

router.get("/product", verifyToken, getAll);
router.get("/product/category/:categoryId", verifyToken, getAllFromCategory);
router.get("/product/:id", verifyToken, getOne);
// doar adminii au voie sa posteze produse, asta nu e OLX :)
router.post("/product", verifyToken, adminCheck, post);
router.delete("/product/:id", verifyToken, adminCheck, remove);
router.put("/product/:id", verifyToken, adminCheck, put);
module.exports = router;
