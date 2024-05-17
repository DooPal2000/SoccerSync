const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    id: Number,
    name: String,
    age: Number,
    number: Number,
    position: String,
    photo: String
});

const TeamSchema = new Schema({
    team: {
        id: Number,
        name: String,
        logo: String
    },
    players: [{ type: Schema.Types.ObjectId, ref: 'Player' }] // 선수 정보 배열의 ObjectId 참조 
});

const TeamSquad = mongoose.model('TeamSquad', TeamSchema);
const Player = mongoose.model('Player', PlayerSchema);


module.exports = { TeamSquad, Player };
