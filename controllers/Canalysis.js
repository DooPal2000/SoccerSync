const axios = require('axios');
const ExpressError = require('../utils/ExpressError');
const TeamSquad = require('../models/teamSquad');
const Player = require('../models/teamSquad');

module.exports.searchTeams = async (req, res) => {
    const teamId = req.params.teamId;

    // 팀이 이미 있는지 확인
    const existingTeam = await TeamSquad.findOne({ 'team.id': teamId });

    // 팀이 이미 존재하는 경우
    if (existingTeam) {
        res.json(existingTeam);
    }

    // 새로운 팀 정보 가져오기
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/players/squads',
        params: { team: teamId },
        headers: {
            'X-RapidAPI-Key': process.env.RapidApiKey,
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const teamData = response.data.response[0];
        //선수 정보 저장
        const playerPromises = teamData.players.map(async (playerData) => {
            const existingPlayer = await Player.findOne({ id: playerData.id });
            if (!existingPlayer) {
                const newPlayer = new Player(playerData);
                return newPlayer.save();
            } else {
                return existingPlayer;
            }
        })
        const players = await Promise.all(playerPromises);


        // 팀 정보 저장
        const newTeam = new TeamSquad({
            team: {
                id: teamData.team.id,
                name: teamData.team.name,
                logo: teamData.team.logo
            },
            players: players.map(player => player._id)
        });

        await newTeam.save();
        const populatedNewTeam = await TeamSquad.findById(newTeam._id).populate('players');

        res.json(populatedNewTeam); // 예시 템플릿 이름과 데이터 전달

    } catch (error) {
        console.error(error);
        throw new ExpressError('Internal Server Error', 500);
    }
};


module.exports.searchTeams = async (req, res) => {
    const teamId = req.params.teamId;
    await TeamSquad.deleteMany({ 'team.id': teamId });

    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/players/squads',
        params: { team: teamId },
        headers: {
            'X-RapidAPI-Key': process.env.RapidApiKey,
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

