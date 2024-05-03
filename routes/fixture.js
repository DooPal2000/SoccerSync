const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Fixture = require('../models/fixture');
const fixtures = require('../controllers/Cfixtures');

router.get('/:leagueId', catchAsync(fixtures.searchFixtures));
  
// router.get('/register', users.renderRegister);
// router.post('/register', catchAsync(users.register));



module.exports = router;