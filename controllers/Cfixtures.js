const axios = require('axios');
const ExpressError = require('../utils/ExpressError');
const Fixture = require('../models/fixture');



module.exports.searchFixtures = async (req, res) => {
    const leagueId = req.params.leagueId;
    let leagueName;
    let fixtures;

    // 현재 날짜 정보 가져오기
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    let seasonsToSave = [];
    const asianLeagues = new Set([292, 293, 98, 99]);

    if(asianLeagues.has(leagueId)){
        // 아시아 리그
        seasonsToSave = [currentYear];
        // currentYear - 1, currentYear - 2    
    } else { 
        // 해외 리그일 경우에는, 현재 년도보다 -1 한 값에서 시즌이 시작(ex. 2023-2024 시즌) 하기에 조정해줍니다.
        seasonsToSave = [currentYear - 1];
    }

    const { year, month } = req.query;

    if (!year || !month) {

        await Fixture.deleteMany({ 'league.id': leagueId, });

        for (const season of seasonsToSave) {
            console.log(leagueId);
            console.log(seasonsToSave);
    
            const options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
                params: {
                    league: leagueId,
                    season: season,
                },
                headers: {
                    'X-RapidAPI-Key': process.env.RapidApiKey,
                    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                console.log(response.data.response);
                fixtures = response.data.response;
                


                for (let fixture of fixtures) {
                    fixture.fixture = {
                        ...fixture.fixture,
                        fixtureId: fixture.fixture.id,
                    };
                    const newFixture = new Fixture(fixture);
                    await newFixture.save();
                    leagueName = newFixture.league.name;
                }

            } catch (error) {
                console.error(`Error fetching data for season ${season}:`, error);
                throw new ExpressError('Internal Server Error', 500);
            }
        }
        fixtures = fixtures
            .filter(fixture => {
                const fixtureMonth = new Date(fixture.fixture.timestamp * 1000).getMonth();
                return fixtureMonth === currentMonth;
            });

        if (fixtures.length > 0) {
            fixtures.sort((a, b) => a.fixture.timestamp - b.fixture.timestamp);
        }

        res.render('fixture', { leagueId, leagueName, fixtures })

    } else {
        // year와 month 파라미터가 있으면 해당 월의 데이터만 반환
        const startDate = new Date(year, month - 1); // 월은 0부터 시작하므로 month - 1
        const endDate = new Date(year, month); // 다음 달의 첫 날 (이 날짜는 포함되지 않음)

        // 날짜 범위를 timestamp로 변환
        const startTimestamp = startDate.getTime() / 1000;
        const endTimestamp = endDate.getTime() / 1000;
        const fixtures = await Fixture.find({
            'league.id': leagueId,
            'fixture.timestamp': {
                $gte: startTimestamp,
                $lte: endTimestamp
            }
        })

        if (fixtures.length > 0) {
            fixtures.sort((a, b) => a.fixture.timestamp - b.fixture.timestamp);
        }

        res.json(fixtures);
    }

};

