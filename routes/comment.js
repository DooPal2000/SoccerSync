const express = require('express');
const router = express.Router({ mergeParams: true });
const comment = require('../controllers/Ccomment.js');


const { commentSchema } = require('../schemas.js');
const { validateComment, isLoggedIn, isCommentAuthor } = require('../middleware.js');
const Post = require('../models/posting.js');
const Comment = require('../models/comment.js');

const ExpressError = require('../utils/ExpressError.js');
const catchAsync = require('../utils/catchAsync.js');


router.post('/', isLoggedIn, validateComment, catchAsync(comment.createComment))


router.delete('/:commentId', isLoggedIn, isCommentAuthor, catchAsync(comment.deleteComment))




module.exports = router;