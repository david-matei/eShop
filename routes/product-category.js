const express = require("express");
const router = express.Router();

const {
  getAll,
  post,
  getOne,
  put,
  remove,
} = require("../controllers/product-category");
const { verifyToken, adminCheck } = require("../middleware/JWT&Admin");
router.get("/categories", verifyToken, adminCheck, getAll);
router.post("/categories", verifyToken, adminCheck, post);
router.put("/categories", verifyToken, adminCheck, put);
router.delete("/categories", verifyToken, adminCheck, remove);
router.get("/categories", verifyToken, adminCheck, getOne);

module.exports = router;
