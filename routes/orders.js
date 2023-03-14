const express = require("express");
const router = express.Router();

const { verifyToken, adminCheck } = require("../middleware/JWT&Admin");

const {
  getAllOrders,
  updateOrder,
  deleteOrder,
  getSingleOrder,
} = require("../controllers/orders");

//un nou order va fi creat automat in controllers/product-orders in functia "postProductOrders"
//din cauza asta nu exista ruta pentru a crea un nou product order
router.get("/orders", verifyToken, getAllOrders);
router.get("/orders/:orderId", verifyToken, getSingleOrder);

//probabil doar admin-ul ar putea sa updateze si sa stearga o comanda
router.delete("/orders/:orderId", verifyToken, adminCheck, deleteOrder);
router.put("/orders/:orderId", verifyToken, adminCheck, updateOrder);
module.exports = router;
