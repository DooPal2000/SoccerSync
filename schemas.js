const Joi = require('joi');
const { number } = require('joi');

module.exports.userSchema = Joi.object({
    favorites: Joi.array().items(Joi.number()).max(10).required()
});

module.exports.postingSchema = Joi.object({
    posting: Joi.object({
        title: Joi.string().required(),
        image: Joi.string().optional(),
        description: Joi.string().required(),
        location: Joi.string().required(),
    }).required()
});

module.exports.commentSchema = Joi.object({
    comment: Joi.object({
        rating: Joi.number().optional().min(1).max(5),
        body: Joi.string().required()
    }).required()
})

module.exports.fixtureSchema = Joi.object({
    fixture: Joi.object({
        fixtureId: Joi.number().required(),
        referee: Joi.string().required(),
        timezone: Joi.string().required(),
        date: Joi.date().required(),
        timestamp: Joi.number().required(),
        periods: Joi.object({
            first: Joi.number().required(),
            second: Joi.number().required(),
        }).required(),
        venue: Joi.object({
            id: Joi.number().required(),
            name: Joi.string().required(),
            city: Joi.string().required(),
        }).required(),
        status: Joi.object({
            long: Joi.string().required(),
            short: Joi.string().required(),
            elapsed: Joi.string().required(),
        }).required()
    }).required(),
    league: Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required(),
        country: Joi.string().required(),
        logo: Joi.string().required(),
        flag: Joi.string().required(),
        season: Joi.number().required(),
        round: Joi.string().required()
    }).required(),
    teams: Joi.object({
        home: Joi.object({
            id: Joi.number().required(),
            name: Joi.string().required(),
            logo: Joi.string().required(),
            winner: Joi.boolean().required()
        }).required(),
        away: Joi.object({
            id: Joi.number().required(),
            name: Joi.string().required(),
            logo: Joi.string().required(),
            winner: Joi.boolean().required()
        }).required()
    }).required(),
    goals: Joi.object({
        home: Joi.number().required(),
        away: Joi.number().required()
    }).required(),
    score: Joi.object({
        halftime: Joi.object({
            home: Joi.number().required(),
            away: Joi.number().required()
        }).required(),
        fulltime: Joi.object({
            home: Joi.number().required(),
            away: Joi.number().required()
        }).required(),
        extratime: Joi.object({
            home: Joi.number().required(),
            away: Joi.number().required()
        }).required(),
        penalty: Joi.object({
            home: Joi.number().required(),
            away: Joi.number().required()
        }).required()
    }).required()
});


