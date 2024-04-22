const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Fixture = require('../models/fixture');
const standings = require('../controllers/Cstandings');

router.get('/:id', catchAsync(standings.searchStandings));
  
// router.get('/register', users.renderRegister);
// router.post('/register', catchAsync(users.register));



module.exports = router;