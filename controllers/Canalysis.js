const axios = require('axios');
const ExpressError = require('../utils/ExpressError');


module.exports.searchTeams = async (req, res) => {
    const teamId = req.params.teamId;
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
        params: { id: teamId },
        headers: {
            'X-RapidAPI-Key': '735987fbd7mshc0c8b4d80a39ab8p19e685jsn1cb7e725f808',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        res.json(response.data); // 예시 템플릿 이름과 데이터 전달

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

