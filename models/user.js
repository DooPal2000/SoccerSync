const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    favorites: [{
        type: Number
    }]
    // favorites: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Fixture'
    // }]
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);

