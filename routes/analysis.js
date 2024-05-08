const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const analysis = require('../controllers/Canalysis');

router.get('/teams/:id', catchAsync(analysis.searchTeams));
router.get('/players/:id', catchAsync(analysis.searchPlayers));
  
// router.get('/register', users.renderRegister);
// router.post('/register', catchAsync(users.register));



module.exports = router;