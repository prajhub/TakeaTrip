const express = require("express");

const {
  createReview,
  deleteReview,
  getReviewsByBusiness,
  updateReview,
  getReviewsByUserId,
} = require("../controllers/reviewController");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

//CREATE
router.post("/", createReview);

router.delete("/:id", deleteReview);

router.get("/user/:id", getReviewsByUserId);

router.get("/:id", getReviewsByBusiness);

router.put("/", updateReview);

module.exports = router;
