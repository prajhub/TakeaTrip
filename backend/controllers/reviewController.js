const Review = require("../model/reviews");
const User = require("../model/user");

const createReview = async (req, res) => {
  try {
    const { reviewerName, reviewerid, rating, description, businessId } =
      req.body;

    const user = await User.findById(reviewerid);
    if (!user.hasBookedRoom) {
      return res
        .status(400)
        .json({ error: "You need to book a room before posting a review." });
    }

    const review = new Review({
      reviewerName,
      rating,
      reviewerid,
      description,
      business: businessId,
    });

    const savedReview = await review.save();

    user.reviews.push(savedReview._id);
    await user.save();

    res.status(201).json(savedReview);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const getReviewsByUserId = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the user ID is provided in the request params

    // Find the reviews associated with the given user ID
    const reviews = await Review.find({ reviewerid: userId });

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    // Find the review document by its ID
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Delete the review
    await review.remove();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const getReviewsByBusiness = async (req, res) => {
  try {
    const businessId = req.params.id;

    // Find all the reviews for the given business ID
    const reviews = await Review.find({ business: businessId });

    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const updateReview = async (req, res) => {
  try {
    const { reviewId, rating, description } = req.body;

    // Find the review by its ID
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Update the review properties

    review.rating = rating;
    review.description = description;

    // Save the updated review
    const updatedReview = await review.save();

    res.status(200).json(updatedReview);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createReview,
  deleteReview,
  getReviewsByBusiness,
  getReviewsByUserId,
  updateReview,
};
