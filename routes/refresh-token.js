const express = require("express");
const router = express.Router();
const { accessToken } = require("../middleware/JWT&Admin");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const refreshAccessToken = async (req, res) => {
  // in user login function am denumit cookie-ul nostru "ert"
  const token = req.cookies.ert;
  console.log(token);
  if (!token) {
    return res.json({ ok: false, accessToken: "" });
  }
  let payload = null;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.json({ error: error, ok: false, accessToken: "" });
  }
  //token-ul e valid
  const user = await User.findOne({ _id: payload.userId });
  if (!user) {
    return res.json({ error: error.message, ok: false, accessToken: "" });
  }
  return res.json({
    ok: true,
    accessToken: accessToken(
      { userId: user._id, isAdmin: user.isAdmin },
      "15m"
    ),
  });
};

router.post("/refreshToken", refreshAccessToken);
module.exports = router;
