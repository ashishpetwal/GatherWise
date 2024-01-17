const mongoose = require("mongoose");

const { Schema } = mongoose;

const bidSchema = new Schema({
    bidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Events',
        required: true
    },
    bidderName: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    letter: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    submitDate: {
        type: Date,
        default: Date.now
    }
})

const Bids = mongoose.model('Bids', bidSchema);

module.exports = Bids;