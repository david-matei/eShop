const express = require("express");
const router = express.Router();

const { payment } = require("../controllers/product-orders");

router.route("/payment").post(payment);

module.exports = router;
