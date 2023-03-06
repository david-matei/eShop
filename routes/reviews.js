const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/JWT&Admin");
const {
  getAllProductReviews,
  getReviewsByRating,
  deleteReview,
  putReview,
  postReview,
} = require("../controllers/reviews");

router.get("/products/reviews", getAllProductReviews);
router.get("/products/reviews/ratings/:productId/:rating", getReviewsByRating);
router.delete("/products/reviews/:id", verifyToken, deleteReview);
router.post("/products/reviews", verifyToken, postReview);
router.put("/products/reviews/:id", verifyToken, putReview);

module.exports = router;
