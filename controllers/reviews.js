const Reviews = require("../models/reviews");

const getAllProductReviews = async (_req, res) => {
  const reviews = await Reviews.find({});
  if (reviews.length === 0) {
    res.json({ message: "Product does not have any reviews" });
  } else {
    res.json(reviews);
  }
};

const getReviewsByRating = async (req, res) => {
  try {
    const reviews = await Reviews.find({
      productId: req.params.productId,
      rating: req.params.rating,
    });
    if (reviews.length === 0) {
      throw new Error(`No reviews with ${req.params.rating} stars found`);
    } else {
      res.json(reviews);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};
// authenticated users only
const deleteReview = async (req, res) => {
  try {
    const deleteReview = await Reviews.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!deleteReview) {
      throw new Error("Review does not exist");
    } else {
      return res.json({ message: "Review deleted successfully" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const postReview = async (req, res) => {
  try {
    const { productId, desc, title, rating } = req.body;
    if (!productId || !desc || !title || !rating) {
      throw new Error("Missing information");
    }
    const review = await Reviews.create({
      productId,
      userId: req.user.userId,
      desc,
      title,
      rating,
    });
    res.json({ message: "Review created successfully", review });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const putReview = async (req, res) => {
  try {
    const { productId, desc, title, rating } = req.body;
    if (!productId || !desc || !title || !rating) {
      throw new Error("Missing information");
    }
    const review = await Reviews.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { $set: req.body }
    );
    res.json({ message: "Review updated successfully", Review: review });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  putReview,
  postReview,
  deleteReview,
  getAllProductReviews,
  getReviewsByRating,
};
