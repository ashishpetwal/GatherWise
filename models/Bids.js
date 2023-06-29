const mongoose = require("mongoose");

const {Schema} = mongoose;

const bidSchema = new Schema ({
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Events',
        required: true
    },
    letter: {
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    submitDate:{
        type: Date,
        default: Date.now
    }
})

const Bids = mongoose.model('Bids', bidSchema);

module.exports = Bids;