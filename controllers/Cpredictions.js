const axios = require('axios');
const ExpressError = require('../utils/ExpressError');


module.exports.searchPredictions = async (req, res) => {
    const fixtureId = req.params.fixtureId;

    try {
        const oddsOptions = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/odds',
            params: { fixture: fixtureId },
            headers: {
                'X-RapidAPI-Key': process.env.RapidApiKey,
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        };

        const predictionsOptions = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/predictions',
            params: { fixture: fixtureId },
            headers: {
                'X-RapidAPI-Key': process.env.RapidApiKey,
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        };

        // 각 API 호출을 await와 함께 사용하여 비동기로 실행
        const oddsResponse = await axios.request(oddsOptions);
        const predictionsResponse = await axios.request(predictionsOptions);


        const oddsData = oddsResponse.data.response;
        const predictionsData = predictionsResponse.data.response;

        console.log(oddsData);
        console.log(predictionsData);
        
        const combinedData = {
            odds: oddsData,
            predictions: predictionsData
        };


        // 템플릿 렌더링
        //res.render('prediction', { oddsData, predictionsData }); // 예시 템플릿 이름과 데이터 전달
        res.json(combinedData);
    } catch (error) {
        console.error(error);
        // 오류 처리
        throw new ExpressError('Internal Server Error', 500);
    }



};

