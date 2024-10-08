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
        const oddsResponseBefore = axios.request(oddsOptions);
        const predictionsResponseBefore = axios.request(predictionsOptions);

        // 각각의 응답은 비동기 처리를 할 이유가 없어서, Promise 객체를 꺼내기 위해 await 를 따로 한다(시간상 이득)
        const oddsResponse = await oddsResponseBefore;
        const predictionsResponse = await predictionsResponseBefore;



        const oddsData = oddsResponse.data.response[0];
        const predictionsData = predictionsResponse.data.response[0];

        console.log(oddsData);
        console.log(predictionsData);

        // const combinedData = {
        //     odds: oddsData,
        //     predictions: predictionsData
        // };

        if (!oddsData || !predictionsData) {
            // oddsData 또는 predictionsData가 undefined인 경우
            throw new ExpressError();
        } else {
            // 템플릿 렌더링
            res.render('prediction', { oddsData, predictionsData }); // 예시 템플릿 이름과 데이터 전달
            //res.json(oddsData);
        }

    } catch (error) {
        console.error(error);
        throw new ExpressError('배당률 혹은 승부예측이 존재하지 않습니다! 경기시간을 기준으로 일정 시간이 경과하면 배당률 기준이 삭제될 수 있습니다.', 500);
    }



};

