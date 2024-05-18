const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const analysis = require('../controllers/Canalysis');


router.get('/teams', analysis.showTeamSearch);
router.post('/teams', catchAsync(analysis.searchTeams));
router.get('/teams/:teamId', catchAsync(analysis.searchTeams));

router.get('/players', analysis.showPlayerSearch);
router.post('/players', catchAsync(analysis.searchPlayers));
router.get('/players/:playerId', catchAsync(analysis.searchPlayers));
  
// router.get('/register', users.renderRegister);
// router.post('/register', catchAsync(users.register));



module.exports = router;