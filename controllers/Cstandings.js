const Fixture = require('../models/fixture');

const axios = require('axios');

module.exports.searchStandings = async (req, res) => {
    const leagueId = req.params.id;
    const today = new Date();
    let season = today.getFullYear();
    let resultFlag = false;
    let standings;

    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
        params: {
            season: season,
            league: leagueId
        },
        headers: {
            'X-RapidAPI-Key': process.env.RapidApiKey,
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    while (!resultFlag) {
        options.params = {
            season: season,
            league: leagueId
        };

        try {
            const response = await axios.request(options);
            if (Array.isArray(response.data.response) && response.data.response.length > 0) {
                resultFlag = true;
                standings = response.data.response[0];
            }
            else {
                console.log(`API response for season ${season} is undefined or empty.`);
                season -= 1;
            }
        } catch (error) {
            console.error(error);
        }
    }

    console.log(standings);

    //res.send(standings)
    res.render('standing', { standings });
}

