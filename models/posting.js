const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js')

const PostingSchema = new Schema({
    title: String,
    image: String,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

PostingSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Posting', PostingSchema);