const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/JWT&Admin");
const payment = require("../controllers/payment");

router.post("/product-orders/payment/:id", verifyToken, payment);

module.exports = router;
