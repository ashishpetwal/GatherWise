const express = require('express');
const fetchuser = require('../middleware/fetchUser')
const Bids = require('../models/Bids');
const Events = require('../models/Events');

const router = express.Router();

router.post('/addnew/:id', fetchuser, async (req, res) => {
    const eventId = req.params.id;
    const { letter, amount } = req.body;
    const bidder = req.user.id;
    const uniqueBid = await Bids.findOne({ bidder: bidder, event: eventId });
    const organizer = await Events.findOne({_id:eventId},{organizer:1})
    if (bidder === organizer.organizer.toString()) {
        return res.status(400).json({ success: false, msg: "Organizers can't bid!" })
    }
    if (uniqueBid) {
        return res.status(400).json({ success: false, msg: "You have already submiited the Bid!" })
    }
    try {
        const newBid = new Bids({
            bidder: req.user.id, event: eventId, letter, amount
        })
        const savedBid = await newBid.save();

        res.status(200).json({ success: true, bid: savedBid });
    } catch (error) {
        return res.status(500).send(error);
    }
})



module.exports = router;