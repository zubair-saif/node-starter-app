const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    noOfStars: {
        type: Number,
        default: 0
    }

}, { timestamp: true })


const Rating = mongoose.model("Rating", ratingSchema);
module.exports.Rating = Rating;