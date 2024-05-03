const axios = require('axios');


module.exports.searchPredictions = async (req, res) => {
    const fixtureId = req.params.fixtureId;

    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/odds',
        params: { fixture: fixtureId },
        headers: {
            'X-RapidAPI-Key': process.env.RapidApiKey,
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error(error);
    }



};

