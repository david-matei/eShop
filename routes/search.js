const express = require("express");
const router = express.Router();

const searchForProducts = require("../controllers/search");
const { verifyToken } = require("../middleware/JWT&Admin");

router.get("/product-search", verifyToken, searchForProducts);

module.exports = router;
