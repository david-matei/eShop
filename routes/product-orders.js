const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/JWT&Admin");

const {
  postProductOrder,
  getProductOrders,
  getSingleOrder,
  deleteOrder,
  updateOrder,
} = require("../controllers/product-orders");

router.post("/product-orders", verifyToken, postProductOrder);
router.get("/product-orders", verifyToken, getProductOrders);
router.get("/product-orders/:productOrderId", verifyToken, getSingleOrder);
router.delete("/product-orders/:productOrderId", verifyToken, deleteOrder);
router.put("/product-orders/:productOrderId", verifyToken, updateOrder);
module.exports = router;
