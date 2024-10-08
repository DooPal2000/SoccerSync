const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FixtureSchema = new Schema({
    fixture: {
        // fixtureId: Number,
        fixtureId: { type: Number, unique: true, index: true },
        referee: String,
        timezone: String,
        date: Date,
        timestamp: Number,
        periods: {
            first: Number,
            second: Number
        },
        venue: {
            id: Number,
            name: String,
            city: String,
        },
        status: {
            long: String,
            short: String,
            elapsed: String
        }
    },
    league: {
        id: Number,
        name: String,
        country: String,
        logo: String,
        flag: String,
        season: Number,
        round: String
    },
    teams: {
        home: {
            id: Number,
            name: String,
            logo: String,
            winner: Boolean
        },
        away: {
            id: Number,
            name: String,
            logo: String,
            winner: Boolean
        }
    },
    goals: {
        home: Number,
        away: Number
    },
    score: {
        halftime: {
            home: Number,
            away: Number
        },
        fulltime: {
            home: Number,
            away: Number
        },
        extratime: {
            home: Number,
            away: Number
        },
        penalty: {
            home: Number,
            away: Number
        }
    }
});

module.exports = mongoose.model('Fixture', FixtureSchema);
