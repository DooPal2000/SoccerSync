const axios = require('axios');
const ExpressError = require('../utils/ExpressError');
const TeamSquad = require('../models/teamSquad');

// module.exports.searchTeams = async (req, res) => {
//     const teamId = req.params.teamId;

//     // 팀이 이미 있는지 확인
//     const existingTeam = await TeamSquad.findOne({ 'team.id': teamId });

//     // 팀이 이미 존재하는 경우
//     if (existingTeam) {
//         return res.status(400).json({ message: 'Team already exists' });
//     }

//     // 새로운 팀 정보 가져오기
//     const options = {
//         method: 'GET',
//         url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
//         params: { id: teamId },
//         headers: {
//             'X-RapidAPI-Key': process.env.RapidApiKey,
//             'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
//         }
//     };

//     try {
//         const response = await axios.request(options);
//         const teamData = response.data;

//         // 팀 정보 저장
//         const newTeam = new TeamSquad({
//             team: {
//                 id: teamData.team.id,
//                 name: teamData.team.name,
//                 logo: teamData.team.logo
//             },
//             players: []
//         });

//         await newTeam.save();

//         res.json(teamData); // 예시 템플릿 이름과 데이터 전달

//     } catch (error) {
//         console.error(error);
//         throw new ExpressError('Internal Server Error', 500);
//     }
// };


module.exports.searchTeams = async (req, res) => {
    const teamId = req.params.teamId;
    await TeamSquad.deleteMany({ 'team.id': teamId });

    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
        params: { id: teamId },
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

