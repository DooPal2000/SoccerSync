const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const postings = require('../controllers/Cpostings');
const { isLoggedIn, validatePost, isAuthor } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');

const upload = multer({ storage });

router.route('/')
    .get(catchAsync(postings.index))
    .post(isLoggedIn, upload.single('image'), validatePost, catchAsync(postings.createPost))

router.get('/new', isLoggedIn, postings.renderNewForm);

router.route('/:id')
    .get(catchAsync(postings.showPost))
    .put(isLoggedIn, isAuthor, upload.single('image'), validatePost, catchAsync(postings.updatePost))
    .delete(isLoggedIn, isAuthor, catchAsync(postings.deletePost))

module.exports = router;

// //const upload = multer({ dest: 'uploads/' });
// const upload = multer({ storage });
// // 참고 깃허브: https://github.com/expressjs/multer/blob/master/doc/README-ko.md
// router.route('/')
//     .get(catchAsync(campgrounds.index))
//     .post(isLoggedIn, upload.single('image'), validateCampground, catchAsync(campgrounds.createCampground))

// router.get('/new', isLoggedIn, campgrounds.renderNewForm);

// router.route('/:id')
//     .get(catchAsync(campgrounds.showCampground))
//     .put(isLoggedIn, isAuthor, upload.single('image'), validateCampground, catchAsync(campgrounds.updateCampground))
//     .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

// // router.get('/:id', catchAsync(campgrounds.showCampground));

//  router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

// // router.put('/:id', validateCampground, catchAsync(campgrounds.updateCampground));

// router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

