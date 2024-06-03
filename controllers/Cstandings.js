const Fixture = require('../models/fixture');

const axios = require('axios');

module.exports.searchStandings = async (req, res) => {
    const leagueId = req.params.id;
    let { season } = req.query;

    if (!season) {
        const today = new Date();
        season = today.getFullYear();
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
            // 시즌 순위가 없는 경우, while 문 돌며 가장 최신순 standings 전송
            options.params = {
                season: season,
                league: leagueId
            };

            try {
                const response = await axios.request(options);
                if (Array.isArray(response.data.response) && response.data.response.length > 0) {
                    resultFlag = true;
                    standings = response.data.response[0];
                    console.log(`YOU ARE GETTING API response`);
                    console.log(standings);
                    console.log(standings.league.season);
                    console.log(standings.league.id);
                }
                else {
                    console.log(`API response for season ${season} is undefined or empty.`);
                    console.log(`So We're getting ${season-1} standings...`);
                    season -= 1;
                }
            } catch (error) {
                console.error(error);
            }
        }

        res.render('standing', { standings });

    } else {
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
            // 시즌 순위가 없는 경우, while 문 돌며 가장 최신순 standings 전송
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
                    console.log(`So We're getting ${season-1} standings...`);
                    season -= 1;
                }
            } catch (error) {
                console.error(error);
            }
        }
        res.json(standings);

    }
}

