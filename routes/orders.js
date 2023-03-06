const express = require("express");
const router = express.Router();

const { verifyToken, adminCheck } = require("../middleware/JWT&Admin");

const {
  getAllOrders,
  postOrder,
  updateOrder,
  deleteOrder,
  getSingleOrder,
} = require("../controllers/orders");

router.post("/orders/:productOrderId", verifyToken, postOrder);
router.get("/orders", verifyToken, getAllOrders);
router.get("/orders/:orderId", verifyToken, getSingleOrder);

//probabil doar admin-ul ar putea sa updateze si sa stearga o comanda
router.delete("/orders/:orderId", verifyToken, adminCheck, deleteOrder);
router.put("/orders/:orderId", verifyToken, adminCheck, updateOrder);
module.exports = router;
