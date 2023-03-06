const express = require("express");
const router = express.Router();

const { verifyToken, adminCheck } = require("../middleware/JWT&Admin");

const {
  getAllCustomers,
  deleteCustomer,
  postCustomer,
  getCustomer,
  updateCustomer,
} = require("../controllers/customer");

router.post("/customers", verifyToken, postCustomer);

// sincer nu stiu de ce i-ar trebui unui customer asa ceva deci le ascund
// pastrez doar get all pt request-uri

router.get("/customers", getAllCustomers);
router.route("/customers/:id").get(getCustomer);
router.route("/customers/:id").delete(verifyToken, adminCheck, deleteCustomer);
router.route("customers/:id").put(verifyToken, updateCustomer);
// doar adminii sterg clientul si doar clientul isi poate updata profilul
module.exports = router;
