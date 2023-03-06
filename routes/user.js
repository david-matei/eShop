const express = require("express");
const router = express.Router();

const { verifyToken, adminCheck } = require("../middleware/JWT&Admin");
const {
  getAllUsers,
  updateUser,
  getUser,
  deleteUser,
  register,
  ifVerified,
  login,
  logout,
} = require("../controllers/user");

router.get("/user", verifyToken, getAllUsers);
router.get("/user/:id", verifyToken, getUser);
router.put("/user/:id", verifyToken, updateUser);
router.delete("/user/:id", verifyToken, adminCheck, deleteUser);

// AUTHENTICATION ROUTES
router.post("/user/register", register);
router.post("/user/login", login);
router.post("/user/logout", verifyToken, logout);

// adaugat asa doar pentru ca e mai diferit fata de cele de sus
router.get("/verify/:token", ifVerified);

module.exports = router;
