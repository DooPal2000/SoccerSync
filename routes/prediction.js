const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const predictions = require('../controllers/Cpredictions');

router.get('/:fixtureId', catchAsync(predictions.searchPredictions));
  
// router.get('/register', users.renderRegister);
// router.post('/register', catchAsync(users.register));



module.exports = router;