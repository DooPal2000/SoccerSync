const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const analysis = require('../controllers/Canalysis');

router.get('/teams/:teamId', catchAsync(analysis.searchTeams));
router.get('/players/:playerId', catchAsync(analysis.searchPlayers));
  
// router.get('/register', users.renderRegister);
// router.post('/register', catchAsync(users.register));



module.exports = router;