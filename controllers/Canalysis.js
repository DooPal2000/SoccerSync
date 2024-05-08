const axios = require('axios');
const ExpressError = require('../utils/ExpressError');


module.exports.searchTeams = async (req, res) => {
    const teamId = req.params.teamId;

    try {

        // 템플릿 렌더링
        res.render('prediction', { oddsData, predictionsData }); // 예시 템플릿 이름과 데이터 전달
        //res.json(combinedData);
    } catch (error) {
        console.error(error);
        throw new ExpressError('Internal Server Error', 500);
    }



};

module.exports.searchPlayers = async (req, res) => {
    const playerId = req.params.playerId;

    try {

        // 템플릿 렌더링
        res.render('prediction', { oddsData, predictionsData }); // 예시 템플릿 이름과 데이터 전달
        //res.json(combinedData);
    } catch (error) {
        console.error(error);
        throw new ExpressError('Internal Server Error', 500);
    }



};

