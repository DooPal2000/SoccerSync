const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/Creviews.js');


const { reviewSchema } = require('../schemas.js');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js');
const Post = require('../models/post');
const Review = require('../models/review.js');

const ExpressError = require('../utils/ExpressError.js');
const catchAsync = require('../utils/catchAsync.js');


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))


router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))




module.exports = router;