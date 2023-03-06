const express = require("express");
const router = express.Router();
// si asta trebuie updatat

const updateIsAdmin = require("../controllers/administrator");
const { verifyToken, adminCheck } = require("../middleware/JWT&Admin");
router.route("/admins").put(verifyToken, adminCheck, updateIsAdmin);

module.exports = router;
