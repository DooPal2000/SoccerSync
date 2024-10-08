const axios = require('axios');
const ExpressError = require('../utils/ExpressError');
const { TeamSquad, Player } = require('../models/teamSquad');
// const { listenerCount } = require('../../YelpCamp-KY/models/comment');

module.exports.showTeamSearch = (req, res) => {
    res.render('teamSearch');
};



module.exports.searchTeams = async (req, res) => {
    // 1. Standing 페이지에서 들어온 Get 요청일 경우
    // 2. 팀 검색 페이지에서 들어온 Post 요청일 경우
    let teamId = req.params.teamId || req.body.teamId;

    console.log(teamId);

    if (!teamId) {
        throw new ExpressError('해당 팀이 존재하지 않습니다.', 404);
    }

    // 팀이 이미 있는지 확인
    const existingTeam = await TeamSquad.findOne({ 'team.id': teamId });

    if (existingTeam) {
        // existingTeam에서 players 필드를 populate
        await existingTeam.populate('players');
        try {
            console.log(existingTeam);
            return res.render('team', { team: existingTeam });
        } catch (error) {
            // 저장하는 동안 에러가 발생했을 경우 처리
            console.error('팀을 불러오는 동안 동안 에러가 발생했습니다:', error);
            throw new ExpressError('팀을 불러오는 동안 에러가 발생했습니다', 500);
        }
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
        console.log(players);


        // 팀 정보 저장
        const newTeam = new TeamSquad({
            team: {
                id: teamData.team.id,
                name: teamData.team.name,
                logo: teamData.team.logo
            },
            players: players.map(player => player._id)
        });
        console.log(newTeam);



        await newTeam.save();
        const populatedNewTeam = await TeamSquad.findById(newTeam._id).populate('players');

        res.render('team', { team: populatedNewTeam }); // 예시 템플릿 이름과 데이터 전달

    } catch (error) {
        console.error(error);
        throw new ExpressError('팀을 불러오는 동안 동안 에러가 발생했습니다', 500);
    }
};

module.exports.showPlayerSearch = (req, res) => {
    res.render('playerSearch');
};

module.exports.searchPlayers = async (req, res) => {
    const playerId = req.params.playerId || req.body.playerId;

    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/players',
        params: {
            id: playerId,
            season: '2024'
        },
        headers: {
            'x-rapidapi-key': '735987fbd7mshc0c8b4d80a39ab8p19e685jsn1cb7e725f808',
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error(error);
    }
};


